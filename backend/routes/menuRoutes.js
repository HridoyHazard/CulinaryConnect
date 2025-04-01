import express from "express";
import {
  getMenu,
  getMenuByCategory,
  updateMenu,
  deleteMenu,
  createMenu,
} from "../controller/menuController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getMenu).post(protect, admin, createMenu);
router.route("/:category").get(getMenuByCategory);
router.route("/:id").put(protect, admin, updateMenu);
router.route("/:id").delete(protect, admin, deleteMenu);

export default router;
