import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createJob, getJobs, getJobsByUser, getJobById, updateJob, deleteJob } from '../controllers/jobController.js';

const router = express.Router();

// Create a new job
router.post('/jobs', authMiddleware, createJob);

// Get all jobs
router.get('/jobs', getJobs);

// Get jobs posted by the authenticated user
router.get('/jobs/user', authMiddleware, getJobsByUser);  // Apply the authMiddleware here

// Get a specific job by ID
router.get('/jobs/:id', getJobById);

// Update a job by ID
router.put('/jobs/:id', authMiddleware, updateJob);

// Delete a job by ID
router.delete('/jobs/:id', authMiddleware, deleteJob);

export default router;
