import React, { useContext } from "react";
import { CartContext } from "../features/cart/CartContext";
import { getCartTotal, getCartItemCount } from "../features/cart/cartUtils";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Install this library: npm install jwt-decode

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
    <div>
      <h2>Your Cart</h2>
      {state.cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {state.cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.img}
                alt={item.name}
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                >
                  -
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Total items: {itemCount}</p>
            <p>Total price: ${total.toFixed(2)}</p>
          </div>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
