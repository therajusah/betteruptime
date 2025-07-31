import { createClient } from "redis";

let client: ReturnType<typeof createClient> | null = null;

async function getClient() {
    if (!client) {
        client = createClient()
            .on("error", (err) => {
                // Only log connection errors once to avoid spam
                if (err.code === 'ECONNREFUSED') {
                    console.log("Redis not available - connection refused");
                } else {
                    console.log("Redis Client Error", err);
                }
            });
        try {
            await client.connect();
        } catch (error) {
            console.log("Failed to connect to Redis:", error.message);
            throw error;
        }
    }
    return client;
}

type WebsiteEvent = { url: string, id: string}

type MessageType = { 
    id: string,
    message: {
        url: string,
        id: string
    }    
}

const STREAM_NAME = "betteruptime:website";

export async function xAdd({url, id}: WebsiteEvent){
       const redisClient = await getClient();
       await redisClient.xAdd(
        STREAM_NAME, "*", {
            url,
            id
        }
       )
}

export async function xAddBulk(websites: WebsiteEvent[]) {
    for ( let i = 0; i < websites.length; i++) {
        await xAdd ({
            url: websites[i].url,
            id: websites[i].id
        })
    }
};

export async function xReadGroup(ConsumerGroup: string, workerId: string) : Promise<MessageType[] | undefined> {
  const redisClient = await getClient();
  const res = await redisClient.xReadGroup(
    ConsumerGroup, workerId, {
    key: STREAM_NAME,
    id: '>'
    }, {
    'COUNT': 5
    }
);

let messages : MessageType[] | undefined = res?.[0]?.messages;
    return messages;
}

async function xAck(eventId: string, consumerGroup: string) {
    const redisClient = await getClient();
    await redisClient.xAck(
        STREAM_NAME,
        consumerGroup,
        [eventId]
    )
}

export async function xAckBulk(consumerGroup: string, eventIds: string[]) {
    eventIds.map(eventId => xAck (consumerGroup, eventId));
}