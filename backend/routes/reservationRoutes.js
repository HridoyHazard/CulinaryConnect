import express from "express";
import {
  getReservations,
  createReservation,
  updateReservation,
  getReservationById,
  cancelReservation,
  deleteReservation,
  getReservationsByUserId,
} from "../controller/reservationController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//// Reservation Routes
router.route("/").get(protect, getReservations);
router.route("/").post(protect, createReservation);
router.route("/cancel/:id").put(protect, cancelReservation);
router.route("/user/:userId").get(protect, getReservationsByUserId);
router.route("/:id").get(protect, getReservationById);
router.route("/:id").put(updateReservation);
router.route("/:id").delete(deleteReservation);

export default router;
