import React, { useContext } from "react";
import { CartContext } from "../features/cart/CartContext";
import { getCartTotal, getCartItemCount } from "../features/cart/cartUtils";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Install this library: npm install jwt-decode
import '../styles/pages/cart.css'
const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const total = getCartTotal(state.cart);
  const itemCount = getCartItemCount(state.cart);
  const navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");

    if (!token) return false;

    try {
      // Decode the token to access its payload
      const decodedToken = jwtDecode(token);

      // Check if the token is expired
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      if (decodedToken.exp < currentTime) {
        // Token is expired, remove it from localStorage
        localStorage.removeItem("token");
        return false;
      }

      return true; // Token is valid and not expired
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token"); // If the token is invalid, remove it
      return false;
    }
  };

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: { id, quantity } });
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      alert("Your session has expired or you are not logged in. Please log in.");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {state.cart.length === 0 ? (
        <p className="cart-empty-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {state.cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.img}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">Price: ${item.price.toFixed(2)}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                <div className="cart-item-actions">
                  <button
                    className="cart-item-remove-btn"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                  <button
                    className="cart-item-quantity-btn"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="cart-item-quantity-btn"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p className="cart-summary-text">Total items: {itemCount}</p>
            <p className="cart-summary-text">Total price: ${total.toFixed(2)}</p>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
