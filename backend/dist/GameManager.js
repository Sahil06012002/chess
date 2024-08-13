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
        this.incomingUser = [];
    }
    static getInstance() {
        if (GameManager.instance) {
            return GameManager.instance;
        }
        GameManager.instance = new GameManager();
        return GameManager.instance;
    }
    addUser(socketIdentifier) {
        console.log(socketIdentifier.id);
        this.incomingUser.push(socketIdentifier); //socket : 1
        this.addHandler(socketIdentifier);
    }
    getExistingUsersId() {
        console.log("these are all the existing users on the server");
        this.incomingUser.map((user) => {
            console.log(user.id);
        });
    }
    removeUser(socket) {
        //remove the user and end the game
    }
    addHandler(socketIdentifier) {
        socketIdentifier.socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            console.log(message.type);
            console.log("message from socket number : ", socketIdentifier.id);
            if (message.type === Message_1.GAME_INIT) {
                if (this.pendingUser != null && this.pendingUser !== socketIdentifier.socket) {
                    //start the game: get a instance of the game class 
                    console.log("game is started");
                    const chessGame = new Game_1.default(socketIdentifier.socket, this.pendingUser);
                    this.games.push(chessGame);
                    this.pendingUser == null;
                }
                else {
                    console.log("match not found");
                    this.pendingUser = socketIdentifier.socket;
                }
            }
            if (message.type === Message_1.MOVE) {
                //find the game for this specific user and add the move in the move array
                //find the game for that user
                const currentGame = this.games.find(game => game.player1 === socketIdentifier.socket || game.player2 === socketIdentifier.socket);
                console.log("moves has started coming");
                console.log(JSON.stringify(message.move));
                currentGame === null || currentGame === void 0 ? void 0 : currentGame.addMove(socketIdentifier.socket, message.move);
            }
            if (message.type === "all_users") {
                this.getExistingUsersId();
            }
        });
    }
}
exports.default = GameManager;
