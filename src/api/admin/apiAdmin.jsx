import axios from 'axios';

const API_URL = 'http://127.0.0.1:4002/api/Trendify/Admin'; // Adjust API endpoint as per your backend

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


  const BASE_URL = 'http://127.0.0.1:4002/api/Trendify/orders'; // Adjust API endpoint as per your backend

// Fetch all orders
export const getOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllOrders`);
    return response.data; // Return orders
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

// Fetch order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getOrderById/${orderId}`);
    return response.data; // Return the order details
  } catch (error) {
    console.error("Failed to fetch order:", error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/updateOrderStatus/${orderId}/status`,
      { orderStatus: newStatus }
    );
    return response.data; // Return updated order
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw error;
  }
};