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
      enum: ["Available", "Booked"],
      default: "Available",
    },
    picture: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);

export default Table;
