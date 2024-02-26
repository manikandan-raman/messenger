import React, { useState } from "react";
import PlusSvg from "../../public/assets/plus.svg";
import SmilieSvg from "../../public/assets/smilie.svg";
import RecorderSvg from "../../public/assets/recorder.svg";
import SendSvg from "../../public/assets/send.svg";
import { useSocket } from "../contexts/SocketContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { httpCall } from "../utils/api-instance";

const ChatDetailFooter = ({ selectedUser }) => {
  const [message, setMessage] = useState("");
  const { socket } = useSocket();
  const { currentUser } = useCurrentUser();
  const date = new Date();
  const currentDate = date.toLocaleDateString("zh-Hans-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const currentTime = date.toLocaleTimeString("en-IN", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  const sendMessage = async (event = undefined) => {
    if (event && event.key !== "Enter") {
      return;
    }
    const newMessage = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      content: message,
      date: currentDate,
      time: currentTime,
    };
    await httpCall.post("message", { data: newMessage });
    socket.emit("new_message", newMessage);
    setMessage("");
  };
  return (
    <div className="fixed bottom-6 bg-gray-50 h-16 p-2 flex items-center gap-2 w-[63%]">
      <img className="size-8 basis-[5%]" src={PlusSvg} alt="plus" />
      <input
        className="border border-stone-400 rounded-md p-2 basis-[90%] w-full"
        type="text"
        id="message"
        name="message"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => sendMessage(e)}
      />
      {false ? (
        <img
          className="size-10 basis-[5%] bg-teal-500 rounded-full py-1"
          src={RecorderSvg}
          alt="recorder"
        />
      ) : (
        <img
          className="size-10 basis-[5%] bg-teal-500 rounded-full py-1 cursor-pointer"
          src={SendSvg}
          alt="send"
          onClick={sendMessage}
        />
      )}
    </div>
  );
};

export default ChatDetailFooter;
