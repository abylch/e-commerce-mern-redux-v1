import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// User must be authenticated with token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie; verify token
  token = req.cookies.jwt;
  console.log("token from authMiddleware: ", token);

  if(!token) {
    console.log("hi from not token");
    // If the redirection is not happening as expected, it might be due to the fact that
    // you are using AJAX requests (like fetch or Axios)
    // on the client side, and redirects from an API response do not trigger a browser redirect.
    return res.redirect('/login'); // Redirect to login page when no token is present
    
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // ignore don't pass the password; '-password' from user
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).redirect('/login');;
      throw new Error('Not authorized, token failed, try login');
      
    }
  } else {
    res.status(401).redirect('/login');;
    throw new Error('Not authorized, no token, try  login');
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).redirect('/login');;
    throw new Error('Not authorized as an admin, login as admin');
  }
};

export { protect, admin };