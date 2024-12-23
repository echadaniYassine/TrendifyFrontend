import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for token in localStorage
  return token ? children : <Navigate to="/login" />;
};
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Fetch user details from storage
  return user?.role === 'admin' ? children : <Navigate to="/login" />;
};
export default {ProtectedRoute, AdminRoute};
