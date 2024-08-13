import {useEffect, useState} from "react"
export default function useSocket()
{
    const [socket,setSocket] = useState<WebSocket | null>(null);

    const URL = "ws://localhost:8080";
    useEffect(() => {
        const ws = new WebSocket(URL);

        ws.onopen = () => {
            console.log("WebSocket connection established");
            setSocket(ws);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
            setSocket(null); // Clear socket on close
        };
    }, []);
    return socket;
}