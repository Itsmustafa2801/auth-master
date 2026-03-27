import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/auth';

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    setAuthToken(token);
    try {
      const res = await axios.get(`${API_URL}/me`);
      setUser(res.data);
    } catch (err) {
      setAuthToken(null);
      setUser(null);
    }
    setLoading(false);
  };

  // Register
  const register = async (userData) => {
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/register`, userData);
      setAuthToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Login
  const login = async (email, password) => {
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setAuthToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, error: message };
    }
  };

  // Logout
  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      register,
      login,
      logout,
      setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};