import asyncHandler from "../middleware/asyncHandler.js";
import Reservation from "../models/Reservation.js";
// import paypal from "@paypal/checkout-server-sdk";

// PayPal Client Setup
// const paypalClient = new paypal.core.PayPalHttpClient(
//   new paypal.core.SandboxEnvironment(
//     process.env.PAYPAL_CLIENT_ID,
//     process.env.PAYPAL_CLIENT_SECRET
//   )
// );


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

// @desc    Create PayPal order with AUTHORIZE intent
// @route   POST /api/paypal/create-order
// @access  Private
const createPayPalOrder = asyncHandler(async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "AUTHORIZE",
    purchase_units: [{
      amount: {
        currency_code: "USD",
        value: req.body.amount, // Amount from frontend
      },
    }],
  });

  try {
    const response = await paypalClient.execute(request);
    res.json({ orderID: response.result.id });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to create PayPal order");
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
