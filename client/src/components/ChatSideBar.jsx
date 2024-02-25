import React from "react";
import ChatList from "./ChatList";
import MenuSvg from "../../public/assets/menu.svg";

const ChatSideBar = () => {
  return (
    <>
      <div className="basis-2/6 px-2 bg-gray-50 overflow-y-scroll">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <img
              className="size-8"
              src="https://www.svgrepo.com/show/533270/message-square-lines-alt.svg"
              alt=""
            />
            <h2 className="text-xl">MyApp</h2>
          </div>
          <div>
            <img className="size-6" src={MenuSvg} alt="menu" />
          </div>
        </div>
        <div className="search-chat flex justify-between items-center p-4 gap-2">
          <input
            className="border border-stone-400 px-4 py-2 w-full rounded-md"
            type="text"
            name="search_chat"
            id="search_chat"
            placeholder="Search or start new chat"
          />
          <img
            className="size-8"
            src="https://www.svgrepo.com/show/509927/filter.svg"
            alt="filter"
          />
        </div>
        <div>
          <ChatList />
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
