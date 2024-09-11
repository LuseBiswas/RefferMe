// routes/userRoutes.js
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Protected route example
router.get('/profile', authMiddleware, getUserProfile);

export default router;
