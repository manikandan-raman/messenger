import React, { useEffect } from "react";
import ChatDetailHeader from "./ChatDetailHeader";
import ChatDetailFooter from "./ChatDetailFooter";
import MessageList from "./MessageList";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useChat } from "../contexts/ChatContext";
import { httpCall } from "../utils/api-instance";
import { useSocket } from "../contexts/SocketContext";

const ChatDetail = () => {
  const { selectedUserId } = useChat();
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const { data: messagesList } = useQuery({
    queryKey: ["userMessages", selectedUserId],
    queryFn: async () => {
      return selectedUserId === null
        ? resolve([])
        : (await httpCall.get(`message/${selectedUserId}`)).data;
    },
    enabled: true,
  });

  useEffect(() => {
    socket.on("received_message", (message) => {
      queryClient.invalidateQueries({
        queryKey: ["userMessages", selectedUserId],
      });
    });
  }, [socket]);

  return (
    <div className="basis-2/3 bg-gray-50 relative overflow-y-scroll">
      <ChatDetailHeader />
      <MessageList messagesList={messagesList?.data} />
      <ChatDetailFooter selectedUserId={selectedUserId} />
    </div>
  );
};

export default ChatDetail;
