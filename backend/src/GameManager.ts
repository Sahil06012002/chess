import { WebSocket } from "ws";
import { GAME_INIT, MOVE } from "./Message";
import Game from "./Game";

export default class GameManager{
    private  incomingUser : WebSocket[] = [];
    private  pendingUser : WebSocket| null = null;
    private static instance : GameManager;
    public games : Game[] = [];
    private userId: number =0;
    private constructor()
    {
        this.incomingUser = [];
    } 
    public static getInstance()
    {
        if(GameManager.instance)
        {
            return GameManager.instance;
        }
        GameManager.instance = new GameManager();
        return GameManager.instance;
    }

    
    public addUser(socket : WebSocket)
    {
        console.log(++this.userId);
        this.incomingUser.push(socket);
        this.addHandler(socket);
        

    }
    public removeUser(socket : WebSocket)
    {
        //remove the user and end the game
    }
    
    private addHandler(socket : WebSocket)
    {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString() );
            console.log(message.type);

            if( message.type === GAME_INIT)
            {
                if(this.pendingUser != null)
                {
                    //start the game: get a instance of the game class 
                    console.log("game is started");
                    const chessGame = new Game(socket,this.pendingUser);
                    this.games.push(chessGame);
                    this.pendingUser == null;
                }
                else
                {
                    console.log("match not found")
                    this.pendingUser = socket;
                }
            }
            if(message.type === MOVE)
            {
                //find the game for this specific user and add the move in the move array
                //find the game for that user
                const currentGame = this.games.find(game => game.player1 === socket || game.player2 === socket);
                console.log("moves has started coming");
                
                currentGame?.addMove(socket,message.move);
            }
        })
    }
}