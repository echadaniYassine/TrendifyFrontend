import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/auth/user';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../styles/pages/Profile.css';
import PaymentComponent from '../../services/paymentMethods';
import Orders from '../../components/Profile/Orders';
import Settings from '../../components/Profile/Settings ';
import ShippingInfo from '../../components/Profile/ShippingInfo';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview'); // Manage active section
  const navigate = useNavigate();
  const [shippingAddresses, setShippingAddresses] = useState([]);

  const updateShippingAddresses = (updatedAddresses) => {
    setShippingAddresses(updatedAddresses);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('token'); // Get token from cookies
      if (!token) {
        navigate('/login'); // Redirect if no token
        return;
      }

      try {
        const response = await getUserInfo();
        setUserInfo(response.data);
      } catch (err) {
        setError('Failed to load profile data. Please log in again.');
        navigate('/login'); // Redirect to login if API call fails
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


  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="section-content">
            <h3>Overview</h3>
            <p>Welcome back, {userInfo?.username}!</p>
            <h4>Edit Profile</h4>
            <div>
              <p>Username: {userInfo?.username}</p>
              <p>Email: {userInfo?.email}</p>
            </div>
          </div>
        );
      case 'orders':
        return (
          <Orders />
        );

      case 'payment':
        return (
          <PaymentComponent />
        );

      case 'refund':
        return (
          <div className="section-content">
            <h3>Refund/Return</h3>
            <p>Track your refunds or return requests here.</p>
          </div>
        );
      case 'feedback':
        return (
          <div className="section-content">
            <h3>Feedback</h3>
            <p>Leave your feedback to help us improve.</p>
          </div>
        );
      case 'settings':
        return (
         <Settings/>
        );
      case 'shipping':
        return (
          <ShippingInfo userInfo={{ shippingAddresses }}
          updateShippingAddresses={updateShippingAddresses} />
        );

      default:
        return null;
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <>
      <h2 className="profile-title">User Profile</h2>

      <div className="profile-container">
        <div className="profile-nav">
          <button onClick={() => setActiveSection('overview')}>Overview</button>
          <button onClick={() => setActiveSection('orders')}>Orders</button>
          <button onClick={() => setActiveSection('payment')}>Payment</button>
          <button onClick={() => setActiveSection('refund')}>Refund/Return</button>
          <button onClick={() => setActiveSection('feedback')}>Feedback</button>
          <button onClick={() => setActiveSection('settings')}>Settings</button>
          <button onClick={() => setActiveSection('shipping')}>Shipping Address</button>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>

        <div className="profile-section">
          {renderSection()}
        </div>
      </div>
    </>
  );
};

export default Profile;
