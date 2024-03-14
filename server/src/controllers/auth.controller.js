import { User } from "../models/user.model.js";
import { generateToken } from "../../utils/generateToken.js";
import { COOKIE_OPTIONS } from "../../utils/constants.js";

export const signUp = async (req, res, next) => {
  try {
    let user = new User(req.body);
    user = await user.save();
    return res.status(201).json({ user });
  } catch (error) {
    return next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    user.password = null;
    const token = generateToken({ id: user._id });
    res.cookie("token", token, COOKIE_OPTIONS);
    res.clearCookie("currentUser");
    res.cookie(
      "currentUser",
      encodeURIComponent(JSON.stringify(user)),
      COOKIE_OPTIONS
    );
    res.json({
      user,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

export const signOut = async (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.clearCookie("currentUser", { path: "/" });
  res.clearCookie("currentUser");
  res.json({ msg: "success" });
};
