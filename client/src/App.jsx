import React, { useEffect } from "react";
import ChatDetail from "./components/ChatDetail";
import ChatSideBar from "./components/ChatSideBar";
import { useChat } from "./contexts/ChatContext";
import { useSocket } from "./contexts/SocketContext";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import { Navigate, useParams } from "react-router-dom";
import { useGetUserById } from "./hooks/useGetUserById";

const App = () => {
  const { socket } = useSocket();
  const { currentUser } = useCurrentUser();
  const { setSelectedUser } = useChat();
  const { receiver_id } = useParams();
  const { data } = useGetUserById(receiver_id);

  if (!currentUser?._id) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    setSelectedUser(data?.user);
  }, [data?.user]);

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
    <div className="h-screen w-screen bg-blue-500">
      <div className="p-6 flex h-full z-10">
        <ChatSideBar />
        <ChatDetail />
      </div>
    </div>
  );
};

export default App;
