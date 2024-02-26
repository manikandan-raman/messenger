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
const connectedUsers = new Map();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:1234",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("user_connected", ({ user_id, socket_id }) => {
    connectedUsers.set(user_id, socket_id);
    console.log(connectedUsers);
  });

  socket.on("new_message", (message) => {
    console.log({ newmessage: message });
    socket
      .to(connectedUsers.get(message.receiver))
      .emit("received_message", message);
  });

  socket.on("user_disconnected", (user_id) => {
    connectedUsers.delete(user_id);
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
