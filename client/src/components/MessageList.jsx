import React, { useEffect, useRef } from "react";
import MessageDetail from "./MessageDetail";
import EmojiPicker from "emoji-picker-react";
import SelectConversationSvg from "../../public/assets/select-conversation.svg";
import EmptyMessageSvg from "../../public/assets/empty-message.svg";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useChat } from "../contexts/ChatContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { httpCall } from "../utils/api-instance";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import { useSocket } from "../contexts/SocketContext";

const ChatDetailMessageList = ({
  searchField,
  showEmoji,
  setSelectedEmoji,
}) => {
  const lastChatRef = useRef(null);

  const { selectedUser } = useChat();
  const { socket } = useSocket();
  const { currentUser } = useCurrentUser();
  const { ref, inView } = useInView();
  const [searchval] = useDebounce(searchField, 800);

  const {
    data: { pages: messagesList } = {},
    refetch: refetchMessages,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["userMessages", { id: selectedUser?._id, search: searchval }],
    queryFn: async ({ pageParam }) => {
      return (
        selectedUser?._id
          ? await httpCall.get(
              `message/${selectedUser?._id}/${currentUser?._id}?limit=10&offset=${pageParam}&search=${searchval}`
            )
          : resolve([])
      ).data;
    },
    maxPages: 2,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => undefined,
  });

  useEffect(() => {
    console.log(searchField);
  }, [searchField]);

  // useEffect(() => {
  //   if (
  //     inView &&
  //     hasNextPage &&
  //     messagesList?.[messagesList?.length - 1].nextId
  //   ) {
  //     fetchNextPage();
  //   }
  // }, [fetchNextPage, inView]);

  useEffect(() => {
    lastChatRef?.current?.scrollIntoView({
      behaviour: "smooth",
    });
  }, [messagesList, showEmoji]);

  const updateMessageRead = useMutation({
    mutationKey: ["updateMessageRead"],
    mutationFn: async ({ message_id, read }) => {
      return await httpCall.patch(`message/${message_id}`, { read });
    },
    onSettled: async () => await refetchMessages(),
  });

  useEffect(() => {
    socket.on("received_message", (message) => {
      (async function () {
        updateMessageRead.mutate({ message_id: message._id, read: true });
        await refetchMessages();
      })();
    });
  }, [socket]);

  return (
    <div className="overflow-y-scroll h-[calc(100%-8rem)]">
      <div ref={ref}></div>
      {isFetching && <p>Loading...</p>}
      {messagesList?.[0].data?.length > 0 &&
        messagesList?.map((page, i) => (
          <div key={i}>
            {page &&
              page?.data.map((messages, index) => (
                <MessageDetail
                  key={index}
                  date={messages.date}
                  messages={messages.messages}
                />
              ))}
          </div>
        ))}
      {messagesList?.[0].data?.length === 0 && !searchField && (
        <div className="flex flex-col justify-center items-center h-full">
          <img
            className="w-[40%]"
            src={SelectConversationSvg}
            alt="select-conversation"
          />
          <p>Start a conversation</p>
        </div>
      )}
      {messagesList?.[0].data?.length === 0 && searchField && (
        <div className="flex flex-col justify-center items-center h-full">
          <img
            className="w-[40%]"
            src={EmptyMessageSvg}
            alt="select-conversation"
          />
          <p>No message found</p>
        </div>
      )}

      <EmojiPicker
        className="absolute z-20"
        onEmojiClick={(e) => setSelectedEmoji(e.emoji)}
        width={400}
        height={400}
        open={showEmoji}
      />
      <div ref={lastChatRef}></div>
    </div>
  );
};

export default ChatDetailMessageList;
