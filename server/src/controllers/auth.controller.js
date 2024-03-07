import { User } from "../models/user.model.js";
import { generateToken } from "../../utils/generateToken.js";

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
    res.json({
      user,
      token: generateToken({ id: user._id }),
    });
  } catch (error) {
    return next(error);
  }
};
