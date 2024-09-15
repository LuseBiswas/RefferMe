// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobForm from './components/JobForm';
import JobListing from './pages/JobListing';
import ViewAllJobs from './pages/ViewAllJobs';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
    
        {/*<Route path="/referral-requests" element={<ReferralRequests />} />*/}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/view-jobs" element={<JobListing />} />
        <Route path="/create-job" element={<JobForm />} />
        <Route path="/all-jobs" element={<ViewAllJobs />} />

        

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
