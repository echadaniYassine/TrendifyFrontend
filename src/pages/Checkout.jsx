import React, { useContext, useState } from "react";
import { CartContext } from "../features/cart/CartContext";
import { getCartTotal } from "../features/cart/cartUtils";

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
    <div>
      <h2>Checkout</h2>
      {state.cart.length === 0 ? (
        <p>Your cart is empty. Please add some products before proceeding to checkout.</p>
      ) : (
        <div>
          <h3>Order Summary</h3>
          <ul>
            {state.cart.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.name}</strong> - {item.quantity} x ${item.price.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <h4>Total: ${total.toFixed(2)}</h4>

          <h3>Shipping Information</h3>
          <form onSubmit={handleCheckout}>
            <div>
              <label>
                Full Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Postal Code:
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <h3>Payment Information</h3>
            <div>
              <label>
                Card Number:
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Expiry Date:
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  placeholder="MM/YY"
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                CVV:
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>

            <button type="submit">Place Order</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
