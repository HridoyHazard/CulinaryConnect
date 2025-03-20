import express from "express";
import { getCategories, getCategoryBySection, createCategory, updateCategory } from "../controller/menuController.js";

const router = express.Router();

router.route("/").get(getCategories);
router.route("/:section_name").get(getCategoryBySection);
router.route("/:section_name").put(updateCategory);
router.route("/").post(createCategory);


export default router;
