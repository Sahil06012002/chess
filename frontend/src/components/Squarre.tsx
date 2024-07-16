import { useEffect, useState } from "react";
import { chessBoard } from "../consts/chessBoard";

interface props { 
    key : string,
    coordinate : string
    id : string,
    fun(id : string) : void
}

export default function Square(props : props)
{
    function toGetId()
    {
        props.fun(props.id);
    }


    //const [arr,setArr]  = useState<string[]>([]);

    // useEffect(()=>{
    //     console.log("attacking");
    //     console.log(arr[0]);
    //     console.log(arr[1]);
    //     if(props.socket)
    //     {
    //         if(arr.length === 2)
    //         {
    //             props.socket.onopen = () =>{
    //                 console.log("connected");
    //                 props.socket?.send(JSON.stringify({
    //                     type: 'move',
    //                     move : {
    //                         from : arr[0],
    //                         to : arr[1]
    //                     }
    //                     }));        
    //             }
    //         }
    //     }
    // },[arr]);
    // function onClickHandler()
    // {
    //     if(props.socket === null)
    //     {
    //         alert("access denied");
    //         return;
    //     }
    //     //i need the position here
    //     const currentPosition = props.id;
    //     //call the be to fetch the attacking positions
    //     console.log(currentPosition);
    //     setArr([...arr,currentPosition]);
    // }

    let alphabet : number = props.coordinate.charCodeAt(0); 
    let num :  number  = parseInt(props.coordinate.charAt(1));
    const piece = chessBoard[props.id];


    if((alphabet+num) % 2 !==0 )
    return <div onClick={toGetId} id = {props.id} className="h-16 w-16 p-4 bg-[#89ad65]">
    {piece}
    </div>
    else
    return <div onClick={toGetId} id = {props.id} className="h-16 w-16 p-4 bg-[#e4e6b5]">
    {piece}
    </div>

}