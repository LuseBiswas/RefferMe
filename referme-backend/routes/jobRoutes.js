// routes/jobRoutes.js
import express from 'express';
import { createJob, getJobs, updateJob, deleteJob } from '../controllers/jobController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createJob); // Create a new job posting
router.get('/', getJobs); // Get all job postings
router.put('/:id', authMiddleware, updateJob); // Update a job posting
router.delete('/:id', authMiddleware, deleteJob); // Delete a job posting

export default router;
