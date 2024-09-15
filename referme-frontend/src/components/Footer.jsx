import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">RefferMe</span>
            </Link>
            <p className="text-gray-400 text-base">
              Connecting job seekers with referral providers for better career opportunities.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/about" className="text-base text-gray-400 hover:text-white">About</Link></li>
                  <li><Link to="/careers" className="text-base text-gray-400 hover:text-white">Careers</Link></li>
                  <li><Link to="/contact" className="text-base text-gray-400 hover:text-white">Contact</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link to="/faq" className="text-base text-gray-400 hover:text-white">FAQ</Link></li>
                  <li><Link to="/help" className="text-base text-gray-400 hover:text-white">Help Center</Link></li>
                  <li><Link to="/privacy" className="text-base text-gray-400 hover:text-white">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-base text-gray-400 hover:text-white">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            © 2023 RefferMe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;