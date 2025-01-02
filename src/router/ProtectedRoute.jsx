import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Ensure js-cookie is imported

export const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('token'); 
  return token ? children : <Navigate to="/login" />;
};

export const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Fetch user details from storage
  return user?.role === 'admin' ? children : <Navigate to="/login" />;
};
