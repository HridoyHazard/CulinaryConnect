import asyncHandler from "../middleware/asyncHandler.js";
import Reservation from "../models/Reservation.js";
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

// const processPayment = asyncHandler(async (req, res) => {
//   const { amount, token } = req.body;

//   // Validate required fields
//   if (!amount || !token) {
//     res.status(400);
//     throw new Error("Amount and token are required");
//   }

//   try {
//     // Step 1: Process payment with Stripe (PaymentIntent)
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100), // Convert dollars to cents
//       currency: "usd",
//       payment_method_data: {
//         // Use payment_method_data instead of payment_method
//         type: "card",
//         card: {
//           token: token.id, // Stripe token from the frontend (this is your card token)
//         },
//       },
//       confirm: true, // Automatically confirm the payment
//       automatic_payment_methods: {
//         enabled: true, // Enable automatic payment methods (no redirect-based methods)
//         allow_redirects: "never", // Disallow redirects
//       },
//     });

//     if (paymentIntent.status === "succeeded") {
//       console.log("Payment succeeded");

//       // Step 2: Send success response with the payment details (for use in creating the reservation)
//       res.status(200).json({
//         success: true,
//         message: "Payment successful",
//         paymentId: paymentIntent.id,
//         paymentStatus: paymentIntent.status,
//       });
//     } else {
//       res.status(400);
//       throw new Error("Payment failed, status: " + paymentIntent.status);
//     }
//   } catch (error) {
//     console.error("Error processing payment:", error);
//     res.status(500);
//     throw new Error(`Payment processing failed: ${error.message}`);
//   }
// });

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
      });
      
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

export {
  getReservations,
  createReservation,
  deleteReservation,
  updateReservation,
  getReservationById,
};
