import { createContext, useContext, useMemo, useState } from "react";

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const value = useMemo(
    () => ({ selectedUser, setSelectedUser }),
    [selectedUser]
  );
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
