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
    const id = req.params.id;
    // const messages = await Message.find({
    //   $or: [{ sender: id }, { receiver: id }],
    // })
    //   .populate([
    //     { path: "sender", model: "User", select: ["_id", "name"] },
    //     { path: "receiver", model: "User", select: ["_id", "name"] },
    //   ])
    //   .exec();
    const messages = await Message.aggregate([
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
