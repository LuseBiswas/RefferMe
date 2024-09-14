// src/pages/JobsPage.jsx
import React from 'react';
import JobList from '../components/JobList';
import { Link } from 'react-router-dom';

const JobsPage = () => {
  return (
    <div>
      <h1>Jobs</h1>
      <Link to="/jobs/new">Post a New Job</Link>
      <JobList />
    </div>
  );
};

export default JobsPage;
