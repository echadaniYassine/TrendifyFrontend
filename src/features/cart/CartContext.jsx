import { createContext, useReducer, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import
import cartReducer from "./CartReducer";

// Authentication function to check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    return false;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const authenticated = isAuthenticated();
    setIsUserAuthenticated(authenticated);
    if (authenticated) {
      console.log("User authenticated");
      // Load the cart data from localStorage if authenticated
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      dispatch({ type: "SET_CART", payload: storedCart });
    } else {
      console.log("User not authenticated");
    }
  }, []); // Runs once when the component mounts

  // Sync cart to localStorage on every state update
  useEffect(() => {
    if (isUserAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Sync cart to localStorage
    }
  }, [state.cart, isUserAuthenticated]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
