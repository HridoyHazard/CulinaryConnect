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

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/:id").get(protect, getUserById);
router.route("/:id").delete(protect, admin, deleteUser);
router.route("/profile").get(protect, getUsers).put(protect, updateUser);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);

export default router;
