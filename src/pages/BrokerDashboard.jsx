import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const BrokerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Broker Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.username}</span>
            <button 
              onClick={handleLogout}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard 
            title="My Listings" 
            description="View and manage your property listings."
            link="/mansionlist"
          />
          <DashboardCard 
            title="Add New Listing" 
            description="Add a new property listing to the platform."
            link="/mansionform"
          />
          <DashboardCard 
            title="Client Inquiries" 
            description="View and respond to client inquiries about your listings."
            link="/dashboard"
          />
          <DashboardCard 
            title="Market Analytics" 
            description="View market trends and property analytics."
            link="/dashboard"
          />
        </div>
      </div>
    </div>
  );
};

// Helper component for dashboard cards
const DashboardCard = ({ title, description, link }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
      onClick={() => navigate(link)}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default BrokerDashboard;