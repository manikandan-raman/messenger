import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json({ users });
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};

export const getContactsById = async (req, res, next) => {
  try {
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
              createdAt: message.createdAt,
            }
          : {},
      });
    }
    response.sort(
      (a, b) =>
        new Date(a.last_message?.createdAt).getTime() -
        new Date(b.last_message?.createdAt).getTime()
    );
    return res.json({ user: response });
  } catch (error) {
    return next(error);
  }
};

export const checkUserNameExists = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.query.username });
    return res.json({ isAvailable: !!user?.username });
  } catch (error) {
    return next(error);
  }
};

export const addContactToUser = async (req, res, next) => {
  try {
    const { user_id, contact_id } = req.params;
    const user = await User.findById(user_id);
    if (!user.contacts.includes(contact_id)) {
      user.contacts = [...user.contacts, contact_id];
      await user.save();
    }
    const addedContact = await User.findById(contact_id);
    return res.json({ user: addedContact });
  } catch (error) {
    return next(error);
  }
};
