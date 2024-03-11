import { Server } from "socket.io";
import { User } from "../src/models/user.model.js";
import { config } from "dotenv";
import logger from "./logger.js";

config();
export function initializeSocket(server) {
  const connectedUsers = new Map();

  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    if (socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("user_connected", ({ user_id, socket_id }) => {
      connectedUsers.set(user_id, socket_id);
      socket.broadcast.emit(
        "online",
        JSON.stringify(Array.from(connectedUsers))
      );
      logger.info(connectedUsers);
    });

    socket.on("new_message", (message) => {
      logger.info({
        newmessage: message,
      });
      if (connectedUsers.has(message.receiver)) {
        socket
          .to(connectedUsers.get(message.receiver))
          .emit("received_message", message);
      }
    });

    socket.on("is_typing", ({ receiver_id, typing }) => {
      socket.to(connectedUsers.get(receiver_id)).emit("is_typing", typing);
      if (!typing) {
        socket.broadcast.emit(
          "online",
          JSON.stringify(Array.from(connectedUsers))
        );
      }
    });

    socket.on("user_disconnected", (user_id) => {
      User.findById(user_id).then((user) => user.updateLastSeen());
      connectedUsers.delete(user_id);
    });

    socket.on("disconnect", () => {
      socket.emit("online", JSON.stringify(Array.from(connectedUsers)));
      console.log("A user disconnected");
    });

    socket.on("error", (error) => {
      console.error("socket error:", error);
      throw new Error(error);
    });
  });

  return io;
}
