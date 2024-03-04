import React, { useEffect, useState } from "react";
import AvatarSvg from "../../public/assets/avatar.svg";
import BackArrowSvg from "../../public/assets/back-arrow.svg";
import SearchSvg from "../../public/assets/search.svg";
import MenuSvg from "../../public/assets/menu.svg";
import ClearSvg from "../../public/assets/clear.svg";
import { useChat } from "../contexts/ChatContext";
import { useLastSeen } from "../hooks/useLastSeen";
import { useSocket } from "../contexts/SocketContext";
import { useNavigate } from "react-router-dom";

const ChatDetailHeader = ({ searchField, setSearchField }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const { selectedUser } = useChat();
  const { socket } = useSocket();
  const navigate = useNavigate();
  const lastSeen = useLastSeen(selectedUser?.last_seen);

  useEffect(() => {
    socket.on("is_typing", (is_typing) => {
      setIsTyping(is_typing);
    });

    socket.on("online", (onlineUsers) => {
      const d = new Map(JSON.parse(onlineUsers));
      setIsOnline(d.has(selectedUser._id));
    });
  }, [socket]);

  return (
    <div className="bg-gray-50 h-16 p-2 border-b-2 border-gray-100 flex justify-between items-center gap-2">
      <div className="flex gap-2 items-center">
        <img
          className="md:hidden size-4 rounded-fullmy-2 cursor-pointer"
          src={BackArrowSvg}
          alt="avatar"
          onClick={() => navigate("/chats")}
        />
        <img
          className="size-12 rounded-fullmy-2"
          src={AvatarSvg}
          alt="avatar"
        />
        <div>
          <p className="text-lg">{selectedUser?.name}</p>
          <p className="line-clamp-1">
            {isOnline ? "Online" : isTyping ? "typing..." : lastSeen}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {showSearch && (
          <div className="relative">
            <input
              className="border border-stone-400 px-2 py-1 w-full rounded-md focus:outline-none"
              type="text"
              name="search_chat"
              id="search_chat"
              autoComplete="off"
              placeholder="Search"
              onChange={(e) => setSearchField(e.target.value)}
              value={searchField}
            />
            {searchField && (
              <img
                className="w-4 absolute bottom-2 right-2 cursor-pointer"
                src={ClearSvg}
                alt="clear-icon"
                onClick={() => setSearchField("")}
              />
            )}
          </div>
        )}
        <img
          className="size-8 cursor-pointer"
          src={SearchSvg}
          alt="search"
          onClick={() => setShowSearch(!showSearch)}
        />
        <div className="relative">
          <img
            className="size-6 cursor-pointer"
            src={MenuSvg}
            alt="menu"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute z-20 bg-white py-2 px-8 right-4 text-center cursor-pointer rounded-md shadow-md">
              <p className="py-1">Block</p>
              <p className="py-1">Profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatDetailHeader;
