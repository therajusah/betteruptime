import { xAckBulk, xReadGroup } from "redisstream/client";
import axios from "axios";
import { prismaClient } from "store/client";

const REGION_ID = process.env.REGION_ID!;
const WOKER_ID = process.env.WORKER_ID!;


if (!REGION_ID) {
    throw new Error('REGION_ID and WOKER_ID are required');
}
if(!WOKER_ID) {
    throw new Error('WOKER_ID is required');
}


async function main() {
    console.log('Starting worker');
    while(1) {
       const response = await xReadGroup(REGION_ID, WOKER_ID);
       if (!response) {
        continue;
       }
       let promises = response.map (({message})=> fetchWebsite( message.url, message.id))
       await Promise.all(promises);
       xAckBulk(REGION_ID, response.map(({id}) => id));
    }
}



async function fetchWebsite( url: string, websiteId: string){
    return new Promise<void> ((resolve, reject) => {
        const startTime = Date.now();
        axios.get(url).then( async ()=>{
            const endTime = Date.now();
            const duration = endTime - startTime;
           await prismaClient.websiteTick.create({
                data: {
                    response_time_ms:duration,
                    status: "Up",
                    region_id: REGION_ID,
                    website_id: websiteId,
                }
            })
            resolve();
            console.log(`Website ${websiteId} took ${duration}ms to load`);
        }).catch(async (err)=>{
            const endTime = Date.now();
            await prismaClient.websiteTick.create({
                data: {
                    response_time_ms: endTime - startTime,
                    status: "Down",
                    region_id: REGION_ID,
                    website_id: websiteId
                }
            })
            resolve();
        })
       })
}

main();