// routes/referralRoutes.js
import express from 'express';
import { createReferral, getReferrals, updateReferralStatus } from '../controllers/referralController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createReferral); // Create a new referral
router.get('/', authMiddleware, getReferrals); // Get referrals for a user
router.put('/:id', authMiddleware, updateReferralStatus); // Update referral status

export default router;
