import { User } from "../models/user.model.js";
import { generateToken } from "../../utils/generateToken.js";

export const signUp = async (req, res) => {
  try {
    let user = new User(req.body);
    user = await user.save();
    res.json({ user });
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(400).json({
      message: "Bad Request",
      error: `No user found for the email: ${email}`,
    });
  }
  user.password = null;

  res.json({
    user,
    token: generateToken({ id: user._id }),
  });
};
