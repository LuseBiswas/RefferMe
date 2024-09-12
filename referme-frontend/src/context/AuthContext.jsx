// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Set the base URL to match the backend server's address and port
  const API_BASE_URL = 'http://localhost:5600/api/auth'; // Replace '5000' with the correct port if different

  // Function to handle user registration
  const registerUser = async (name, email, password, userType) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password,
        userType,
      });

      if (response.status === 201) {
        return { success: true, message: 'Registration successful' };
      } else {
        return { success: false, message: 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  // Function to handle user login
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

      const { token, user } = response.data;

      if (token) {
        setUser(user);
        localStorage.setItem('token', token);
        return { success: true };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
