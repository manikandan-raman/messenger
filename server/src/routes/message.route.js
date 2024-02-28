import { Router } from "express";
import {
  addMessage,
  getAllMessagesByUser,
  updateMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protectRoute, addMessage);
router.get("/:receiver_id/:sender_id", protectRoute, getAllMessagesByUser);
router.patch("/:message_id", protectRoute, updateMessage);

export default router;
