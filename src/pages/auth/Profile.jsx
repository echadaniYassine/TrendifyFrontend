import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/auth/user';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../../styles/pages/Profile.css';
import PaymentComponent from '../../services/paymentMethods';
import Orders from '../../components/Profile/Orders';
import Settings from '../../components/Profile/Settings ';
import ShippingInfo from '../../components/Profile/ShippingInfo';
import RefundReturn from '../../components/Profile/RefundReturn';
import Feedback from '../../components/Profile/Feedback';

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
          <div className="profile-section-content">
            <h3 className="profile-section-title">Overview</h3>
            <p className="profile-welcome-message">Welcome back, {userInfo?.username}!</p>
            <h4 className="profile-edit-title">Edit Profile</h4>
            <div className="profile-info">
              <p className="profile-info-username">Username: {userInfo?.username}</p>
              <p className="profile-info-email">Email: {userInfo?.email}</p>
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
          <RefundReturn />
        );
      case 'feedback':
        return (
          <Feedback />
        );
      case 'settings':
        return (
          <Settings />
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
          <button id="logout-button" onClick={handleLogout}>Logout</button>
        </div>

        <div className="profile-section">
          {renderSection()}
        </div>
      </div>
    </>
  );
};

export default Profile;
