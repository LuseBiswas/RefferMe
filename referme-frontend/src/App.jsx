// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import JobListings from './pages/JobListings';
import Dashboard from './pages/Dashboard';
import JobList from './components/JobList';
import JobForm from './components/JobForm';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route path="/job-listings" element={<JobListings />} />
        {/*<Route path="/referral-requests" element={<ReferralRequests />} />*/}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/new" element={<JobForm />} />
        

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
