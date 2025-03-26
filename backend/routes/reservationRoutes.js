import express from "express";
import {
  getReservations,
  createReservation,
  updateReservation,
  getReservationById,
  deleteReservation,
} from "../controller/reservationController.js";

const router = express.Router();

//// Reservation Routes
router.route("/").get(getReservations);
router.route("/").post(createReservation);
router.route("/:id").get(getReservationById);
router.route("/:id").put(updateReservation);
router.route("/:id").delete(deleteReservation);

export default router;
