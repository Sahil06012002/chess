import {  useEffect, useState } from "react";
import Square from "./Squarre";

export default function ChessBoard()
{

    const arr: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const nums : number[] = [8,7,6,5,4,3,2,1];

    //----------------------------------------------
    const [moves,setMoves]  = useState<string[]>([]);
    const connectionString = localStorage.getItem("socket");
    let message = null;
    if(connectionString)
    {
      message =  JSON.parse(connectionString);
    }
    useEffect(()=>{
        if(message)
        {
          console.log(message);
          console.log("got the conncetion");
            if(moves.length === 2)
            {
              message.onopen = () =>{
                    console.log("connected");
                    message.send(JSON.stringify({
                        type: 'move',
                        move : {
                            from : moves[0],
                            to : moves[1]
                        }
                        }));        
                }
              setMoves([]);
            }
        }
    },[moves]);
    //----------------------------------------



    function getSquareId(id : string)
    {
      setMoves([...moves,id]);
      console.log(id);
    }
    return <div className="bg-neutral-700 h-screen flex justify-center items-center">
      <div className="border-0 rounded-xl grid grid-cols-8">
        {
          nums.map((num) => 
          {
            return arr.map((alphabet) =>
              {
                const str  = alphabet+num;
                return <Square key={str} coordinate={str} id={str} fun = {getSquareId} />
              }
            )
          }
          )
        }
    </div>
    </div>
}