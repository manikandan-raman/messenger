import React from "react";
import { httpCall } from "../utils/api-instance";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import LoginIllustrationSvg from "../../public/assets/login_illustration.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useCookie } from "../hooks/useCookie";

const Login = () => {
  const { setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { setCookieValue } = useCookie();

  const schema = yup.object().shape({
    email: yup.string().email("enter valid email").required("enter email"),
    password: yup.string().required("enter password"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleLogin = async (data) => {
    const response = await httpCall.post("auth/signin", { data });

    if (response.status === 400) {
      setError("password", {
        type: "manual",
        message: "invalid credentials",
      });
    }
    if (response.data.token) {
      setCurrentUser(response.data.user);
      setCookieValue("token", response.data.token);
      setCookieValue("currentUser", response.data.user, true);
      navigate("/chats");
    }
  };
  return (
    <div className="w-screen h-svh grid place-items-center text-black bg-gray-200 object-center">
      <div className="w-full md:w-2/3 flex justify-center h-full md:h-2/3 shadow-lg shadow-slate-250">
        <div className="basis-full md:basis-1/2 bg-primary rounded-l-md">
          <form
            autoComplete="off"
            method="post"
            onSubmit={handleSubmit(handleLogin)}
            className="h-full flex flex-col justify-center items-center"
          >
            <h2 className="font-medium text-4xl text-white mb-6">mChat</h2>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              className="block w-2/3 px-4 py-2 rounded-md focus:outline-none"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 w-2/3 text-left mt-1">
                {errors.email.message}
              </span>
            )}
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="block w-2/3 px-4 py-2 rounded-md focus:outline-none mt-4"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 w-2/3 text-left mt-1">
                {errors.password.message}
              </span>
            )}
            <button
              className="text-primary w-[20%] bg-white px-4 py-2 rounded-md mt-4"
              type="submit"
            >
              Login
            </button>
            <h4 className="text-white mt-2">
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
