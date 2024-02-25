import { createContext, useContext, useState } from "react";
import cookie from "js-cookie";

export const CurrentUserContext = createContext({});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    { _id: cookie.get("currentUserId") } || null
  );

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
