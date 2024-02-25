import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({ users });
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ user });
};
