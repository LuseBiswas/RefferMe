// controllers/jobController.js
import Job from '../models/Job.js';

// Create a new job posting
export const createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.user._id });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job posting', error });
  }
};

// Get all job postings
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job postings', error });
  }
};

// Get a specific job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job details', error });
  }
};

// Update a job posting
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job posting', error });
  }
};

// Delete a job posting
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job posting', error });
  }
};
