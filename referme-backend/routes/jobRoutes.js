import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createJob, getJobs, getJobsByUser, getJobById, updateJob, deleteJob, applyForJob } from '../controllers/jobController.js';
import upload from '../mutlerUpload.js';

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

// routes/jobRoutes.js
router.post('/jobs/:id/apply', authMiddleware, upload.single('resume'), applyForJob);

export default router;
