import { createContext, useContext, useMemo, useState } from "react";
import cookie from "js-cookie";

export const CurrentUserContext = createContext({});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    { _id: cookie.get("currentUserId") } || null
  );
  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
