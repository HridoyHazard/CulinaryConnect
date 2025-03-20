import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    table_no: {
      type: String,
      required: true,
    },
    seating_capacity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Reserved"],
      default: "Available",
    },
    picture: {
      type: String,
      required: true,
    },
    reservation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },
    orders: [
      {
        item_name: String,
        quantity: Number,
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
