import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/Category.js";

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryBySection = asyncHandler(async (req, res) => {
  const { section_name } = req.params;

  const category = await Category.findOne({ section_name });
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.json(category);
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { section_name, items } = req.body;

  try {
    const existingCategory = await Category.findOne({ section_name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists." });
    }

    const category = new Category({
      section_name,
      items,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// @desc    Update category by adding items
// @route   PATCH /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const sectionName = req.params.section_name;

  const { items } = req.body; // Expecting an array of new items

  const category = await Category.findOne({ section_name: sectionName });

  if (category) {
    // If itemsToAdd is provided and is an array, append the new items
    if (items && Array.isArray(items)) {
      category.items.push(...items);
      await category.save();
      res.json(category);
    } else {
      res.status(400).json({ message: "Invalid items data" });
    }
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

export { getCategories, getCategoryBySection, createCategory, updateCategory };
