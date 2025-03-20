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
