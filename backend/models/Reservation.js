import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
    },
    customer_contact: {
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
    number_of_guests: {
      type: Number,
      required: true,
    },
    table_no: {
      type: Number,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
