import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      console.log("Mongoose connected");
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
