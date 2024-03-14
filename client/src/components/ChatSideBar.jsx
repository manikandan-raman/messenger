import React, { useState } from "react";
import ChatList from "./ChatList";
import MenuSvg from "../../public/assets/menu.svg";
import NewContactSvg from "../../public/assets/new-contact.svg";
import { useSocket } from "../contexts/SocketContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import AllUsersList from "./AllUsersList";
import { useChat } from "../contexts/ChatContext";
import SettingsModal from "./SettingsModal";
import { useCookie } from "../hooks/useCookie";
import { httpCall } from "../utils/api-instance";

const ChatSideBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { getValueFromCookie, removeValueFromCookie } = useCookie();
  const [showAllUsers, setShowAllUsers] = useState(() => {
    const contacts = getValueFromCookie("currentUser", true).contacts;
    return contacts ? false : true;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [searchField, setSearchField] = useState("");
  const { socket } = useSocket();
  const { selectedUser } = useChat();
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const handleLogout = async () => {
    socket.emit("user_disconnected", currentUser._id);
    await httpCall.get("auth/signout");
    socket.disconnect();
    navigate("/login");
  };

  const handleNewContact = () => {
    setShowMenu(false);
    setSearchField("");
    setShowAllUsers(!showAllUsers);
  };
  return (
    <>
      <div
        className={`${selectedUser?._id ? "hidden md:block" : ""}
          md:basis-[30%]  basis-full
         bg-gray-50 rounded-l-md border-r-2 border-gray-150`}
      >
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
              onClick={handleNewContact}
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
                <div className="absolute z-20 bg-white right-4 text-center cursor-pointer rounded-md shadow-md">
                  <p
                    className="hover:bg-secondary px-8 py-2 w-full"
                    onClick={() => {
                      setShowSettings(!showSettings);
                      setShowMenu(false);
                    }}
                  >
                    Settings
                  </p>
                  <p
                    onClick={handleLogout}
                    className="py-2 px-8 hover:bg-secondary"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {showSettings && (
          <SettingsModal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
          />
        )}
        <div className="search-chat flex justify-between items-center gap-2 p-4 h-16">
          <input
            className="border border-stone-400 px-4 py-2 w-full rounded-md focus:outline-none"
            type="text"
            name="search_chat"
            id="search_chat"
            autoComplete="off"
            placeholder="Search or start new chat"
            onChange={(e) => setSearchField(e.target.value)}
            value={searchField}
          />
          <img
            className="size-8"
            src="https://www.svgrepo.com/show/509927/filter.svg"
            alt="filter"
          />
        </div>
        <div className="overflow-y-scroll h-[calc(100%-8rem)]">
          {showAllUsers ? (
            <AllUsersList
              setShowAllUsers={setShowAllUsers}
              searchField={searchField}
            />
          ) : (
            <ChatList searchField={searchField} />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
