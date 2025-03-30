import express from "express";
import { getMenu , getMenuByCategory, updateMenu, deleteMenu, createMenu } from "../controller/menuController.js";

const router = express.Router();

router.route("/").get(getMenu).post(createMenu);
router.route("/:category").get(getMenuByCategory);
router.route("/:id").put(updateMenu);
router.route("/:id").delete(deleteMenu);

export default router;
