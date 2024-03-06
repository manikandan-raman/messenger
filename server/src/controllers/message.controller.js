import { Types } from "mongoose";
import { Message } from "../models/message.model.js";

export const addMessage = async (req, res, next) => {
  try {
    let message = new Message(req.body);
    if (req.body.sender === req.body.receiver) {
      message.is_read = true;
    }
    message = await message.save();
    return res.json({ message });
  } catch (error) {
    return next(error);
  }
};

export const getAllMessagesByUser = async (req, res, next) => {
  try {
    const receiver = new Types.ObjectId(req.params.receiver_id);
    const sender = new Types.ObjectId(req.params.sender_id);
    const limit = req.query.limit ?? 8;
    const skip = req.query.offset ?? 0;
    const search = req.query.search ?? "";
    const messages = await Message.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                {
                  $and: [{ sender }, { receiver }],
                },
                { $and: [{ sender: receiver }, { receiver: sender }] },
              ],
            },
            {
              content: { $regex: search, $options: "i" },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "sender",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "receiver",
          foreignField: "_id",
          as: "receiver",
        },
      },
      {
        $unwind: "$sender",
      },
      {
        $unwind: "$receiver",
      },
      {
        $group: {
          _id: "$date",
          messages: {
            $push: {
              id: "$_id",
              sender: {
                _id: "$sender._id",
                name: "$sender.name",
              },
              receiver: {
                _id: "$receiver._id",
                name: "$receiver.name",
              },
              is_read: "$is_read",
              content: "$content",
              time: "$time",
            },
          },
        },
      },
      {
        $project: {
          date: "$_id",
          messages: 1,
          _id: 0,
        },
      },
      // {
      //   $skip: parseInt(skip),
      // },
      // {
      //   $limit: parseInt(limit),
      // },
      {
        $sort: { date: 1 },
      },
    ]).exec();
    return res.json({ data: messages });
  } catch (error) {
    return next(error);
  }
};

export const updateMessageToRead = async (req, res, next) => {
  try {
    const message = await Message.findOneAndUpdate(
      { _id: new Types.ObjectId(req.params.message_id) },
      { $set: { is_read: true } },
      { new: true }
    );
    return res.json({ message });
  } catch (error) {
    return next(error);
  }
};
