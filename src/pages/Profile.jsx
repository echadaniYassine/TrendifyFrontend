import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../api/user';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import '../styles/pages/Profile.css'; // Import the CSS file

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('token'); // Use Cookies to get the token
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await getUserInfo();
        setUserInfo(response.data);
      } catch (err) {
        setError('Failed to load profile data. Please log in again.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('token'); // Remove token from cookies
    navigate('/login');
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phoneNumber}</p>
      </div>

      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
