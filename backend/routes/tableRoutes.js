import express from "express";
import {
  getTables,
  createTable,
  getTableById,
  deleteTable,
  updateTable,
} from "../controller/tableController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, createTable).get(getTables);
router.route("/:id").get(getTableById);
router.route("/:id").delete(protect, admin, deleteTable);
router.route("/:id").put(protect, admin, updateTable);

export default router;
