import { WebSocket } from "ws";
import { GAME_INIT, MOVE } from "./Message";
import Game from "./Game";

interface ISocketIndentifier{
    id : number,
    socket : WebSocket
}

export default class GameManager{
    private  incomingUser : ISocketIndentifier[] = [];
    private  pendingUser : WebSocket| null = null;
    private static instance : GameManager;
    public games : Game[] = [];
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

    
    public addUser(socketIdentifier : ISocketIndentifier)
    {
        console.log(socketIdentifier.id);
        this.incomingUser.push(socketIdentifier); //socket : 1
        this.addHandler(socketIdentifier);
    }
    public getExistingUsersId()
    {
        console.log("these are all the existing users on the server");
        this.incomingUser.map((user)=> {
            console.log(user.id);
        })
    }
    public removeUser(socket : WebSocket)
    {
        //remove the user and end the game
    }
    
    private addHandler(socketIdentifier : ISocketIndentifier)
    {
        socketIdentifier.socket.on('message', (data) => {
            const message = JSON.parse(data.toString() );
            console.log(message.type);
            console.log("message from socket number : " ,socketIdentifier.id);

            if( message.type === GAME_INIT)
            {
                if(this.pendingUser != null && this.pendingUser !== socketIdentifier.socket)
                {
                    //start the game: get a instance of the game class 
                    console.log("game is started");
                    const chessGame = new Game(socketIdentifier.socket,this.pendingUser);
                    this.games.push(chessGame);
                    this.pendingUser == null;
                }
                else
                {
                    console.log("match not found")
                    this.pendingUser = socketIdentifier.socket;
                }
            }
            if(message.type === MOVE)
            {
                //find the game for this specific user and add the move in the move array
                //find the game for that user
                const currentGame = this.games.find(game => game.player1 === socketIdentifier.socket || game.player2 === socketIdentifier.socket);
                console.log("moves has started coming");
                console.log(JSON.stringify(message.move));
                
                currentGame?.addMove(socketIdentifier.socket,message.move);
            }

            
            if(message.type === "all_users")
            {
                this.getExistingUsersId();
            }
        })
    }
}