import React, { useEffect, useState } from "react";
import ChatDetailHeader from "./ChatDetailHeader";
import ChatDetailFooter from "./ChatDetailFooter";
import MessageList from "./MessageList";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useChat } from "../contexts/ChatContext";
import { httpCall } from "../utils/api-instance";
import { useSocket } from "../contexts/SocketContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useEmoji } from "../contexts/EmojiContext";
import SelectConversationSvg from "../../public/assets/select-conversation.svg";

const ChatDetail = () => {
  const [searchField, setSearchField] = useState("");
  const { selectedUser } = useChat();
  // const { socket } = useSocket();
  // const { currentUser } = useCurrentUser();
  const { showEmoji, setShowEmoji, selectedEmoji, setSelectedEmoji } =
    useEmoji();

  // const { data: messagesList, refetch: refetchMessages } = useQuery({
  //   queryKey: ["userMessages", { id: selectedUser?._id }],
  //   queryFn: async () => {
  //     return (
  //       selectedUser?._id
  //         ? await httpCall.get(
  //             `message/${selectedUser?._id}/${currentUser?._id}?limit=15&offset=0`
  //           )
  //         : resolve([])
  //     ).data;
  //   },
  // });

  // const {
  //   data: { pages: messagesList } = {},
  //   isFetching,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ["userMessages", { id: selectedUser?._id }],
  //   queryFn: async ({ pageParam }) => {
  //     return (
  //       selectedUser?._id
  //         ? await httpCall.get(
  //             `message/${selectedUser?._id}/${currentUser?._id}?limit=1&offset=${pageParam}`
  //           )
  //         : resolve([])
  //     ).data;
  //   },
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage, pages, lastPageParam) => {
  //     return lastPage?.nextId;
  //   },
  // });

  // const updateMessageRead = useMutation({
  //   mutationKey: ["updateMessageRead"],
  //   mutationFn: async (read) => {
  //     return await httpCall.patch("message", { read });
  //   },
  //   onSettled: async () => await refetchMessages(),
  // });

  // useEffect(() => {
  //   socket.on("received_message", (message) => {
  //     (async function () {
  //       // if (socket.connected) {
  //       //   updateMessageRead.mutate({ read: true });
  //       // }
  //       await refetchMessages();
  //     })();
  //   });
  // }, [socket]);

  return (
    <div className="basis-[70%] relative bg-secondary rounded-r-md">
      {selectedUser?._id ? (
        <>
          <ChatDetailHeader
            searchField={searchField}
            setSearchField={setSearchField}
          />
          <MessageList
            // messagesList={messagesList}
            searchField={searchField}
            showEmoji={showEmoji}
            setSelectedEmoji={setSelectedEmoji}
            // isFetching={isFetching}
            // fetchNextPage={fetchNextPage}
            // hasNextPage={hasNextPage}
          />
          <ChatDetailFooter
            selectedUser={selectedUser}
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            selectedEmoji={selectedEmoji}
          />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <img
            className="w-[40%]"
            src={SelectConversationSvg}
            alt="select-conversation"
          />
          <p>Select a conversation</p>
        </div>
      )}
    </div>
  );
};

export default ChatDetail;
