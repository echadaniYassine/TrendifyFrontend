//api/admin/apiAdmin.jsx
import axios from 'axios';

const API_URL = 'https://trendify-backend.vercel.app/api/Trendify/Admin'; // Adjust API endpoint as per your backend

// Function to fetch admin stats
export const getAdminStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`);
    return response.data; // Assuming the back-end returns an object with stats
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    throw error;
  }
};

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/getUsers`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/deleteUser/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Promote a user (for example, changing their role)
export const promoteUser = async (id, newRole) => {
  try {
    const response = await fetch(`${API_URL}/updateUser/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });
    if (!response.ok) {
      throw new Error('Failed to promote user');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
