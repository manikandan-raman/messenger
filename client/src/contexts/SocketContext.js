import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { API_BASE_URL as SOCKET_BASE_URL } from "../utils/constant";
import { useCookie } from "../hooks/useCookie";

export const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const { getValueFromCookie } = useCookie();
  const [socket, setSocket] = useState(undefined);
  useEffect(() => {
    setSocket(
      io(SOCKET_BASE_URL, {
        autoConnect: false,
        reconnection: false,
        auth: { token: getValueFromCookie("token") },
        // transports: ["websocket"],
      })
    );
  }, []);
  const value = useMemo(() => ({ socket }), [socket]);
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
