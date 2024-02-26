import React from "react";
import ChatListItem from "./ChatListItem";

import { useQuery } from "@tanstack/react-query";
import { httpCall } from "../utils/api-instance";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ChatList = () => {
  const { currentUser } = useCurrentUser();
  const { isLoading, data } = useQuery({
    queryKey: ["usersList"],
    queryFn: async () => {
      return (await httpCall.get("user")).data;
    },
  });

  return (
    <div className="px-2 w-full">
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          {data.users
            .filter((user) => user._id !== currentUser._id)
            .map((user) => (
              <ChatListItem key={user._id} user={user} />
            ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
