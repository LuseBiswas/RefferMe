// src/components/JobDetail.jsx
import React, { useState, useEffect } from 'react';
import jobService from '../services/jobService';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await jobService.getJobById(id);
        setJob(data);
      } catch (error) {
        console.error('Failed to fetch job details:', error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>
      <p>Type: {job.jobType}</p>
      <p>Description: {job.description}</p>
    </div>
  );
};

export default JobDetail;
