import { Router } from "express";
import {
  addMessage,
  getAllMessagesByUser,
} from "../controllers/message.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protectRoute, addMessage);
router.get("/:id", protectRoute, getAllMessagesByUser);

export default router;
