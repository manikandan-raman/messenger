import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({ users });
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("contacts")
    .sort({ createdAt: -1 });
  res.json({ user: user.contacts });
};
