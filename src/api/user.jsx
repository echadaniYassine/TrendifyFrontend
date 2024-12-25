import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

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
  const token = Cookies.get('token'); // Get token from cookies
  return api.get('/Trendify_user-info', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Modify user using cookies for token
export const modifyUser = (data) => {
  const token = Cookies.get('token'); // Get token from cookies
  return api.put('/Trendify_modifyUser', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};