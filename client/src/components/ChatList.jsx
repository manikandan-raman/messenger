import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";

import { useQuery } from "@tanstack/react-query";
import { httpCall } from "../utils/api-instance";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ChatList = ({ searchField }) => {
  const { currentUser } = useCurrentUser();
  const [usersList, setUserList] = useState([]);
  const [orgUsersList, setOrgUserList] = useState([]);

  const { isFetching, data } = useQuery({
    queryKey: ["usersList"],
    queryFn: async () => {
      return (await httpCall.get(`user/contacts/${currentUser._id}`)).data;
    },
    retry: 1,
    retryDelay: 100,
  });

  useEffect(() => {
    setOrgUserList(data?.user);
    setUserList(data?.user);
  }, [data]);

  useEffect(() => {
    if (usersList) {
      if (searchField !== "") {
        setUserList(
          usersList.filter((user) =>
            user.name.toLowerCase().includes(searchField.toLowerCase())
          )
        );
      } else if (usersList.length !== orgUsersList.length) {
        setUserList(orgUsersList);
      }
    }
  }, [searchField]);

  return (
    <div className="w-full">
      <div>
        {isFetching
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((user) => <ChatListItem key={user} />)
          : usersList &&
            usersList.map((user) => (
              <ChatListItem key={user._id} user={user} />
            ))}
      </div>
    </div>
  );
};

export default ChatList;
