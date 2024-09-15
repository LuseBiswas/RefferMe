import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Users, Briefcase } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Find Your Dream Job Through Referrals
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              Connect with industry professionals and get referred to top companies.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <Link to="/register" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 sm:px-8">
                  Get Started
                </Link>
                <Link to="/jobs" className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8">
                  Browse Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">How It Works</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Get Referred in 3 Simple Steps
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Search className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">1. Find Opportunities</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Browse through job listings and find positions that match your skills and interests.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">2. Connect with Referrers</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Reach out to professionals working at your target companies for referrals.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-gray-900">3. Get Referred</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Receive referrals and increase your chances of landing your dream job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;