import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4002/api/Trendify';

const api = axios.create({
  baseURL: BASE_URL,
});

// User registration
export const register = (data) => api.post('/Trendify_register', data);

// User login
export const login = (data) => api.post('/Trendify_login', data);

// Forgot password
export const forgotPassword = (data) => api.post('/Trendify_forgot-password', data);

// Reset password
export const resetPassword = (token, data) => api.post(`/Trendify_reset-password/${token}`, data);

// Fetch user info
export const getUserInfo = () => {
  const token = localStorage.getItem('token');
  return api.get('/Trendify_user-info', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Modify user
export const modifyUser  = (data) => {
  const token = localStorage.getItem('token');
  return api.put('/Trendify_modifyUser ', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};