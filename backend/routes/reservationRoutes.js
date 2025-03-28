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
router.route("/").get(getReservations);
router.route("/").post(createReservation);
router.route("/cancel/:id").put(cancelReservation);
router.route("/user/:userId").get(getReservationsByUserId);
router.route("/:id").get(getReservationById);
router.route("/:id").put(updateReservation);
router.route("/:id").delete(deleteReservation);

export default router;
