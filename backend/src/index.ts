import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { initSocket } from './socket.ts';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io: Server = new Server(server, {
    cors: {
        origin: "*"
    },
});


initSocket(io)


server.listen(3001, () => {
    console.log('Server is running on port 3001');
});