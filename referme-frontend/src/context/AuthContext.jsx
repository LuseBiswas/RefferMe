// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    setUser(response.data.user);
    localStorage.setItem('token', response.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // Load user from localStorage if available
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token or fetch user profile
      axiosInstance.get('/profile', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
