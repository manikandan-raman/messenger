import { Router } from "express";
import {
  addMessage,
  getAllMessagesByUser,
  updateMessageToRead,
} from "../controllers/message.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protectRoute, addMessage);
router.get("/:receiver_id/:sender_id", protectRoute, getAllMessagesByUser);
router.patch("/:message_id", protectRoute, updateMessageToRead);

export default router;
