import { Router } from "express";
import {
  addContactToUser,
  checkUserNameExists,
  getAllUsers,
  getUserById,
  getContactsById,
  updateUserById,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/is-available", checkUserNameExists);
router.get("/", protectRoute, getAllUsers);
router.get("/:id", protectRoute, getUserById);
router.get("/contacts/:id", protectRoute, getContactsById);
router.patch("/:id", protectRoute, updateUserById);
router.patch(
  "/:user_id/addcontact/:contact_id",
  protectRoute,
  addContactToUser
);

export default router;
