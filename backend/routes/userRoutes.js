import express from "express";
import {
  getUsers,
  registerUser,
  loginUser,
  getUserById,
  deleteUser,
  updateUser,
  logoutUser,
} from "../controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/:id").get(protect, getUserById);
router.route("/:id").delete(deleteUser);
router.route("/:id").put(updateUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
