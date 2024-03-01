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
      setTimeout(() => {
        navigate("/chats");
      }, 250);
    }
  };
  return (
    <div className="w-screen h-screen grid place-items-center text-black">
      <div className="w-1/2 flex justify-center h-1/2 shadow-lg shadow-slate-250">
        <div className="basis-1/2 bg-primary rounded-l-md">
          <form
            autoComplete="off"
            method="post"
            onSubmit={(e) => handleLogin(e)}
            className="h-full flex flex-col justify-center items-center gap-4"
          >
            <h2 className="font-medium text-2xl text-white">mChat</h2>
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
              className="text-blue-600 bg-white px-4 py-2 rounded-md"
              type="submit"
            >
              Login
            </button>
            <h4 className="text-white">
              If you're new user? <Link to="/registration">Signup</Link>
            </h4>
          </form>
        </div>
        <div className="basis-1/2 rounded-r-md">
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
