import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mansions from "./pages/Mansions";
import Penthouses from "./pages/Penthouses";
import About from "./pages/About";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Magazine from "./pages/Magazine";
import BlogPage from "./pages/BlogPage";
import ListingPage from "./pages/ListingPage";
import SignupSection from "./pages/SignupSection";
import NewDevelopment from "./pages/NewDevelopment";
import CollectiveListing from "./pages/CollectiveListing";
import ListedCollectibles from "./pages/ListedCollectibles";

// Admin and dashboard components
import DashboardAdmin from "./admin/DashboardAdmin";
import CreatePost from "./admin/pages/CreatePost";
import AdminDashboard from "./admin/pages/AdminDashboard";
import MagazineForm from "./admin/pages/MagazineForm";
import MansionForm from "./admin/pages/MansionForm";
import PenthouseForm from "./components/PenthouseForm";
import Collectibles from "./components/Collectibles";
import HomePageForm from "./components/HomePageForm";
import NewDevelopmentForm from "./components/NewDevelopmentform";
import MansionList from "./components/MansionList";
import Dashboard from "./admin/components/Dashboard";

// Auth Components
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BrokerDashboard from "./pages/BrokerDashboard";
import UserDashboard from "./pages/UserDashboard";
import Unauthorized from "./pages/Unauthorized";

// Context provider
import { MansionProvider } from "./context/MansionContext";

function App() {
  return (
    <AuthProvider>
      <MansionProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/mansions" element={<Mansions />} />
            <Route path="/penthouses" element={<Penthouses />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/magazine" element={<Magazine />} />
            <Route path="/blogpage" element={<BlogPage />} />
            <Route path="/mansion/:reference" element={<ListingPage />} />
            <Route path="/signupsection" element={<SignupSection />} />
            <Route path="/newdevelopment" element={<NewDevelopment />} />
            <Route path="/collectivelisting" element={<CollectiveListing />} />
            <Route path="/listedcollectibles" element={<ListedCollectibles />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Admin Protected Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/create-post" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreatePost />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/magazineform" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MagazineForm />
              </ProtectedRoute>
            } />
            <Route path="/dashboard-admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardAdmin />
              </ProtectedRoute>
            } />
            
            {/* Broker Protected Routes */}
            <Route path="/broker/dashboard" element={
              <ProtectedRoute allowedRoles={['broker']}>
                <BrokerDashboard />
              </ProtectedRoute>
            } />
            
            {/* User Protected Routes */}
            <Route path="/user/dashboard" element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            {/* Mixed Access Routes (available to multiple roles) */}
            <Route path="/mansionform" element={
              <ProtectedRoute allowedRoles={['admin', 'broker']}>
                <MansionForm />
              </ProtectedRoute>
            } />
            <Route path="/penthouseform" element={
              <ProtectedRoute allowedRoles={['admin', 'broker']}>
                <PenthouseForm />
              </ProtectedRoute>
            } />
            <Route path="/collectiblesform" element={
              <ProtectedRoute allowedRoles={['admin', 'broker']}>
                <Collectibles />
              </ProtectedRoute>
            } />
            <Route path="/homeform" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <HomePageForm />
              </ProtectedRoute>
            } />
            <Route path="/new-developmentform" element={
              <ProtectedRoute allowedRoles={['admin', 'broker']}>
                <NewDevelopmentForm />
              </ProtectedRoute>
            } />
            <Route path="/mansionlist" element={
              <ProtectedRoute allowedRoles={['admin', 'broker']}>
                <MansionList />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </MansionProvider>
    </AuthProvider>
  );
}

export default App;
