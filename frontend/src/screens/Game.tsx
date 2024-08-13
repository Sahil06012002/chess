
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import useSocket from "../hooks/useSocket";

export default function Game(){
    const socket = useSocket();
    function startGame()
    {
        socket?.send(JSON.stringify({
            type : "game_init"
        }))
    }
    return <div className="h-screen flex justify-around items-center">
        <div>
            <ChessBoard socket = {socket} />
        </div>
        <div> 
            <Button onclick = {startGame}>Find Match</Button>
        </div>
    </div>
}