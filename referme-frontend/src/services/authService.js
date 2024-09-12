// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5600/api'; // Replace with your backend URL

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token); // Store the token in localStorage
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
