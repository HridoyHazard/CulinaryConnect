import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
    },
    check_in_date: {
      type: Date,
      required: true,
    },
    check_in_time: {
      type: String, // Store as string in "HH:MM" format
      required: true,
    },
    check_out_time: {
      type: String, // Store as string in "HH:MM" format
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["succeeded", "pending", "failed"],
      default: "pending",
    },
    table_no: {
      type: Number,
      required: true,
    },
    itemsMenu: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        picture: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
