"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("./Message");
const Game_1 = __importDefault(require("./Game"));
class GameManager {
    constructor() {
        this.incomingUser = [];
        this.pendingUser = null;
        this.games = [];
        this.userId = 0;
        this.incomingUser = [];
    }
    static getInstance() {
        if (GameManager.instance) {
            return GameManager.instance;
        }
        GameManager.instance = new GameManager();
        return GameManager.instance;
    }
    assignUser(user) {
        this.incomingUser.push(user);
    }
    addUser(socket) {
        console.log(++this.userId);
        this.incomingUser.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        //remove the user and end the game
    }
    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            console.log(message.type);
            if (message.type === Message_1.GAME_INIT) {
                if (this.pendingUser != null) {
                    //start the game: get a instance of the game class 
                    console.log("game is started");
                    const chessGame = new Game_1.default(socket, this.pendingUser);
                    this.games.push(chessGame);
                }
                else {
                    console.log("match not found");
                    this.pendingUser = socket;
                }
            }
            if (message.type === Message_1.MOVE) {
                //find the game for this specific user and add the move in the move array
                //find the game for that user
                const currentGame = this.games.find(game => game.player1 === socket || game.player2 === socket);
                console.log("moves has started coming");
                currentGame === null || currentGame === void 0 ? void 0 : currentGame.addMove(socket, message.move);
            }
        });
    }
}
exports.default = GameManager;
