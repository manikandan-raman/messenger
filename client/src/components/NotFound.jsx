import React from "react";
import NotFoundSvG from "../../public/assets/404.svg";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col gap-4">
        <img className="w-32 md:w-64" src={NotFoundSvG} alt="not-found" />
        <p className="text-center md:text-xl">Page not found</p>
      </div>
    </div>
  );
};

export default NotFound;
