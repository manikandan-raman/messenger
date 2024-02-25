import { createContext, useContext, useState } from "react";

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  return (
    <ChatContext.Provider value={{ selectedUserId, setSelectedUserId }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
