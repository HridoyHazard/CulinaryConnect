import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";

// protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read the jwt from the cookie
  token = req.cookies.jwt;

  console.log("Token:", token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded:", decoded);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Token Failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

// Admin Middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized As Admin");
  }
};

export { protect, admin };
