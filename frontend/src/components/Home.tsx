import { useState } from "react";
import { json, useNavigate } from "react-router";
export default function Home()
{
    const navigate = useNavigate();
    function onClickHandler()
    {
        console.log("user wants to play game");
        const connection = new WebSocket('ws://localhost:8080/');
        const startGame = JSON.stringify({
            type: 'game_init'
          });
          console.log(connection);
        if(connection)
        {
            connection.onopen = () =>{
                connection.send(startGame);
            }
        }
        localStorage.setItem("socket", JSON.stringify(connection));
        //can navigate to the arena component and pass the socket instance there
        navigate('/game');
    }
    return <div className="h-screen bg-neutral-700 flex text-center justify-center items-center gap-10">
        <img className="h-[80%]" src="chess1.png" alt="" />
        <div>
        <div className="text-5xl my-5 font-semibold text-white">
            Welcome to the chess world
        </div>
        <button className="text-xl font-semibold border border-gray border-2 rounded-md py-2 px-4 bg-gray-100" onClick={onClickHandler}>
            Play
        </button>
        </div>
    </div>
}