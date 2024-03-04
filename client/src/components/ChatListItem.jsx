import React from "react";
import AvatarSvg from "../../public/assets/avatar.svg";
import { useChat } from "../contexts/ChatContext";
import { useNavigate } from "react-router-dom";
import { useEmoji } from "../contexts/EmojiContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ChatListItem = ({ user }) => {
  const { setSelectedUser } = useChat();
  const { currentUser } = useCurrentUser();
  const { setShowEmoji, setSelectedEmoji } = useEmoji();
  const navigate = useNavigate();

  const openChat = (user) => {
    setSelectedUser(user);
    setSelectedEmoji("");
    setShowEmoji(false);
    navigate(`/chats/${user._id}`);
  };

  return user?._id ? (
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
          <p>{user?.name + (user._id === currentUser?._id ? " (You)" : "")}</p>
          <p className="line-clamp-1">
            {user?.last_message?.content || "Yet to message"}
          </p>
        </div>
        <p className="text-sm basis-[20%] text-right">
          {user?.last_message?.time}
        </p>
      </div>
    </div>
  ) : (
    <div className="rounded-sm cursor-pointer px-2 hover:bg-gray-200">
      <div className="p-2 flex items-center gap-2">
        <img
          className="basis-[15%] size-12 my-1 rounded-full"
          src={AvatarSvg}
          alt="avatar"
        />
        <div className="basis-[65%]">
          <p className="animate-pulse bg-gray-400 w-[55%] h-2"></p>
          <p className="animate-pulse bg-gray-400 w-[55%] h-2 mt-2"></p>
        </div>
        <p className="animate-pulse bg-gray-400 w-[20%] h-2 basis-[20%] text-right"></p>
      </div>
    </div>
  );
};

export default ChatListItem;
