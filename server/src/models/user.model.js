import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    last_seen: { type: Date, required: true, default: new Date() },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    statusText: { type: String, required: true, default: "Hey there!!!" },
    contacts: [{ type: Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.updateLastSeen = async function (next) {
  if (!this.last_seen) return next();
  this.last_seen = new Date();
  return await this.save();
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = model("User", userSchema);
