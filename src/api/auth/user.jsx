import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://trendify-backend.vercel.app/api/Trendify';

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
  const token = Cookies.get('token'); 
  return api.get('/Trendify_user-info', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const modifyUser = async (data) => {
  const token = Cookies.get('token'); // Retrieve the token from cookies
  if (!token) {
    throw new Error('Unauthorized: No token provided');
  }

  return axios.put('https://trendify-backend.vercel.app/api/Trendify/Trendify_modifyUser', data, {
    headers: {
      Authorization: `Bearer ${token}`, // Pass the token in the headers
    },
  });
};