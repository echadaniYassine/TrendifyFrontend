import React, { useState } from 'react';
import { forgotPassword } from '../../api/auth/user'; // Import the forgotPassword API function
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../styles/pages/forgotPassword.css';

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
    <>
   <div className='forgot-password-container'>
      <div className='forgot-password-img-wrapper'>
        <img src='assets/forgotPass.png' alt="Forgot Password" />
      </div>
      <div className="forgot-password-form-wrapper">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="forgot-password-form">
          <div className="form-group">
            <label className="form-label">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder='recover-email'
              required
            />
          </div>
          <button type="submit" className="form-submit-btn">Send Reset Link</button>
        </form>
        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}
      </div>
    </div>
    </>
    
  
  );
};

export default ForgotPassword;
