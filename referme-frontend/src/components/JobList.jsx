// src/components/JobList.jsx
import React, { useEffect, useState } from 'react';
import jobService from '../services/jobService';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getJobs();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job Listings</h1>
      {jobs.map((job) => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <Link to={`/jobs/${job._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default JobList;
