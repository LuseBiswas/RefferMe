// src/services/jobService.js
import axios from 'axios';

const API_URL = 'http://localhost:5600/api/jobs'; // Adjust the URL according to your backend

// Fetch all jobs
const getJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a single job by ID
const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new job
const createJob = async (jobData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update a job
const updateJob = async (id, jobData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${id}`, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a job
const deleteJob = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
};
