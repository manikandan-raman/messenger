import React, { useEffect } from "react";
import ChatDetailHeader from "./ChatDetailHeader";
import ChatDetailFooter from "./ChatDetailFooter";
import MessageList from "./MessageList";

import { useQuery } from "@tanstack/react-query";
import { useChat } from "../contexts/ChatContext";
import { httpCall } from "../utils/api-instance";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ChatDetail = () => {
  const { selectedUserId } = useChat();

  const { data: messagesList } = useQuery({
    queryKey: ["userMessages", selectedUserId],
    queryFn: async () => {
      return selectedUserId === null
        ? resolve([])
        : (await httpCall.get(`message/${selectedUserId}`)).data;
    },
    enabled: true,
  });

  return (
    <div className="basis-2/3 bg-gray-50 relative overflow-y-scroll">
      <ChatDetailHeader />
      <MessageList messagesList={messagesList?.data} />
      <ChatDetailFooter />
    </div>
  );
};

export default ChatDetail;
