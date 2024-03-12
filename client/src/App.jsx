import React, { useEffect } from "react";
import ChatDetail from "./components/ChatDetail";
import ChatSideBar from "./components/ChatSideBar";
import { useChat } from "./contexts/ChatContext";
import { useSocket } from "./contexts/SocketContext";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import { Navigate, useParams } from "react-router-dom";
import { useGetUserById } from "./hooks/useGetUserById";
import { jwtDecode } from "jwt-decode";
import { EmojiProvider } from "./contexts/EmojiContext";
import { useCookie } from "./hooks/useCookie";

const App = () => {
  const { getValueFromCookie } = useCookie();
  const { socket } = useSocket();
  const { currentUser } = useCurrentUser();
  const { setSelectedUser } = useChat();
  const { receiver_id } = useParams();
  const { data } = useGetUserById(receiver_id);

  if (!currentUser?._id) {
    return <Navigate to="/login" />;
  } else {
    const { exp } = jwtDecode(getValueFromCookie("token"));
    if (Date.now() >= exp * 1000) {
      return <Navigate to="/login" />;
    }
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

  useEffect(() => {
    setSelectedUser(data?.user);
  }, [data?.user]);

  return (
    <div className="h-svh w-screen bg-primary">
      <div className="md:p-10 flex h-full z-10">
        <EmojiProvider>
          <ChatSideBar />
          <ChatDetail />
        </EmojiProvider>
      </div>
    </div>
  );
};

export default App;
