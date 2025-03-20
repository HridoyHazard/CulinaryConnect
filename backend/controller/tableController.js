import asyncHandler from "../middleware/asyncHandler.js";
import Table from "../models/Table.js";
import mongoose from "mongoose";

// @desc    Get all tables
// @route   GET /api/tables
// @access  Private/Admin
const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find({});
  res.json(tables);
});

// @desc    create a new table
// @route   POST /api/tables
// @access  Private/Admin
const createTable = asyncHandler(async (req, res) => {
  const { id, table_no, seating_capacity, status, picture } = req.body;
  try {
    const newTable = new Table({
      id,
      table_no,
      seating_capacity,
      status,
      picture,
    });
    await newTable.save();
    res.status(201).json(newTable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// @desc    Get single table
// @route   GET /api/tables/:id
// @access  Private/Admin
const getTableById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log(id);

  // Check if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  const table = await Table.findById(id);

  if (table) {
    res.json(table);
  } else {
    res.status(404);
    throw new Error("Table not found");
  }
});
// @desc    Delete single table
// @route   GET /api/tables/:id
// @access  Private/Admin
const deleteTable = asyncHandler(async (req, res) => {
  const table = await Table.findByIdAndDelete(req.params.id);
  if (!table) {
    res.status(404);
    throw new Error("Table not found");
  } else {
    res.json({ message: "Table removed" });
  }
});
// @desc    Update single table
// @route   GET /api/tables/:id
// @access  Private/Admin
const updateTable = asyncHandler(async (req, res) => {
  const table = await Table.findById(req.params.id);
  if (table) {
    table.table_no = req.body.table_no || table.table_no;
    table.seating_capacity =
      req.body.seating_capacity || table.seating_capacity;
    table.status = req.body.status || table.status;
    table.picture = req.body.picture || table.picture;
    const updatedTable = await table.save();
    res.json(updatedTable);
  } else {
    res.status(404);
    throw new Error("Table not found");
  }
});

export { getTables, createTable, getTableById, deleteTable, updateTable };
