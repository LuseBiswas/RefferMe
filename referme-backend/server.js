// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import referralRoutes from './routes/referralRoutes.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes); // Use the user routes
app.use('/api/jobs', jobRoutes);//Job Routes
app.use('/api/referrals', referralRoutes); // Mount referral routes


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
