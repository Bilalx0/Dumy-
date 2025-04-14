import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Account</h1>
            <button 
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Account Information</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p><span className="font-medium">Username:</span> {user?.username}</p>
              <p><span className="font-medium">Email:</span> {user?.email || 'Not available'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <DashboardCard 
              title="Saved Properties" 
              description="View and manage your saved properties."
              link="/saved-properties"
            />
            <DashboardCard 
              title="Property Inquiries" 
              description="View your property inquiries and messages."
              link="/inquiries"
            />
            <DashboardCard 
              title="Notifications" 
              description="Manage your notification preferences."
              link="/notifications"
            />
            <DashboardCard 
              title="Account Settings" 
              description="Update your profile and account settings."
              link="/settings"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Helper component for dashboard cards
const DashboardCard = ({ title, description, link }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-gray-50 p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition-all"
      onClick={() => navigate(link)}
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default UserDashboard;