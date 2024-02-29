import React, { useEffect } from "react";
import { httpCall } from "../utils/api-instance";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Registration = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required("enter name"),
    username: yup.string().required("enter username"),
    email: yup.string().email("enter valid email").required("enter email"),
    password: yup
      .string()
      .min(8)
      .max(32)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message: "set strong password",
        }
      )
      .required("enter password"),
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const username = watch("username");

  useEffect(() => {
    setTimeout(() => {
      (async function () {
        if (username && username.length > 3) {
          const response = await httpCall.get(
            `user/is-available?username=${username}`
          );
          if (response?.isAvailable) {
            setError("username", {
              type: "manual",
              message: "username is already taken",
            });
          }
        }
      })();
    }, 1000);
  }, [username]);

  const handleRegistration = async (data) => {
    const response = await httpCall.post("auth/signup", {
      data,
    });

    if (response.data.user._id) {
      navigate("/login");
    }
  };

  return (
    <div className="w-screen h-screen grid place-items-center bg-red-300 text-black">
      <form autoComplete="off" onSubmit={handleSubmit(handleRegistration)}>
        <h2 className="font-medium text-xl text-center mb-4">MyApp | Chat </h2>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          {...register("name")}
          className="block px-4 py-2 rounded-md mt-2"
        />
        {errors.name && (
          <span className="text-red-500 text-left">{errors.name.message}</span>
        )}
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          {...register("username")}
          className="block px-4 py-2 rounded-md mt-2"
        />
        {errors.username && (
          <span className="text-red-500 mt-2">{errors.username.message}</span>
        )}
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          {...register("email")}
          className="block px-4 py-2 rounded-md mt-2"
        />
        {errors.email && (
          <span className="text-red-500 mt-2">{errors.email.message}</span>
        )}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          {...register("password")}
          className="block px-4 py-2 rounded-md mt-2"
        />
        {errors.password && (
          <span className="text-red-500 my-2 text-wrap">
            {errors.password.message}
          </span>
        )}
        <button
          className="bg-blue-600 mt-4 text-white px-4 py-2 rounded-md block mx-auto"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
