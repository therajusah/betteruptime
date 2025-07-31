import { prismaClient } from "store/client";
import { xAddBulk } from "redisstream/client";

async function main () {
    try {
        let website = await prismaClient.website.findMany({
            select: {
                url: true,
                id: true
            }
        })
        console.log(`Found ${website.length} websites`);
        
        try {
            await xAddBulk(website.map(w => ({
                url: w.url,
                id: w.id
            })));
            console.log("Successfully added websites to Redis stream");
        } catch (redisError) {
            console.log("Redis not available, skipping stream operations:", redisError.message);
        }
    } catch (error) {
        console.error("Error in main function:", error);
    }
}

setInterval(() => {main()}, 3 * 1000 * 60);

main();