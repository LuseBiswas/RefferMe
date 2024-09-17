import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Briefcase, MapPin, DollarSign, Building2, Loader2, AlertCircle, Edit, Trash2,
} from 'lucide-react';

// Job Card Component
const JobCard = ({ job, onUpdate, onDelete }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
    <div className="flex justify-between items-start mb-4">
      <h2 className="text-2xl font-bold text-blue-600">{job.title}</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => onUpdate(job)}
          className="p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors duration-200"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(job._id)}
          className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-200"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
    <p className="text-gray-600 mb-4">{job.description}</p>
    <div className="grid grid-cols-2 gap-2">
      <div className="flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-gray-500" />
        <span>{job.location}</span>
      </div>
      <div className="flex items-center">
        <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
        <span>{job.salary}</span>
      </div>
      <div className="flex items-center col-span-2">
        <Building2 className="w-5 h-5 mr-2 text-gray-500" />
        <span>{job.company}</span>
      </div>
    </div>
  </div>
);

// Alert Component
const Alert = ({ children }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">Error! </strong>
    <span className="block sm:inline">{children}</span>
  </div>
);

const ViewAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    requirements: '',
    company: '',
  });
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5600/api/jobs/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchUserJobs();
  }, []);

  const handleUpdate = (job) => {
    setSelectedJob(job);
    setUpdateFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      requirements: job.requirements.join(', '),
      company: job.company,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!updateFormData.title || !updateFormData.description || !updateFormData.location || !updateFormData.salary) {
      setError('Please fill in all the required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5600/api/jobs/${selectedJob._id}`, updateFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Update the job in the state
      setJobs(jobs.map((job) => (job._id === selectedJob._id ? { ...job, ...updateFormData } : job)));
      setSelectedJob(null); // Close modal after successful update
      setError(null); // Clear any existing errors
    } catch (err) {
      setError('Failed to update job');
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5600/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setJobs(jobs.filter((job) => job._id !== jobId));
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (err) {
      setError('Failed to delete job');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
        <Briefcase className="inline-block mr-2 mb-1" />
        My Posted Jobs
      </h1>

      {deleteSuccess && (
        <div className="mb-4 text-green-600 text-center">
          Job deleted successfully!
        </div>
      )}

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Update Job</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={updateFormData.title}
                onChange={(e) => setUpdateFormData({ ...updateFormData, title: e.target.value })}
                className="block w-full mb-2 p-2 border rounded"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Job Description"
                value={updateFormData.description}
                onChange={(e) => setUpdateFormData({ ...updateFormData, description: e.target.value })}
                className="block w-full mb-2 p-2 border rounded"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Job Location"
                value={updateFormData.location}
                onChange={(e) => setUpdateFormData({ ...updateFormData, location: e.target.value })}
                className="block w-full mb-2 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={updateFormData.salary}
                onChange={(e) => setUpdateFormData({ ...updateFormData, salary: e.target.value })}
                className="block w-full mb-2 p-2 border rounded"
                required
              />
              <input
                type="text"
                name="requirements"
                placeholder="Requirements (comma-separated)"
                value={updateFormData.requirements}
                onChange={(e) =>
                  setUpdateFormData({ ...updateFormData, requirements: e.target.value.split(',').map((req) => req.trim()) })}
                className="block w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={updateFormData.company}
                onChange={(e) => setUpdateFormData({ ...updateFormData, company: e.target.value })}
                className="block w-full mb-2 p-2 border rounded"
              />
              <div className="flex justify-between mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                <button type="button" onClick={() => setSelectedJob(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllJobs;
