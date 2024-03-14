import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useMutation } from "@tanstack/react-query";
import AvatarSvg from "../../public/assets/avatar.svg";
import TickSvg from "../../public/assets/tick.svg";
import ClearSvg from "../../public/assets/clear.svg";
import EditSvg from "../../public/assets/edit.svg";
import { httpCall } from "../utils/api-instance";

const SettingsModal = ({ isOpen, onClose }) => {
  const [editStatus, setEditStatus] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [statusText, setStatusText] = useState(currentUser?.statusText);
  const statusInputRef = useRef(null);

  const updateStatusMutate = useMutation({
    mutationKey: ["updateUserStatusText"],
    mutationFn: async (data) => {
      return (await httpCall.patch(`user/${currentUser?._id}`, { data })).data;
    },
    onSettled: (data) => {
      setCurrentUser(data?.user);
      setEditStatus(false);
    },
  });

  useEffect(() => {
    if (editStatus) {
      statusInputRef.current.contentEditable = true;
      statusInputRef.current.focus();
    } else {
      statusInputRef.current.contentEditable = false;
      statusInputRef.current.blur();
    }
  }, [editStatus]);

  if (!isOpen) return;
  const modal = (
    <div className="fixed inset-0 translate-x-1/2 translate-y-1/2 z-10 w-1/2 h-1/2 bg-white rounded-md shadow-md">
      <div className="relative w-full h-full">
        <p
          className="absolute right-6 top-4 bg-red-300 rounded-full px-2 cursor-pointer"
          onClick={onClose}
        >
          x
        </p>
        <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
          <p className="text-xl text-center">Profile Settings</p>
          <img
            className="mt-4 mx-auto size-20 my-1 rounded-full"
            src={AvatarSvg}
            alt="avatar"
          />
          <p className="text-center">Name: {currentUser?.name}</p>
          <div className="text-center flex items-center gap-2">
            <p className="py-2">Status: </p>
            <span
              ref={statusInputRef}
              className="p-1"
              suppressContentEditableWarning={true}
              onChange={(e) => setStatusText(e.target.value)}
              defaultValue={statusText}
            >
              {currentUser?.statusText}
            </span>
            <img
              className="size-4 cursor-pointer"
              src={editStatus ? ClearSvg : EditSvg}
              alt="edit-or-clear"
              onClick={() => setEditStatus(!editStatus)}
            />
            {editStatus && (
              <img
                className="size-4 cursor-pointer"
                src={TickSvg}
                alt="edit"
                onClick={() =>
                  updateStatusMutate.mutate({
                    statusText: statusInputRef.current.innerText,
                  })
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.getElementById("portal"));
};

export default SettingsModal;
