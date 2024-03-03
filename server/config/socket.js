import { Server } from "socket.io";
import { User } from "../src/models/user.model.js";
import { config } from "dotenv";

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
    console.log("socket.handshake.auth", socket.handshake.auth);
    if (socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("user_connected", ({ user_id, socket_id }) => {
      connectedUsers.set(user_id, socket_id);
      console.log(connectedUsers);
    });

    socket.on("new_message", (message) => {
      console.log({
        newmessage: message,
      });
      if (connectedUsers.has(message.receiver)) {
        socket
          .to(connectedUsers.get(message.receiver))
          .emit("received_message", message);
      }
    });

    socket.on("user_disconnected", (user_id) => {
      connectedUsers.delete(user_id);
      User.findById(user_id).then((user) => user.updateLastSeen());
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
}
