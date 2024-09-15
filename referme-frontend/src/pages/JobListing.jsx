// src/pages/JobListing.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5600/api/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
        {jobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                <p className="text-gray-600">{job.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-500">Location: {job.location}</span>
                  <span className="text-gray-500">Salary: {job.salary}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobListing;
