"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const GameManager_1 = __importDefault(require("./GameManager"));
const app = (0, express_1.default)();
const server = app.listen(8080, () => {
    console.log("server is listning");
});
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', (ws) => {
    const instance = GameManager_1.default.getInstance();
    instance.addUser(ws);
    ws.send('Welcome to the WebSocket server');
});
