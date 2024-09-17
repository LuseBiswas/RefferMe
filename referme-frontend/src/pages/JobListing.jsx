import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    phone: '',
    email: '',
    linkedin: '',
    resume: null,
  });
  const [applyError, setApplyError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5600/api/jobs');  // Ensure this endpoint is correct
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (job) => {
    setSelectedJob(job);
    setApplyError(null);
    setSuccessMessage(null);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setApplicationData({ ...applicationData, resume: files[0] });  // Handle file input
    } else {
      setApplicationData({ ...applicationData, [name]: value });
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
  
    if (!applicationData.resume) {
      setApplyError('Please attach a resume.');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', applicationData.name);
    formData.append('phoneNumber', applicationData.phone); // Ensure the field name matches the backend expectation
    formData.append('email', applicationData.email);
    formData.append('linkedinID', applicationData.linkedin); // Ensure the field name matches the backend expectation
    formData.append('resume', applicationData.resume);
  
    try {
      const token = localStorage.getItem('token'); // Ensure token is available
      const response = await axios.post(`http://localhost:5600/api/jobs/${selectedJob._id}/apply`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Application submitted successfully!');
      setSelectedJob(null); // Close modal
    } catch (err) {
      console.error('Error applying for job:', err.response ? err.response.data : err.message);
      setApplyError(err.response ? err.response.data.message : 'Failed to apply for the job');
    }
  };
  
  

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
                <button
                  onClick={() => handleApply(job)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Modal for Applying */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Apply for {selectedJob.title}</h2>
              <form onSubmit={handleSubmitApplication}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={applicationData.name}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">LinkedIn ID</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={applicationData.linkedin}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Resume (PDF)</label>
                  <input
                    type="file"
                    name="resume"
                    accept="application/pdf"
                    onChange={handleFormChange}
                    className="w-full"
                    required
                  />
                </div>

                {applyError && <p className="text-red-500 mb-4">{applyError}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                <div className="flex justify-end">
                  <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListing;
