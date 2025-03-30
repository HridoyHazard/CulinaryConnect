import asyncHandler from "../middleware/asyncHandler.js";
import Item from "../models/Items.js";

// @desc    Get all menu
// @route   GET /api/menus
// @access  Private/Admin

const getMenu = asyncHandler(async (req, res) => {
  const menu = await Item.find({});
  res.json(menu);
});

// @desc    Get menu by Category
// @route   GET /api/menus/:category
// @access  Private/Admin

const getMenuByCategory = asyncHandler(async (req, res) => {
  const menu = await Item.find({ category: req.params.category });
  res.json(menu);
});

// @desc    Create Menu
// @route   POST /api/menus
// @access  Private/Admin

const createMenu = asyncHandler(async (req, res) => {
  const { name, description, price, picture, quantity, category } = req.body;
  try {
    const newMenu = new Item({
      name,
      description,
      price,
      picture,
      quantity,
      category,
    });
    await newMenu.save();
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update Menu
// @route   PUT /api/menus/:id
// @access  Private/Admin

const updateMenu = asyncHandler(async (req, res) => {
  const menu = await Item.findById(req.params.id);
  if (menu) {
    menu.name = req.body.name || menu.name;
    menu.description = req.body.description || menu.description;
    menu.price = req.body.price || menu.price;
    menu.picture = req.body.picture || menu.picture;
    menu.quantity = req.body.quantity || menu.quantity;
    menu.category = req.body.category || menu.category;

    const updatedMenu = await menu.save();
    res.json(updatedMenu);
  } else {
    res.status(404);
    throw new Error("Menu not found");
  }
});

// @desc    Delete menu by ID
// @route   DELETE /api/menus/:id
// @access  Private/Admin

const deleteMenu = asyncHandler(async (req, res) => {
  const menu = await Item.findByIdAndDelete(req.params.id);
  if (!menu) {
    res.status(404);
    throw new Error("Menu not found");
  }
  res.json({ message: "Menu removed" });
});

export { getMenu, getMenuByCategory, updateMenu, deleteMenu, createMenu };
