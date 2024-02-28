import React, { useEffect } from "react";
import AvatarSvg from "../../public/assets/avatar.svg";
import { useChat } from "../contexts/ChatContext";

const ChatListItem = ({ user }) => {
  const { setSelectedUser } = useChat();

  return (
    <div
      className="rounded-sm cursor-pointer hover:bg-gray-200"
      onClick={() => setSelectedUser(user)}
    >
      <div className="p-2 flex items-center gap-2">
        <img
          className="basis-[15%] size-12 my-1 rounded-full bg-red-200"
          src={AvatarSvg}
          alt="avatar"
        />
        <div className="basis-[67%]">
          <p>{user?.name}</p>
          <p className="line-clamp-1">
            {user?.last_message?.content || "Yet to message"}
          </p>
        </div>
        <p className="basis-[18%]">{user?.last_message?.time}</p>
      </div>
    </div>
  );
};

export default ChatListItem;
