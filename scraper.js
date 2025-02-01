import 'dotenv/config';
import { getTweets } from './helper/getTweets.js';
import OpenAI from "openai";
import { tweetPrompt } from './helper/prompt.js';
import { writeErrorToLog } from './logs/error.log.js';
import { connectDb } from './db.js';
import { client } from './db.js';
import { io } from './app.js';
const openai = new OpenAI({
    apiKey: process.env.GOOGLE_GEMINI_API,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});




//scrape time -- 1call/2min also account for number of influencer cause each call fetch tweet of one influencer
//considering difference time between each tweet is at least 2minutes
//tweets are not edited
const scrapeInterval = 4 * 60 * 1000;
const tweetInScrapeInterval = scrapeInterval / (2 * 60 * 1000);
const influencerUserName = [
    'AltcoinGordon',
    'VitalikButerin',
    'APompliano',
    'aantonop',
    'laurashin',
    'davidgokhshtein',
    'CryptoCobain',      // Known for his crypto commentary and market insights
    'WhalePanda',        // A long-time crypto Twitter personality
    'CryptoRand',        // Frequently shares market analysis and crypto trends
    'IvanOnTech',        // Educator and blockchain advocate
    '100trillionUSD',    // PlanB, famous for the stock-to-flow model on Bitcoin
    'TheCryptoDog',      // Offers crypto market commentary
    'CryptoKaleo'        // Provides market insights and trading updates
  ];
  
//write a main fun which will run every getTweets() 2 min
const createDocTweetToSaveToDb = async (tweets, influencer) => {
    const myDB = client.db("tracker");
    const tweet_tracker = myDB.collection("tweet_tracker");

    // Ensure the unique index exists (run this once during setup, not every time)
     //await tweet_tracker.createIndex({ tweetId: -1 }, { unique: true });
    //check by id if that tweet exist in db move to next else store in db
    //use this tweet to find if it exist in db donot add and move to next element
    //else make a newTweetDoc and insert
    for (const tweet of tweets) {
        const tweetId = tweet.tweet_id;
        //const llmresponse= await llmResponseForTweet(tweet.text);

        const newTweetDoc = {
            tweetId: tweet.tweet_id,
            influencerName: influencer,
            tweetText: tweet.text,
            createdAt: tweet.created_at,
            author: tweet.author,
            media: tweet.media,
        };

        try {
            console.log("Inside createDocTweetToSaveToDb:", newTweetDoc);
            const result = await tweet_tracker.insertOne(newTweetDoc);
            newTweetDoc._id = result.insertedId;
            if(result){
                io.emit('newTweet',newTweetDoc);
            }
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        } catch (e) {
            if (e.code === 11000) {
                await writeErrorToLog({ message: `Duplicate tweet detected. Skipping tweetId: ${tweetId}`, errorCode: e.code })
                console.log(`Duplicate tweet detected. Skipping tweetId: ${tweetId}`);
            } else {
                console.error("Error in inserting doc:", e);
                throw e;
            }
        }
    }
};


const llmResponseForTweet = async (tweetText) => {
    const response = await openai.chat.completions.create({
        model: "gemini-1.5-flash",
        messages: [
            { role: "system", content: tweetPrompt },
            {
                role: "user",
                content: tweetText,
            },
        ],
    });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content
}
async function main() {
    try {
        for (const influencer of influencerUserName) {
            const data = await getTweets(influencer);
            console.log(influencer, data.timeline[0]);

            const tweets = data.timeline.slice(0, tweetInScrapeInterval);
            await createDocTweetToSaveToDb(tweets, influencer);
        }
    } catch (error) {
        console.log("error in main", error)
        await writeErrorToLog({ message: error?.message, errorCode: error.status })
        throw error
    }

}
let intervalId;
export async function mainSechudler () {
    try {
        await connectDb();
    //call amin for first time 
    await main()
    // then at interval of 
    // run the main function
       if (intervalId) {
        clearInterval(intervalId);
    } else {
        console.log("running main")
        intervalId = setInterval(() => {
            main();
        }, scrapeInterval)
    }
    } catch (error) {
       throw error 
    }
    
}
/* {
     tweet_id:
     author.screen_name:
     author.avatar:
     text:
     llm res:{
     sentiment: string(buy,sell)
     tokenname:?optional
     token adress
     created_at:
     media links:?optional
     }

     tweetUrl:"https://x.com/AltcoinGordon/status/1883997662308925639"
 }*/