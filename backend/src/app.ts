import express from 'express';
import { Server } from "socket.io";
import http from 'http';
import cors from 'cors';
import config from './config';
import { Counter } from './model/Store';
import { History, ActionType } from './model/History';

const app = express();
const counter = Counter.getInstance();
const counterUpdateHistory = new History(5);
const SOCKET_ROOM_NAME = 'counter';

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: config.frontendUrls,
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    socket.join(SOCKET_ROOM_NAME);
    socket.on('disconnect', () => {
        socket.leave(SOCKET_ROOM_NAME);
    });
});

app.use(cors({
    origin: config.frontendUrls,
    credentials: true
}));
app.use(express.json());

app.get('/counter/get', (req, res) => {
    res.json({
        value: counter.getCount()
    });
});

app.post('/counter/increment', (req, res) => {
    counter.increment();
    counterUpdateHistory.add({
        timestamp: Date.now(),
        action: ActionType.INC,
        updatedValue: counter.getCount()
    })
    res.json({
        message: 'Counter incremented',
    })
    io.to(SOCKET_ROOM_NAME).emit('counterUpdate', counter.getCount());
});

export default server;