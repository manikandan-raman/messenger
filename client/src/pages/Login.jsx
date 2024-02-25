import React, { useState } from "react";
import { httpCall } from "../utils/api-instance";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import cookie from "js-cookie";

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
      setCurrentUser({ _id: response.data.user._id });
      cookie.set("token", response.data.token, { secure: true });
      cookie.set("currentUserId", response.data.user._id);
      navigate("/chats");
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-red-300 text-black">
      <form
        autoComplete="off"
        method="post"
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col justify-center items-center gap-4"
      >
        <h2 className="font-medium text-xl">MyApp | Chat </h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block px-4 py-2 rounded-md"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block px-4 py-2 rounded-md"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
