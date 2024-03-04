import React from "react";
import WarningSvG from "../../public/assets/warning.svg";

const Warning = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col gap-4">
        <img className="w-32 md:w-64" src={WarningSvG} alt="not-found" />
        <p className="text-center md:text-xl">Something went wrong!!!</p>
      </div>
    </div>
  );
};

export default Warning;
