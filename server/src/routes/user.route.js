import { Router } from "express";
import {
  addContactToUser,
  checkUserNameExists,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/is-available", checkUserNameExists);
router.get("/", protectRoute, getAllUsers);
router.get("/:id", protectRoute, getUserById);
router.patch(
  "/:user_id/addcontact/:contact_id",
  protectRoute,
  addContactToUser
);

export default router;
