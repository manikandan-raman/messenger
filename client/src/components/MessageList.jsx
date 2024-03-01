import React, { useEffect, useRef } from "react";
import MessageDetail from "./MessageDetail";
import EmojiPicker from "emoji-picker-react";

const ChatDetailMessageList = ({
  messagesList,
  showEmoji,
  setSelectedEmoji,
}) => {
  const lastChatRef = useRef(null);
  useEffect(() => {
    lastChatRef.current.scrollIntoView({
      behaviour: "smooth",
    });
  }, [messagesList, showEmoji]);
  return (
    <div className="overflow-y-scroll h-[calc(100%-8rem)]">
      {messagesList &&
        messagesList.map((messages, index) => (
          <MessageDetail
            key={index}
            date={messages.date}
            messages={messages.messages}
          />
        ))}
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
