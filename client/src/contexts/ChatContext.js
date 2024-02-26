import { createContext, useContext, useMemo, useState } from "react";

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const value = useMemo(
    () => ({ selectedUserId, setSelectedUserId }),
    [selectedUserId]
  );
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
