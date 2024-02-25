import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/:id", protectRoute, getUserById);

export default router;
