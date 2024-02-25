import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import userRouter from "./src/routes/user.route.js";
import authRouter from "./src/routes/auth.route.js";
import messageRouter from "./src/routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:1234",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket Id: " + socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("new_message", ({ roomName, message }) => {
    socket.to(roomName).emit("received_message", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

server.listen(5000, () => console.log("Server up and running on 5000"));
