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
    picture: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    category: {
      type: String,
      required: true, // Ensure items have a category
      enum: ["Desserts", "Entrees", "Appetizers","Pasta", "Salads", "Beverages"], 
    },
  });
  
  const Item = mongoose.model("Item", itemSchema);
  export default Item;