import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const categorySchema = mongoose.Schema({
  section_name: {
    type: String,
    required: true,
  },
  items: [itemSchema], // Embedding the items array in the category schema
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
