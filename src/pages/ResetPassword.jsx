import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams
import { resetPassword } from '../api/user'; // Import the resetPassword API function
import '../styles/pages/resetPassword.css'; // Import the CSS file

const ResetPassword = () => {
  const { token } = useParams(); // Get token from the URL
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await resetPassword(token, { verificationCode, newPassword });
      setMessage(response.data.message);
      setError('');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      setMessage('');
    }
  };

  return (
    <>
     <div className='reset-password-container'>
      <div className='reset-password-img-wrapper'>
        <img src='/assets/resetPass.png' alt="Reset Password" />
      </div>
      <div className="reset-password-form-wrapper">
        <h2 className="reset-password-title">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="reset-password-form">
          <div className="form-group">
            <label htmlFor="verificationCode" className="form-label">Verification Code:</label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="form-submit-btn">Reset Password</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
    </>
  );
};

export default ResetPassword;
