import asyncHandler from "../middleware/asyncHandler.js";
import Reservation from "../models/Reservation.js";
import Table from "../models/Table.js";
import { v4 as uuidv4 } from "uuid";

import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
  const {
    userId,
    customer_name,
    customer_email,
    check_in_date,
    check_in_time,
    check_out_time,
    totalAmount,
    capacity,
    table_no,
    itemsMenu,
    token,
  } = req.body;

  console.log(req.body);

  try {
    // creating customer
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    //    creating payment
    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: "USD",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      console.log(payment);
      const reservation = await Reservation.create({
        userId,
        customer_name,
        customer_email,
        check_in_date,
        check_in_time,
        check_out_time,
        totalAmount,
        capacity,
        table_no,
        itemsMenu,
        paymentStatus: payment.status,
        paymentId: payment.id,
        status: "Confirmed",
      });

      const updatedTable = await Table.findOneAndUpdate(
        { table_no: table_no },
        { $set: { status: "Booked" } },
        { new: true }
      );

      if (!updatedTable) {
        res.status(404);
        throw new Error("Table not found");
      }

      res.status(201).json(reservation);
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
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
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);
  if (!reservation) {
    res.status(404);
    throw new Error("Reservation not found");
  }
  res.json({ message: "Reservation removed" });
});

// @desc    Cancel reservation
// @route   PUT /api/reservations/cancel/:id
// @access  Private/Admin
const cancelReservation = asyncHandler(async (req, res) => {
  // Find the reservation and update the status to 'Cancelled'
  const updateReservation = await Reservation.findByIdAndUpdate(
    req.params.id,
    { status: "Cancelled" }, // Update the status field to 'Cancelled'
    { new: true } // Ensure the updated reservation is returned
  );

  // Check if the reservation exists
  if (!updateReservation) {
    return res.status(404).json({ message: "Reservation not found" });
  }

  // Update the table status to 'Available'
  const updatedTable = await Table.findOneAndUpdate(
    { table_no: updateReservation.table_no }, // Find the table by table number
    { $set: { status: "Available" } },  // Set the status to 'Available'
    { new: true } // Return the updated table document
  );

  // Check if the table was successfully found and updated
  if (!updatedTable) {
    return res.status(404).json({ message: "Table not found" });
  }

  // Return the success response with the updated reservation and table
  res.json({
    message: "Reservation Cancelled and Table Available",
    reservation: updateReservation,
    table: updatedTable,
  });
});

export {
  getReservations,
  createReservation,
  cancelReservation,
  deleteReservation,
  updateReservation,
  getReservationById,
};
