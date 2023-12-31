import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// User must be authenticated with token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie; verify token
  token = req.cookies.jwt;
  console.log("token from authMiddleware: ", token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // ignore don't pass the password; '-password' from user
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed, try login');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token, try  login');
    res.redirect('/login'); // Redirect to login page when no token is present
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin, login as admin');
    res.redirect('/login'); // Redirect to login page when no token is present
  }
};

export { protect, admin };