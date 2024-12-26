import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user';
import Cookies from 'js-cookie'; // Import js-cookie
import '../styles/pages/login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before login attempt

    try {
      const response = await login(formData);
      const token = response.data.token;
      Cookies.set('token', token); // Set token in cookies
      navigate('/profile');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-title">Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
          <div className="auth-links">
            <p>
              Don't have an account? <a href="/signup" className="auth-link">Sign up</a>
            </p>
            <p>
              Forgot your password? <a href="/ForgotPassword" className="auth-link">Reset it</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
