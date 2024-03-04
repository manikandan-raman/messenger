import React, { useState } from "react";
import { httpCall } from "../utils/api-instance";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import cookie from "js-cookie";
import LoginIllustrationSvg from "../../public/assets/login_illustration.svg";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await httpCall.post("auth/signin", {
      data: {
        email,
        password,
      },
    });
    if (response.data.token) {
      setCurrentUser(response.data.user);
      cookie.set("token", response.data.token, { secure: true });
      cookie.set("currentUserId", response.data.user._id);
      cookie.set(
        "currentUserContacts",
        JSON.stringify(response.data.user.contacts)
      );
      setTimeout(() => {
        navigate("/chats");
      }, 450);
    }
  };
  return (
    <div className="w-screen h-screen grid place-items-center text-black bg-gray-200 object-center">
      <div className="w-3/4 flex justify-center h-3/4 shadow-lg shadow-slate-250">
        <div className="basis-full md:basis-1/2 bg-primary rounded-l-md">
          <form
            autoComplete="off"
            method="post"
            onSubmit={(e) => handleLogin(e)}
            className="h-full flex flex-col justify-center items-center gap-4"
          >
            <h2 className="font-medium text-4xl text-white mb-2">mChat</h2>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block px-4 py-2 rounded-md focus:outline-none"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block px-4 py-2 rounded-md focus:outline-none"
            />
            <button
              className="text-primary bg-white px-4 py-2 rounded-md"
              type="submit"
            >
              Login
            </button>
            <h4 className="text-white">
              If you're new user? <Link to="/registration">Signup</Link>
            </h4>
          </form>
        </div>
        <div className="hidden md:block md:basis-1/2 bg-white rounded-r-md">
          <img
            className="w-full h-full"
            src={LoginIllustrationSvg}
            alt="login illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
