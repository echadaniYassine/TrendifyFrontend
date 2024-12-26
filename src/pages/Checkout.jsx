import React, { useContext, useState } from "react";
import { CartContext } from "../features/cart/CartContext";
import { getCartTotal } from "../features/cart/cartUtils";
import '../styles/pages/checkout.css'
const Checkout = () => {
  const { state } = useContext(CartContext);
  const total = getCartTotal(state.cart);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Validate form inputs
    if (
      !formData.name ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.phone ||
      !formData.cardNumber ||
      !formData.expiry ||
      !formData.cvv
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    // Process checkout
    console.log("Checkout submitted:", formData, state.cart);
    alert("Order placed successfully!");
    // Clear cart (Optional)
    // dispatch({ type: "CLEAR_CART" });
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
              <li key={item.id} className="order-summary-item">
                <div>
                  <strong>{item.name}</strong> - {item.quantity} x ${item.price.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <h4 className="total-price">Total: ${total.toFixed(2)}</h4>

          <h3 className="shipping-info-title">Shipping Information</h3>
          <form onSubmit={handleCheckout} className="checkout-form">
            <div className="form-group">
              <label className="form-label">
                Full Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">
                Address:
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">
                City:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">
                Postal Code:
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">
                Phone Number:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </label>
            </div>

            <h3 className="payment-info-title">Payment Information</h3>
            <div className="form-group">
              <label className="form-label">
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">
                Expiry Date:
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  placeholder="MM/YY"
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">
                CVV:
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </label>
            </div>

            <button type="submit" className="place-order-btn">Place Order</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
