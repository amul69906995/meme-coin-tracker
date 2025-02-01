import 'dotenv/config';
import express from 'express';
import { mainSechudler } from './scraper.js';
import { client } from './db.js';
import http from 'http'
import { Server } from "socket.io";

const app = express();

//running main sechudler
mainSechudler().catch(error=>{
    console.error("main sechudler",error);
});
//console.log("thisis client in app.js",client)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', () => {
    console.log('hello world');
    res.send('hello world');
})
const server = http.createServer(app);
// Setup CORS and Socket.IO
export const io = new Server(server, {
    pingInterval:25000,
    pingTimeout: 60000,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const fetchCurrentTweet = async () => {
    try {
        const myDB = client.db("tracker");
        const tweet_tracker = myDB.collection("tweet_tracker");
        const tweet = await tweet_tracker.find().toArray();
        return tweet;
    } catch (error) {
        console.log("error in fetchCureent tweets", fetchCurrentTweet)
    }

}
io.on("connection", async (socket) => {
    console.log(`User connected: ${socket.id}`);

    try{
        const tweet = await fetchCurrentTweet();
        //console.log("currenttweet",tweet)
       if(tweet){
        socket.emit("currentTweet", tweet);
       }
    }catch(error){
        console.log("error in connection",error)
    }


    // Handle user disconnection
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
server.listen(process.env.PORT || 6666, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 6666}`);
});
