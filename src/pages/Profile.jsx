import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../api/user';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {userInfo.username}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Phone:</strong> {userInfo.phoneNumber }</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;