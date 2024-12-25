import React, { useState } from 'react';
import { forgotPassword } from '../api/user'; // Import the forgotPassword API function
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate


  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword({ email }); 
      console.log("Response from backend:", response.data); // Log the full response
      const token = response.data.token; // Extract token from the response
      setMessage(response.data.message); 
      setError('');
      navigate(`/ResetPassword/${token}`, { state: { email } });

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <label>Email Address:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
