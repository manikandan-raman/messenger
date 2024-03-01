import React, { useEffect, useState } from "react";
import PlusSvg from "../../public/assets/plus.svg";
import SmilieSvg from "../../public/assets/smilie.svg";
import RecorderSvg from "../../public/assets/recorder.svg";
import SendSvg from "../../public/assets/send.svg";
import { useSocket } from "../contexts/SocketContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { httpCall } from "../utils/api-instance";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const ChatDetailFooter = ({
  selectedUser,
  showEmoji,
  setShowEmoji,
  selectedEmoji,
}) => {
  const [message, setMessage] = useState("");
  const { socket } = useSocket();
  const { currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
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

  useEffect(() => {
    setMessage((state) => (state += selectedEmoji));
  }, [selectedEmoji]);

  const sendMessageMutation = useMutation({
    mutationKey: "sendMessage",
    mutationFn: async (newMessage) => {
      return await httpCall.post("message", { data: newMessage });
    },
    onSettled: async () =>
      Promise.all([
        await queryClient.refetchQueries({ queryKey: ["usersList"] }),
        await queryClient.refetchQueries({
          queryKey: ["userMessages", { id: selectedUser?._id }],
        }),
      ]),
  });

  const sendMessage = async (event = undefined) => {
    console.log({ event });
    if (event && event.type === "onKeyDown" && event.key !== "Enter") {
      return;
    }
    const newMessage = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      content: message,
      date: currentDate,
      time: currentTime,
    };
    setShowEmoji(false);
    sendMessageMutation.mutate(newMessage);
    // await httpCall.post("message", { data: newMessage });
    socket.emit("new_message", newMessage);
    setMessage("");
  };
  return (
    <div className="bg-gray-50 h-16 p-2 flex items-center gap-2">
      {/* <img className="size-8 basis-[5%]" src={PlusSvg} alt="plus" /> */}
      <img
        className="size-8 basis-[5%] cursor-pointer"
        src={SmilieSvg}
        alt="smilie-picker"
        onClick={() => setShowEmoji(!showEmoji)}
      />
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
          className="size-10 basis-[5%] bg-primary rounded-full p-1 cursor-pointer"
          src={SendSvg}
          alt="send"
          onClick={sendMessage}
        />
      )}
    </div>
  );
};

export default ChatDetailFooter;
