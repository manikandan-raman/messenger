import React from "react";
import AvatarSvg from "../../public/assets/avatar.svg";
import { useChat } from "../contexts/ChatContext";
import { useNavigate } from "react-router-dom";
import { useEmoji } from "../contexts/EmojiContext";

const ChatListItem = ({ user }) => {
  const { setSelectedUser } = useChat();
  const { setShowEmoji, setSelectedEmoji } = useEmoji();
  const navigate = useNavigate();

  const openChat = (user) => {
    setSelectedUser(user);
    setSelectedEmoji("");
    setShowEmoji(false);
    navigate(`/chats/${user._id}`);
  };

  return (
    <div
      className="rounded-sm cursor-pointer px-2 hover:bg-gray-200"
      onClick={() => openChat(user)}
    >
      <div className="p-2 flex items-center gap-2">
        <img
          className="basis-[15%] size-12 my-1 rounded-full"
          src={AvatarSvg}
          alt="avatar"
        />
        <div className="basis-[65%]">
          <p>{user?.name}</p>
          <p className="line-clamp-1">
            {user?.last_message?.content || "Yet to message"}
          </p>
        </div>
        <p className="text-sm basis-[20%] text-right">
          {user?.last_message?.time}
        </p>
      </div>
    </div>
  );
};

export default ChatListItem;
