import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { User, Briefcase, Eye, FileText, PlusCircle, List, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5600/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    if (localStorage.getItem('token')) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome, {userData?.name || user?.name}!</h1>
          <p className="text-indigo-100">Your account type: <span className="font-semibold">{userData?.userType}</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            {userData?.userType === 'job_seeker' ? (
              <div className="space-y-4">
                <DashboardAction to="/view-jobs" icon={Eye} title="View Job Listings" />
                <DashboardAction to="/applied-jobs" icon={FileText} title="View Applied Jobs" />
              </div>
            ) : (
              <div className="space-y-4">
                <DashboardAction to="/create-job" icon={PlusCircle} title="Create a Job" />
                <DashboardAction to="/all-jobs" icon={List} title="View All Jobs" />
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Profile Views" value="128" change="+12%" />
              <StatCard title="Applications" value="8" change="+3%" />
              <StatCard title="Interviews" value="3" change="0%" />
              <StatCard title="Job Offers" value="1" change="+100%" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const DashboardAction = ({ to, icon: Icon, title }) => (
  <Link to={to} className="flex items-center justify-between p-3 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors duration-200">
    <div className="flex items-center">
      <Icon className="h-6 w-6 text-indigo-500 mr-3" />
      <span className="text-gray-700 font-medium">{title}</span>
    </div>
    <ChevronRight className="h-5 w-5 text-gray-400" />
  </Link>
);

const StatCard = ({ title, value, change }) => (
  <div className="bg-gray-50 rounded-md p-4">
    <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
    <div className="flex items-baseline">
      <span className="text-2xl font-semibold text-gray-900">{value}</span>
      <span className={`ml-2 text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : change === '0%' ? 'text-gray-500' : 'text-red-600'}`}>
        {change}
      </span>
    </div>
  </div>
);

export default Dashboard;