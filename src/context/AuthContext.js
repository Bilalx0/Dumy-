import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set the base URL for your API
  axios.defaults.baseURL = 'http://localhost:3000'; // Adjust if your backend runs on a different port
  axios.defaults.withCredentials = true; // This is important for cookies to work

  useEffect(() => {
    // Check if user is already logged in on mount
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/refresh');
        if (response.data.accessToken) {
          setUser({
            accessToken: response.data.accessToken,
            username: response.data.username,
            role: response.data.role
          });
        }
      } catch (error) {
        console.log('Not authenticated');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (role, email, password) => {
    try {
      setError(null);
      const response = await axios.post(`/login/${role}`, { email, password });
      setUser({
        accessToken: response.data.accessToken,
        username: response.data.username,
        role: role
      });
      return true;
    } catch (error) {
      setError(error.response?.data?.reason || 'Login failed. Please try again.');
      return false;
    }
  };

  // Signup function
  const signup = async (role, email, username, password) => {
    try {
      setError(null);
      const response = await axios.post(`/signup/${role}`, { email, username, password });
      setUser({
        accessToken: response.data.accessToken,
        username: username,
        role: role
      });
      return true;
    } catch (error) {
      setError(error.response?.data?.reason || 'Signup failed. Please try again.');
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Clear user data on client
      setUser(null);
      // Call logout endpoint to clear cookies if needed
      // await axios.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};