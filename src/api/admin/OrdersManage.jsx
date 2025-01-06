import axios from 'axios';

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

// Fetch user's orders by token
export const getUserOrders = async (token) => {
  const BASE_URL = 'http://127.0.0.1:4002/api/Trendify/orders'; // Adjust API endpoint as per your backend
  try {
    const response = await axios.get(`${BASE_URL}/getUserOrders`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in the Authorization header
      },
    });
    console.log("API Response:", response.data);  // Log the response data for debugging
    return response.data;  // Return the orders data
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    throw error;  // Rethrow the error for handling in the component
  }
};
