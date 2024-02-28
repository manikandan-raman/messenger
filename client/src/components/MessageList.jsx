import React, { useEffect, useRef } from "react";
import MessageDetail from "./MessageDetail";

const ChatDetailMessageList = ({ messagesList }) => {
  const lastChatRef = useRef(null);
  useEffect(() => {
    lastChatRef.current.scrollIntoView({
      behaviour: "smooth",
    });
  }, [messagesList]);
  return (
    <div className="pb-16">
      {messagesList &&
        messagesList.map((messages, index) => (
          <MessageDetail
            key={index}
            date={messages.date}
            messages={messages.messages}
          />
        ))}
      <div ref={lastChatRef}></div>
    </div>
  );
};

export default ChatDetailMessageList;
