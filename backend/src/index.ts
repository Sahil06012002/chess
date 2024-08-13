import express from 'express';
import { WebSocketServer } from 'ws';
import { WebSocket } from "ws";
import GameManager from './GameManager';
const app = express();

const server = app.listen(8080,()=>{
    console.log("server is listning");
});
interface ISocketIndentifier{
    id : number,
    socket : WebSocket
}
let count  = 0;

const wss = new WebSocketServer({server});
wss.on('connection', (ws) => {
    count++;
    let socketIdentifier : ISocketIndentifier =  { id : count, socket : ws};
    const instance = GameManager.getInstance();
    instance.addUser(socketIdentifier);

    ws.send('Welcome to the WebSocket server');
});

