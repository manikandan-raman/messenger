import React, { useEffect } from "react";
import { httpCall } from "../utils/api-instance";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoginIllustrationSvg from "../../public/assets/login_illustration.svg";
import { useDebounce } from "use-debounce";

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
  const [usernameval] = useDebounce(username, 1000);

  useEffect(() => {
    (async function () {
      if (usernameval) {
        const response = await httpCall.get(
          `user/is-available?username=${usernameval}`
        );
        if (response?.isAvailable) {
          setError("username", {
            type: "manual",
            message: "username is already taken",
          });
        }
      }
    })();
  }, [usernameval]);

  const handleRegistration = async (data) => {
    const response = await httpCall.post("auth/signup", {
      data,
    });

    if (response.data.user._id) {
      navigate("/login");
    }
  };

  return (
    <div className="w-screen h-screen grid place-items-center text-black">
      <div className="w-full md:w-3/4 flex justify-center h-full md:h-3/4 shadow-lg shadow-slate-250">
        <div className="basis-full md:basis-1/2 bg-primary rounded-l-md">
          <form
            autoComplete="off"
            className="h-full flex flex-col justify-center items-center gap-2"
            onSubmit={handleSubmit(handleRegistration)}
          >
            <h2 className="font-medium text-4xl text-white mb-2">mChat</h2>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              {...register("name")}
              className="block focus:outline-none px-4 py-2 rounded-md mt-2"
            />
            {errors.name && (
              <span className="text-red-500 text-left">
                {errors.name.message}
              </span>
            )}
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              {...register("username")}
              className="block focus:outline-none px-4 py-2 rounded-md mt-2"
            />
            {errors.username && (
              <span className="text-red-500 mt-2">
                {errors.username.message}
              </span>
            )}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              {...register("email")}
              className="block focus:outline-none px-4 py-2 rounded-md mt-2"
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
              className="block focus:outline-none px-4 py-2 rounded-md mt-2"
            />
            {errors.password && (
              <span className="text-red-500 my-2 text-wrap">
                {errors.password.message}
              </span>
            )}
            <button
              className="text-primary mt-2 bg-white px-4 py-2 rounded-md block mx-auto"
              type="submit"
            >
              Register
            </button>
            <h4 className="text-white">
              Already have an account? <Link to="/login">Sign in</Link>
            </h4>
          </form>
        </div>
        <div className="hidden md:block md:basis-1/2 rounded-r-md">
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

export default Registration;
