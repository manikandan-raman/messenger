import React from "react";
import AvatarSvg from "../../public/assets/avatar.svg";
import SearchSvg from "../../public/assets/search.svg";
import MenuSvg from "../../public/assets/menu.svg";

const ChatDetailHeader = () => {
  return (
    <div className="bg-gray-50 h-16 p-2 border-2 border-gray-100 flex justify-between items-center gap-2 fixed w-[64%]">
      <div className="flex gap-2 items-center">
        <img
          className="size-12 rounded-full bg-red-200 my-2"
          src={AvatarSvg}
          alt="avatar"
        />
        <div>
          <p className="text-lg">Pakki 🧡</p>
          <p className="line-clamp-1">last seen today at 10:50am</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img className="size-8" src={SearchSvg} alt="search" />
        <img className="size-6" src={MenuSvg} alt="menu" />
      </div>
    </div>
  );
};

export default ChatDetailHeader;
