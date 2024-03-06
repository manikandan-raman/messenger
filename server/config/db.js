import mongoose from "mongoose";
import logger from "./logger.js";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      logger.info("Mongoose connected");
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
