import { config } from "dotenv";

config();
export const COOKIE_OPTIONS = {
  maxAge: 900000,
  httpOnly: false,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: "None",
};
