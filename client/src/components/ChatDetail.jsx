import React, { useEffect } from "react";
import ChatDetailHeader from "./ChatDetailHeader";
import ChatDetailFooter from "./ChatDetailFooter";
import MessageList from "./MessageList";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useChat } from "../contexts/ChatContext";
import { httpCall } from "../utils/api-instance";
import { useSocket } from "../contexts/SocketContext";

const ChatDetail = () => {
  const { selectedUser } = useChat();
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const { data: messagesList } = useQuery({
    queryKey: ["userMessages", selectedUser?._id],
    queryFn: async () => {
      return (await httpCall.get(`message/${selectedUser?._id}`)).data;
    },
    enabled: !!selectedUser?._id,
  });

  useEffect(() => {
    socket.on("received_message", (message) => {
      queryClient.invalidateQueries({
        queryKey: ["userMessages", selectedUser?._id],
      });
    });
  }, [socket]);

  return (
    <div className="basis-2/3 bg-gray-50 relative overflow-y-scroll">
      {selectedUser?._id ? (
        <>
          <ChatDetailHeader />
          <MessageList messagesList={messagesList?.data} />
          <ChatDetailFooter selectedUser={selectedUser} />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          Select a conversation
        </div>
      )}
    </div>
  );
};

export default ChatDetail;
