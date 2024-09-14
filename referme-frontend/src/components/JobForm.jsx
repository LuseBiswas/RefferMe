import React, { useState } from 'react';
import axios from 'axios';

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requirements: '',
    company: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      const response = await axios.post('http://localhost:5600/api/jobs', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the headers
        }
      });

      console.log('Job created successfully:', response.data);
    } catch (error) {
      console.error('Failed to submit job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} />
      <input type="text" name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} />
      <input type="text" name="location" placeholder="Job Location" value={formData.location} onChange={handleChange} />
      <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
      <input type="text" name="requirements" placeholder="Requirements (comma-separated)" value={formData.requirements} onChange={handleChange} />
      <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} />
      <button type="submit">Submit Job</button>
    </form>
  );
};

export default JobForm;
