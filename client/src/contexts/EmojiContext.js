import { createContext, useContext, useMemo, useState } from "react";

export const EmojiContext = createContext({});

export const EmojiProvider = ({ children }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const value = useMemo(
    () => ({ showEmoji, setShowEmoji, selectedEmoji, setSelectedEmoji }),
    [showEmoji, selectedEmoji]
  );
  return (
    <EmojiContext.Provider value={value}>{children}</EmojiContext.Provider>
  );
};

export const useEmoji = () => useContext(EmojiContext);
