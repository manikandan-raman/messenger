import React, { useState } from "react";
import AvatarSvg from "../../public/assets/avatar.svg";
import SearchSvg from "../../public/assets/search.svg";
import MenuSvg from "../../public/assets/menu.svg";
import { useChat } from "../contexts/ChatContext";
import { convertDate } from "../utils/date-convert";

const ChatDetailHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { selectedUser } = useChat();
  const last_seen = new Date(selectedUser?.last_seen);
  const time = last_seen.toLocaleTimeString("en-IN", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  let date = last_seen.toLocaleDateString("zh-Hans-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  date = convertDate(date);
  date = ["TODAY", "YESTERDAY"].includes(date)
    ? date.toLowerCase() + " at"
    : date;

  return (
    <div className="bg-gray-50 h-16 p-2 border-b-2 border-gray-100 flex justify-between items-center gap-2">
      <div className="flex gap-2 items-center">
        <img
          className="size-12 rounded-fullmy-2"
          src={AvatarSvg}
          alt="avatar"
        />
        <div>
          <p className="text-lg">{selectedUser?.name}</p>
          <p className="line-clamp-1">last seen {date + " " + time}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img className="size-8 cursor-pointer" src={SearchSvg} alt="search" />
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
