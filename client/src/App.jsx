import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatDetail from "./components/ChatDetail";
import ChatSideBar from "./components/ChatSideBar";
import { ChatProvider } from "./contexts/ChatContext";

const socket = io("ws://localhost:5000", {
  autoConnect: false,
  reconnection: false,
});

const App = () => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log(`Socket Id: ${socket.id}`);
    });

    socket.on("received_message", (message) => {
      setAllMessages((state) => [...state, message]);
    });

    return () => socket.disconnect();
  }, []);

  const joinRoom = () => {
    socket.emit("join_room", roomName);
    setJoined(true);
  };

  const sendMessage = () => {
    socket.emit("new_message", { roomName, message });
    setMessage("");
  };

  return (
    <ChatProvider>
      <div className="h-screen w-screen bg-blue-500">
        <div className="p-6 flex h-full z-10">
          <ChatSideBar />
          <ChatDetail />
        </div>
      </div>
    </ChatProvider>
  );
};

export default App;
