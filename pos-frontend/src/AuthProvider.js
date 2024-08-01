import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5004/api/login', credentials);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
