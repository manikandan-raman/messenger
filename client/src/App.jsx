import React, { useEffect } from "react";
import ChatDetail from "./components/ChatDetail";
import ChatSideBar from "./components/ChatSideBar";
import { ChatProvider } from "./contexts/ChatContext";
import { useSocket } from "./contexts/SocketContext";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import { Navigate } from "react-router-dom";

const App = () => {
  const { socket } = useSocket();
  const { currentUser } = useCurrentUser();

  if (!currentUser?._id) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log(`Socket Id: ${socket.id}`);
      if (currentUser._id && socket.id) {
        socket.emit("user_connected", {
          user_id: currentUser._id,
          socket_id: socket.id,
        });

        socket.emit("is-online", {
          user_id: currentUser._id,
          online_status: true,
        });
      }
    });

    return () => {
      if (currentUser?._id) {
        socket.emit("user_disconnected", currentUser._id);
        socket.disconnect();
      }
    };
  }, []);

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
