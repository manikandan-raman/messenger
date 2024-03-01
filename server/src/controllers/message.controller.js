import { Types } from "mongoose";
import { Message } from "../models/message.model.js";

export const addMessage = async (req, res) => {
  try {
    let message = new Message(req.body);
    message = await message.save();
    return res.json({ message });
  } catch (error) {
    console.error(error);
  }
};

export const getAllMessagesByUser = async (req, res) => {
  try {
    const receiver = new Types.ObjectId(req.params.receiver_id);
    const sender = new Types.ObjectId(req.params.sender_id);
    const limit = req.query.limit ?? 8;
    const skip = req.query.offset ?? 0;
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [{ sender }, { receiver }],
            },
            { $and: [{ sender: receiver }, { receiver: sender }] },
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
        $sort: { date: -1 },
      },
      {
        $skip: parseInt(skip),
      },
      {
        $limit: parseInt(limit),
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
      {
        $sort: { date: 1 },
      },
    ]).exec();
    return res.json({ data: messages });
  } catch (error) {
    console.error(error);
  }
};

export const updateMessage = async (req, res) => {
  try {
    let message = Message.findOne(req.params.message_id);
    message.read = true;
    message = await message.save();
    return res.json({ message });
  } catch (error) {
    console.error(error);
  }
};
