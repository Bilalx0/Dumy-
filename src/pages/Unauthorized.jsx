import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Unauthorized = () => {
  const { user } = useContext(AuthContext);
  
  // Determine where to redirect based on user role
  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'broker':
        return '/broker/dashboard';
      case 'user':
        return '/user/dashboard';
      default:
        return '/';
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">
            You don't have permission to access this page. Please contact the administrator if you believe this is an error.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to={getDashboardLink()}
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            >
              Go to Dashboard
            </Link>
            <Link 
              to="/"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Unauthorized;