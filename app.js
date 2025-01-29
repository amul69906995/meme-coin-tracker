import 'dotenv/config';
import express from 'express';
import { mainSechudler } from './scraper.js';
import { client } from './db.js';
import http from 'http'
import { Server } from "socket.io";

const app = express();

//running main sechudler
// mainSechudler().catch(error=>{
//     console.error("main sechudler",error);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', () => {
    console.log('hello world');
    res.send('hello world');
})
const server = http.createServer(app);
// Setup CORS and Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (Change for production)
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for messages from clients
    socket.on("message", (data) => {
        console.log(`Message from ${socket.id}:`, data);
        io.emit("message", data); // Broadcast message to all clients
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
server.listen(process.env.PORT || 6666, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 6666}`);
});
