// routes/emailRoutes.js
import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { sendOrderInfoEmail, sendOrderConfirmationEmail  } from '../controllers/emailController.js';

router.route('/email-order-info').post(protect, sendOrderInfoEmail);
router.route('/email-order-confirmation').post(protect, sendOrderConfirmationEmail);

export default router;