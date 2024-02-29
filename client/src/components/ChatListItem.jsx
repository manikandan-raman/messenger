import React from "react";
import AvatarSvg from "../../public/assets/avatar.svg";
import { useChat } from "../contexts/ChatContext";
import { useNavigate } from "react-router-dom";

const ChatListItem = ({ user }) => {
  const { setSelectedUser } = useChat();
  const navigate = useNavigate();

  const openChat = (user) => {
    setSelectedUser(user);
    navigate(`/chats/${user._id}`);
  };

  return (
    <div
      className="rounded-sm cursor-pointer hover:bg-gray-200"
      onClick={() => openChat(user)}
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
