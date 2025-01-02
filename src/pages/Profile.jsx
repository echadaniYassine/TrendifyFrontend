import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../api/user';
import { getUserOrders } from '../api/admin/apiAdmin'; // Update to use the correct API
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/pages/Profile.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false); // Loading state for orders
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview'); // Manage active section
  const navigate = useNavigate();

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

  // Fetch user's orders when 'orders' section is active
  useEffect(() => {
    const fetchOrders = async () => {
      if (activeSection === 'orders') {
        const token = Cookies.get('token');
        if (!token) {
          navigate('/login');
          return;
        }

        setOrderLoading(true); // Set loading state for orders
        try {
          const userOrders = await getUserOrders(token); // Fetch orders using token
          setOrders(userOrders); // Set orders for the user
        } catch (err) {
          setError('Failed to load orders.');
        } finally {
          setOrderLoading(false); // Clear loading state
        }
      }
    };

    fetchOrders();
  }, [activeSection, navigate]);

  const handleLogout = () => {
    Cookies.remove('token'); // Remove token from cookies
    navigate('/login');
  };

  // Function to render the content of each section
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
            <div className="section-content">
              <h3>Your Orders</h3>
              {orderLoading ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <p>No orders available at the moment.</p>
              ) : (
                <ul className="orders-list">
                  {orders.map((order) => (
                    <li key={order._id || order.id} className="order-item"> {/* Use unique key for each order */}
                      <p><strong>Order ID:</strong> {order._id || 'N/A'}</p>
                      <p><strong>Status:</strong> {order.orderStatus || 'Unknown'}</p>
                      <p><strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
                      <p><strong>Total Amount:</strong> ${order.totalAmount?.toFixed(2) || '0.00'}</p>
                      <p><strong>Items:</strong></p>
                      <ul>
                        {order.items?.map((item, idx) => (
                          <li key={idx}>
                            <p>Product: {item.productId?.name || 'Unknown'}</p>
                            <p>Quantity: {item.quantity || 0}</p>
                            <p>Price: ${item.price?.toFixed(2) || '0.00'}</p>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        
      case 'payment':
        return (
          <div className="section-content">
            <h3>Payment Details</h3>
            <p>Payment methods: Visa, MasterCard, PayPal.</p>
          </div>
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
          <div className="section-content">
            <h3>Settings</h3>
            <p>Update your account preferences.</p>
          </div>
        );
        case 'shipping':
          return (
            <div className="section-content">
              <h3>Shipping Information</h3>
              <p>View and update your shipping addresses here.</p>
              <ul>
                {userInfo?.shippingAddresses?.length > 0 ? (
                  userInfo.shippingAddresses.map((address, index) => (
                    <li key={index}>
                      <p>{address}</p>
                    </li>
                  ))
                ) : (
                  <p>No shipping addresses available. Add one now!</p>
                )}
              </ul>
            </div>
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
