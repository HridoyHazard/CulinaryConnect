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
      console.log("[JWT Decoded]:", decoded);

      const user = await User.findById(decoded.userId).select("-password");
      console.log("[User from DB]:", user);

      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }
      req.user
      req.user = user;
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
  console.log("Admin Middleware User:", req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized As Admin");
  }
};

export { protect, admin };
