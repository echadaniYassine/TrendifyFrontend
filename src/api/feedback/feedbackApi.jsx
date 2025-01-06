import axios from 'axios';
import Cookies from 'js-cookie'; // Import the js-cookie library

// Function to get the token from cookies
const getAuthToken = () => {
  const token = Cookies.get('token'); // Fetch the token from cookies
  return token;
};

// Fetch all feedbacks from the backend with authorization
export const fetchFeedbacks = async () => {
  try {
    const token = getAuthToken(); // Retrieve the token using getAuthToken
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get('http://localhost:4002/api/Trendify/feedback/get-feedback', {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to Authorization header
      },
    });
    return response.data; // Return feedbacks array
  } catch (err) {
    console.error('Error fetching feedbacks:', err);
    throw err; // Rethrow error to handle it in the component
  }
};

// Submit feedback to the backend with authorization
export const submitFeedback = async (text, rating) => {
  try {
    const token = getAuthToken(); // Retrieve the token using getAuthToken
    if (!token) {
      throw new Error('No token found');
    }
    const userId = 'user-id'; // Replace with actual user ID (e.g., from cookies or session)
    const response = await axios.post(
      'http://localhost:4002/api/Trendify/feedback/submit-feedback',
      { text, rating, userId },
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
