import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema(
  {
    sender: { type: Types.ObjectId, required: true, ref: "User" },
    receiver: { type: Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    is_read: { type: Boolean, default: false },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: true,
  }
);

export const Message = model("Message", messageSchema);
