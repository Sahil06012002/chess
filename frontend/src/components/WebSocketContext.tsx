import React, { createContext, useContext, useState } from "react";

// Create a WebSocketContext using createContext from React
const WebSocketContext = createContext();

// Custom hook useWebSocket to consume the WebSocketContext
export function useWebSocket() {
  return useContext(WebSocketContext);
}

// WebSocketProvider component to provide WebSocket context to its children
export function WebSocketProvider({ children }) {
  // useState hook to manage the WebSocket instance
  const [socket, setSocket] = useState(null);

  // Provides the WebSocketContext to its children components
  return (
    <WebSocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
}
