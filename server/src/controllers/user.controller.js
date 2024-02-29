import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json({ users });
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id)
    .populate("contacts", "-password")
    .sort({ createdAt: -1 });
  const response = [];

  for (const contact of user.contacts) {
    const { _id, name, last_seen } = contact;
    const message = await Message.findOne({
      $or: [
        {
          $and: [{ sender: id }, { receiver: contact._id }],
        },
        { $and: [{ sender: contact._id }, { receiver: id }] },
      ],
    }).sort({
      createdAt: -1,
    });
    response.push({
      _id,
      name,
      last_seen,
      last_message: message
        ? {
            _id: message._id,
            content: message.content,
            sender: message.sender,
            time: message.time,
          }
        : {},
    });
  }

  return res.json({ user: response });
};

export const checkUserNameExists = async (req, res) => {
  const user = await User.findOne({ username: req.query.username });
  res.json({ isAvailable: !!user?.username });
};

export const addContactToUser = async (req, res) => {
  const user = await User.findById(req.params.user_id);
  user.contacts = [...user.contacts, req.params.contact_id];
  await user.save();
  res.json({ user });
};
