import express from 'express';
import { Server } from "socket.io";
import http from 'http';
import sessions from 'express-session';
import cors from 'cors';
import config from './config';

const app = express();
let clients = new Set();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: config.frontendUrl,
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    clients.add(socket);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        clients.delete(socket);
    });
});

app.use(cors({
    origin: config.frontendUrl,
    credentials: true
}));
app.use(express.json());
app.use(sessions({
    secret: config.sessionSecret,
    cookie: { secure: true }
}))

app.get('/', (req, res) => {
    res.send('Hello World, Node.js!');
});


export default server;