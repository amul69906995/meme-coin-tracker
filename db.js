import { MongoClient, ServerApiVersion } from "mongodb"


export const client = new MongoClient(process.env.MONGO_CONNECTION_STRING, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);


export async function connectDb() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const myDB = client.db("tracker");
    const tweet_tracker = myDB.collection("tweet_tracker");

    // Ensure the unique index exists (run this once during setup, not every time)
     await tweet_tracker.createIndex({ tweetId: -1 }, { unique: true });
     //a safeguard to ensure the index exists
    } catch (e) {
        console.error("error in db connection", e)
    }
}