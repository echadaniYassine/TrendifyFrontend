import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../features/cart/CartContext";
import { getCartTotal } from "../features/cart/cartUtils";
import axios from "axios";
import '../styles/pages/checkout.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { state, dispatch } = useContext(CartContext);
  const total = getCartTotal(state.cart);

  const [formData, setFormData] = useState({
    name: "",
    addressLine1: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('https://trendify-backend.vercel.app/api/Trendify/Trendify_user-info', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data;
        const firstAddress = user.shippingAddresses?.[0] || {};

        setFormData((prev) => ({
          ...prev,
          name: user.username,
          addressLine1: firstAddress.addressLine1 || "",
          city: firstAddress.city || "",
          postalCode: firstAddress.postalCode || "",
          phone: user.phoneNumber || "",
        }));
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError('Failed to load profile data. Please log in again.');
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();

    // Validation (check if required fields are filled)
    if (Object.values(formData).some((field) => !field.trim())) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const token = Cookies.get('token');
      const userResponse = await axios.get('https://trendify-backend.vercel.app/api/Trendify/Trendify_user-info', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userResponse.data;

      const addressNeedsUpdate =
        user.shippingAddresses[0]?.addressLine1 !== formData.addressLine1 ||
        user.shippingAddresses[0]?.city !== formData.city ||
        user.shippingAddresses[0]?.postalCode !== formData.postalCode ||
        user.phoneNumber !== formData.phone;

      if (addressNeedsUpdate) {
        await axios.put(
          "https://trendify-backend.vercel.app/api/Trendify/Trendify_modifyUser",
          {
            shippingAddresses: [
              {
                addressLine1: formData.addressLine1,
                city: formData.city,
                postalCode: formData.postalCode,
              },
            ],
            phoneNumber: formData.phone,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      const orderData = {
        userId: user._id, // Include userId in the payload
        items: state.cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      // Save order data to proceed to payment
      sessionStorage.setItem('orderData', JSON.stringify(orderData));

      // Navigate to the Payment page
      navigate('/payment');

    } catch (error) {
      console.error("Error proceeding to payment:", error.response?.data || error.message);
      setError("There was an error processing your order. Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      {state.cart.length === 0 ? (
        <p className="cart-empty-message">Your cart is empty. Please add some products before proceeding to checkout.</p>
      ) : (
        <div className="checkout-content">
          <h3 className="order-summary-title">Order Summary</h3>
          <ul className="order-summary-list">
            {state.cart.map((item) => (
              <li key={item._id} className="order-summary-item">
                <div>
                  <strong>{item.name}</strong> - {item.quantity} x ${item.price.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <h4 className="total-price">Total: ${total.toFixed(2)}</h4>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleProceedToPayment} className="checkout-form">
            <fieldset className="form-fieldset">
              <legend className="form-legend">Shipping Information</legend>
              <div className="form-group">
                <label id="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label id="form-label">Address</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label id="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label id="form-label">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label id="form-label">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </fieldset>

            <div className="button-container">
              <button type="submit" className="proceed-payment-btn">Proceed to Payment</button>
            </div>
          </form>

        </div>

      )}
    </div>
  );
};

export default Checkout;
