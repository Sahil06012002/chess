import { useEffect, useState } from "react";
import { Chess, Color, PieceSymbol, Square } from "chess.js";

export const GAME_INIT = "game_init";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export default function ChessBoard({ socket }: { socket: WebSocket | null }) {
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState<
    ({
      square: Square;
      type: PieceSymbol;
      color: Color;
    } | null)[][]
  >(chess.board());
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data.payload.currentBoard);
        setBoard(data.payload.currentBoard);
      };
    }
  }, [socket]);

  return (
    <div className="flex flex-col bg-green-600">
      {board?.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((piece, colIndex) => (
            <div
              onClick={() => {
                const position = (String.fromCharCode(97 + colIndex) +
                  (8 - rowIndex)) as Square;
                if (!from) {
                  setFrom(position);
                } else {
                  console.log("cordinates of to  : " + position);
                  socket?.send(
                    JSON.stringify({
                      type: "move",
                      move: {
                        from: from,
                        to: position,
                      },
                    })
                  );
                  setFrom(null);
                }
              }}
              key={colIndex}
              className={`p-4 w-16 h-16 flex justify-center items-center ${
                (rowIndex + colIndex) % 2 === 0
                  ? "bg-green-600"
                  : "bg-slate-900"
              }`}
            >
              <div>
                <img
                  src={`${
                    piece?.color !== "b"
                      ? `${piece?.type}.png`
                      : `${piece?.type}B.png`
                  }`}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
