import React from "react";
import { convertDate } from "../utils/date-convert";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import TickSvg from "../../public/assets/tick.svg";
import DoubleTickSvg from "../../public/assets/double-tick.svg";

const MessageDetail = ({ date, messages }) => {
  const { currentUser } = useCurrentUser();
  date = convertDate(date);
  return (
    <div className="pt-24">
      <div className="flex justify-center mb-2">
        <div className="rounded py-2 px-4 bg-[#DDECF2]">
          <p className="text-sm uppercase">{date}</p>
        </div>
      </div>
      {messages &&
        messages.map((message, index) => (
          <div key={index} className="w-full">
            {message?.sender?._id === currentUser?._id ? (
              <div className="flex justify-end mb-2">
                <div className="rounded-bl-xl rounded-tl-xl rounded-br-xl py-2 px-3 bg-[#E2F7CB] mr-4">
                  <p className="text-md mt-1 gap-1 pr-8">{message.content}</p>
                  <div className="flex gap-1 justify-end items-end">
                    <p className="text-xs text-grey-dark mt-1">
                      {message.time}{" "}
                    </p>
                    <img
                      className="w-4"
                      src={message.read ? DoubleTickSvg : TickSvg}
                      alt="tick"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex mb-2">
                <div className="rounded-tr-xl rounded-br-xl rounded-bl-xl py-2 px-3 bg-[#F2F2F2] ml-4">
                  <p className="text-md mt-1">{message.content}</p>
                  <p className="text-right text-xs text-grey-dark mt-1">
                    {message.time}{" "}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default MessageDetail;
