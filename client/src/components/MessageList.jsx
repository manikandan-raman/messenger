import React from "react";
import MessageDetail from "./MessageDetail";

const ChatDetailMessageList = ({ messagesList }) => {
  return (
    <div className="pb-10">
      {messagesList &&
        messagesList.map((messages, index) => (
          <MessageDetail
            key={index}
            date={messages.date}
            messages={messages.messages}
          />
        ))}
    </div>
  );
};

export default ChatDetailMessageList;
