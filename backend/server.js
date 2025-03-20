import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import tableRoutes from "./routes/tableRoutes.js"
import reservationRoutes from "./routes/reservationRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";


const port = process.env.PORT || 5000;
dotenv.config();

connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/menus", menuRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
