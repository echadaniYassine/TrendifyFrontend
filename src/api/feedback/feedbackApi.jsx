import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library

// Function to get the token from cookies
const getAuthToken = () => {
  const token = Cookies.get('token'); // Fetch the token from cookies
  return token;
};

// Fetch feedback for the current user from the backend with authorization
export const fetchUserFeedback = async () => {
  try {
    const token = getAuthToken(); // Retrieve the token using getAuthToken
    if (!token) {
      throw new Error('No token found');
    }

    // Call the API endpoint to get feedbacks by the authenticated user
    const response = await axios.get('https://trendify-backend.vercel.app/api/Trendify/feedback/get-feedbacks-user', {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
    });

    return response.data; // Return feedback array
  } catch (err) {
    console.error('Error fetching user feedback:', err);
    throw err; // Rethrow error to handle it in the component
  }
};

// Fetch all feedbacks for a specific product with authorization
export const fetchProductFeedbacks = async (productId) => {
  try {
    const response = await axios.get(`https://trendify-backend.vercel.app/api/Trendify/feedback/get-all-feedbackes/${productId}`);
    return response.data; // Return feedbacks array
  } catch (err) {
    console.error('Error fetching product feedbacks:', err);
    throw err; // Rethrow error to handle it in the component
  }
};

// Submit feedback for a specific product to the backend with authorization
export const submitFeedback = async (productId, text, rating) => {
  try {
    const token = getAuthToken(); // Retrieve the token using getAuthToken
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.post(
      'https://trendify-backend.vercel.app/api/Trendify/feedback/submit-feedback',
      { productId, text, rating }, // Include the productId, text, and rating in the body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
      }
    );

    return response.data; // Return the new feedback
  } catch (err) {
    console.error('Error submitting feedback:', err);
    throw err; // Rethrow error to handle it in the component
  }
};
