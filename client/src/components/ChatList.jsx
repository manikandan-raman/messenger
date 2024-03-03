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
  });

  useEffect(() => {
    setOrgUserList(data?.user);
    setUserList(data?.user);
  }, [data]);

  useEffect(() => {
    if (searchField !== "") {
      setUserList(
        usersList.filter((user) =>
          user.name.toLowerCase().includes(searchField.toLowerCase())
        )
      );
    } else if (usersList.length !== orgUsersList.length) {
      setUserList(orgUsersList);
    }
  }, [searchField]);

  return (
    <div className="w-full">
      {isFetching ? (
        "Loading..."
      ) : (
        <div>
          {usersList?.map((user) => (
            <ChatListItem key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
