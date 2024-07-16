"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const Message_1 = require("./Message");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: Message_1.GAME_INIT,
            payload: {
                color: 'white'
            }
        }));
        this.player2.send(JSON.stringify({
            type: Message_1.GAME_INIT,
            payload: {
                color: 'black'
            }
        }));
    }
    //in the add move i need to start the move with white only and disable black
    addMove(socket, move) {
        var _a, _b;
        //if(this.board.moves.length % 2 === 0 && !this.player1) return;
        //how would we decide whos turn it is
        console.log("dto is perfect now moving");
        if (this.board.history().length % 2 === 0 && socket !== this.player1) {
            socket.send(JSON.stringify({
                message: "its whites turn"
            }));
            return;
        }
        if (this.board.history().length % 2 !== 0 && socket !== this.player2) {
            socket.send(JSON.stringify({
                message: "its blacks turn"
            }));
            return;
        }
        try {
            this.board.move(move);
            console.log(this.board.turn());
        }
        catch (e) {
            socket.send(JSON.stringify({
                message: "not a valid move"
            }));
            console.log("got some error");
            console.log(e);
            return;
        }
        console.log(this.board.ascii());
        if (this.board.isGameOver()) {
            console.log("game is over");
            this.player1.send(JSON.stringify({
                type: Message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "black won" : "white won"
                }
            }));
            this.player2.send(JSON.stringify({
                type: Message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "black won" : "white won"
                }
            }));
            return;
        }
        else {
            console.log("piece moved");
            if (this.board.turn() === 'b') {
                (_a = this.player2) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({
                    type: Message_1.MOVE,
                    payload: move
                }));
            }
            else {
                (_b = this.player1) === null || _b === void 0 ? void 0 : _b.send(JSON.stringify({
                    type: Message_1.MOVE,
                    payload: move
                }));
            }
        }
    }
}
exports.default = Game;
