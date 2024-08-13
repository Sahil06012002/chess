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


    let alphabet : number = props.coordinate.charCodeAt(0); 
    let num :  number  = parseInt(props.coordinate.charAt(1));
    const piece = chessBoard[props.id];


    return (
        <div
          onClick={toGetId}
          id={props.id}
          className={`h-20 w-20 p-4 ${ (alphabet + num) % 2 !== 0 ? "bg-[#89ad65]" : "bg-[#e4e6b5]"}`}
        >
          {piece}
        </div>
      );
}