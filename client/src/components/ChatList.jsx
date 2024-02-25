import React from "react";
import ChatListItem from "./ChatListItem";

import { useQuery } from "@tanstack/react-query";
import { httpCall } from "../utils/api-instance";

const ChatList = () => {
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
          {data.users.map((user) => (
            <ChatListItem key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatList;
