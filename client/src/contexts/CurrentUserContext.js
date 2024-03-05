import { createContext, useContext, useMemo, useState } from "react";
import { useCookie } from "../hooks/useCookie";

export const CurrentUserContext = createContext({});

export const CurrentUserProvider = ({ children }) => {
  const { getValueFromCookie } = useCookie();
  const [currentUser, setCurrentUser] = useState(() => {
    const userDetails = getValueFromCookie("currentUser", true);
    if (userDetails) {
      return userDetails;
    }
    return null;
  });
  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
