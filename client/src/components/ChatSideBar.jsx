import React, { useState } from "react";
import ChatList from "./ChatList";
import MenuSvg from "../../public/assets/menu.svg";
import NewContactSvg from "../../public/assets/new-contact.svg";
import { useSocket } from "../contexts/SocketContext";
import cookie from "js-cookie";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import AllUsersList from "./AllUsersList";

const ChatSideBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const { socket } = useSocket();
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    socket.emit("user_disconnected", currentUser._id);
    socket.disconnect();
    cookie.remove("token");
    cookie.remove("currentUserId");
    navigate("/login");
  };
  return (
    <>
      <div className="basis-2/6 bg-gray-50 rounded-l-md border-r-2 border-gray-150">
        <div className="flex justify-between items-center p-4 h-16">
          <div className="flex items-center gap-2">
            <img
              className="size-8"
              src="https://www.svgrepo.com/show/533270/message-square-lines-alt.svg"
              alt=""
            />
            <h2 className="text-xl">mChat</h2>
          </div>
          <div className="flex gap-4">
            <img
              className="size-7 cursor-pointer"
              src={NewContactSvg}
              alt="new_contact"
              onClick={() => {
                setShowAllUsers(!showAllUsers);
                setShowMenu(false);
              }}
              title="All users"
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
                  <p className="py-1">Settings</p>
                  <p onClick={handleLogout} className="py-1">
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="search-chat flex justify-between items-center gap-2 p-4 h-16">
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
        <div className="overflow-y-scroll h-[calc(100%-8rem)]">
          {showAllUsers ? (
            <AllUsersList setShowAllUsers={setShowAllUsers} />
          ) : (
            <ChatList />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
