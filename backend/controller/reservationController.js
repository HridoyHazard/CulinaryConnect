import asyncHandler from "../middleware/asyncHandler.js";
import Reservation from "../models/Reservation.js";

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({});
  res.json(reservations);
});

// @desc    Create reservation
// @route   POST /api/reservations
// @access  Private/Admin
const createReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.create(req.body);
  if (!reservation) {
    res.status(400);
    throw new Error("Invalid data");
  }
  res.status(201).json(reservation);
});

// @desc    Get reservation by ID
// @route   GET /api/reservations/:id
// @access  Private/Admin
const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }
  res.json(reservation);
});

// @desc    Update reservation
// @route   PUT /api/reservations/:id
// @access  Private/Admin
const updateReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }
  const updatedReservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.json(updatedReservation);
});

// @desc    Delete reservation
// @route   Delete /api/reservations/:id
// @access  Private/Admin
const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }
  res.json({ message: "Reservation removed" });
});

export {
  getReservations,
  createReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
};
