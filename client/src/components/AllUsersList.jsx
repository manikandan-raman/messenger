import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { httpCall } from "../utils/api-instance";
import AvatarSvg from "../../public/assets/avatar.svg";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useChat } from "../contexts/ChatContext";
import cookie from "js-cookie";

const AllUsersList = ({ setShowAllUsers, searchField }) => {
  const [usersList, setUserList] = useState([]);
  const [orgUsersList, setOrgUserList] = useState([]);
  const navigate = useNavigate();
  const { setSelectedUser } = useChat();
  const { currentUser } = useCurrentUser();
  const { isLoading, data } = useQuery({
    queryKey: ["allUsersList"],
    queryFn: async () => {
      return (await httpCall.get(`user`)).data;
    },
  });

  useEffect(() => {
    setOrgUserList(data?.users);
    setUserList(data?.users);
  }, [data]);

  useEffect(() => {
    if (searchField) {
      setUserList(
        usersList.filter((user) =>
          user.name.toLowerCase().includes(searchField.toLowerCase())
        )
      );
    } else if (usersList.length !== orgUsersList.length) {
      setUserList(orgUsersList);
    }
  }, [searchField]);

  const addContactToUser = async (contact_id) => {
    const response = await httpCall.patch(
      `user/${currentUser._id}/addcontact/${contact_id}`,
      {}
    );

    if (response.data.user._id) {
      setShowAllUsers(false);
      setSelectedUser(response.data.user);
      navigate(`/chats/${response.data.user._id}`);
    }
  };

  return (
    <div className="px-2 w-full">
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          {usersList?.map((user) => (
            <div
              key={user?._id}
              className="rounded-sm cursor-pointer hover:bg-gray-200"
            >
              <div className="p-2 flex items-center gap-2">
                <img
                  className="basis-[15%] size-12 my-1 rounded-full"
                  src={AvatarSvg}
                  alt="avatar"
                />
                <div className="basis-[65%]">
                  <p>
                    {user?.name +
                      (user._id === currentUser?._id ? " (You)" : "")}
                  </p>
                  <p className="line-clamp-1">User Status Will be Shown Here</p>
                </div>
                {!JSON.parse(cookie.get("currentUserContacts"))?.includes(
                  user._id
                ) && (
                  <button
                    className="basis-[20%] bg-blue-500 rounded-md text-white p-1"
                    onClick={() => addContactToUser(user?._id)}
                  >
                    + Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsersList;
