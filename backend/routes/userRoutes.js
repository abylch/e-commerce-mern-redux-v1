import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logoutUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.route('/').post(registerUser).get(getUsers);
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

// we updated the route to get authenticated; for user and admin
//router.route('/profile').get(getUserProfile).put(updateUserProfile);
//router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

// user profile 4 user
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

  // user profile 4 admin functions
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;