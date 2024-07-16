import express from 'express';
import { WebSocketServer } from 'ws';
import GameManager from './GameManager';

const app = express();
const server = app.listen(8080,()=>{
    console.log("server is listning");
});
const wss = new WebSocketServer({server});
wss.on('connection', (ws) => {
    const instance = GameManager.getInstance();
    instance.addUser(ws);

    ws.send('Welcome to the WebSocket server');
});
