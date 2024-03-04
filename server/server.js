import express from "express";
import { createServer } from "http";
import cors from "cors";
import userRouter from "./src/routes/user.route.js";
import authRouter from "./src/routes/auth.route.js";
import messageRouter from "./src/routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { initializeSocket } from "./config/socket.js";
import logger from "./config/logger.js";
import errorHandler from "./utils/errorHandler.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = createServer(app);

initializeSocket(server);

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!!!!!" });
});

app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
  });
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
app.use(errorHandler);

server.listen(5000, () => console.log("Server up and running on 5000"));
