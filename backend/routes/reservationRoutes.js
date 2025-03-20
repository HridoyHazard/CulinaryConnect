import express from "express";
import {
  getReservations,
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
} from "../controller/reservationController.js";

const router = express.Router();

router.route("/").get(getReservations).post(createReservation);
router.route("/:id").get(getReservationById);
router.route("/:id").put(updateReservation);
router.route("/:id").delete(deleteReservation);

export default router;
