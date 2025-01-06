import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../features/cart/CartContext";
import { getCartTotal } from "../features/cart/cartUtils";
import axios from "axios";
import '../styles/pages/checkout.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import mongoose from 'mongoose';

const Checkout = () => {
  const { state, dispatch } = useContext(CartContext);
  const total = getCartTotal(state.cart);

  const [formData, setFormData] = useState({
    name: "",
    addressLine1: "",
    city: "",
    postalCode: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
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
        const response = await axios.get('http://localhost:4002/api/Trendify/Trendify_user-info', {
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

  const handleCheckout = async (e) => {
    e.preventDefault();

    // Validation (card number, CVV, etc.)
    if (Object.values(formData).some((field) => !field.trim())) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!/^\d{16}$/.test(formData.cardNumber)) {
      alert("Invalid card number. Must be 16 digits.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiry)) {
      alert("Invalid expiry date. Format: MM/YY.");
      return;
    }

    if (!/^\d{3}$/.test(formData.cvv)) {
      alert("Invalid CVV. Must be 3 digits.");
      return;
    }

    try {
      const token = Cookies.get('token');
      const userResponse = await axios.get('http://localhost:4002/api/Trendify/Trendify_user-info', {
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
          "http://localhost:4002/api/Trendify/Trendify_modifyUser",
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
        items: state.cart.map((item) => {
          const productId = mongoose.Types.ObjectId.isValid(item._id) // Assuming _id is the correct field
            ? new mongoose.Types.ObjectId(item._id).toString() // Convert ObjectId to string
            : null;
          console.log('ProductId:', productId); // Log the generated productId

          if (!productId) {
            throw new Error(`Invalid productId: ${item._id}`); // Updated error to reflect _id
          }

          return {
            productId,
            quantity: item.quantity,
            price: item.price,
          };
        }),
      };

      console.log(state.cart); // Add this line to check the productId


      try {
        const response = await axios.post("http://localhost:4002/api/Trendify/orders/createOrder", orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Status:", response.status); // Log status to check if the request was successful
        if (response.status === 200) {
          alert("Order placed successfully!");
          dispatch({ type: "CLEAR_CART" });
          navigate('/'); // Change this to your home route


        } else {
          setError("Failed to place order. Please try again.");
        }
      } catch (error) {
        console.error("Error placing order:", error.response?.data || error.message);
        setError("There was an error placing your order. Please try again.");
      }
      


      setFormData({
        name: "",
        addressLine1: "",
        city: "",
        postalCode: "",
        phone: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      });
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      setError("There was an error placing your order. Please try again.");
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
              <li key={item._id} className="order-summary-item"> {/* Use _id for key */}
                <div>
                  <strong>{item.name}</strong> - {item.quantity} x ${item.price.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <h4 className="total-price">Total: ${total.toFixed(2)}</h4>

          <h3 className="shipping-info-title">Shipping Information</h3>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleCheckout} className="checkout-form">
            <div className="form-group">
              <label className="form-label">Full Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Address:</label>
              <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">City:</label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Postal Code:</label>
              <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number:</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" required />
            </div>

            <h3 className="payment-info-title">Payment Information</h3>
            <div className="form-group">
              <label className="form-label">Card Number:</label>
              <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Expiry Date:</label>
              <input type="text" name="expiry" value={formData.expiry} placeholder="MM/YY" onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">CVV:</label>
              <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} className="form-input" required />
            </div>

            <button type="submit" className="place-order-btn">Place Order</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
