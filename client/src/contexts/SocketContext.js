import { createContext, useContext, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const [socket] = useState(
    io("ws://localhost:5000", {
      autoConnect: false,
      reconnection: false,
    })
  );
  const value = useMemo(() => ({ socket }), [socket]);
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
