import React, { useEffect } from "react";
import ChatDetailHeader from "./ChatDetailHeader";
import ChatDetailFooter from "./ChatDetailFooter";
import MessageList from "./MessageList";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useChat } from "../contexts/ChatContext";
import { httpCall } from "../utils/api-instance";
import { useSocket } from "../contexts/SocketContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ChatDetail = () => {
  const { selectedUser } = useChat();
  const { socket } = useSocket();
  const { currentUser } = useCurrentUser();

  const { data: messagesList, refetch: refetchMessages } = useQuery({
    queryKey: ["userMessages", { id: selectedUser?._id }],
    queryFn: async () => {
      return (
        selectedUser?._id
          ? await httpCall.get(
              `message/${selectedUser?._id}/${currentUser?._id}`
            )
          : resolve([])
      ).data;
    },
  });

  const updateMessageRead = useMutation({
    mutationKey: ["updateMessageRead"],
    mutationFn: async (read) => {
      return await httpCall.patch("message", { read });
    },
    onSettled: async () => await refetchMessages(),
  });

  useEffect(() => {
    socket.on("received_message", (message) => {
      (async function () {
        // if (socket.connected) {
        //   updateMessageRead.mutate({ read: true });
        // }
        await refetchMessages();
      })();
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
