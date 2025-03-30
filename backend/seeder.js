import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import table from "./data/table.js";
import menuData from "./data/menuData.js";
import Table from "./models/Table.js";
import Item from "./models/Items.js";
import Category from "./models/Category.js";

import connectDB from "./config/db.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    // ✅ Remove existing table data
    await Table.deleteMany();
    await Item.deleteMany();
    // await Category.deleteMany();

    const sampleTables = table.map((table) => {
      return {
        ...table,
        id: table.id || new mongoose.Types.ObjectId().toHexString(), // ✅ Generate unique ID if missing
      };
    });

    const sampleItems = menuData.map((item) => {
      return {
        ...item,
        id: item.id || new mongoose.Types.ObjectId().toHexString(), // ✅ Generate unique ID if missing
      };
    });

    // await Category.insertMany(sampleCategories);
    await Table.insertMany(sampleTables);
    await Item.insertMany(sampleItems);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Table.deleteMany();
    await Item.deleteMany();
    await Category.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// ✅ Run with: `node seeder.js` or `node seeder.js -d`
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
