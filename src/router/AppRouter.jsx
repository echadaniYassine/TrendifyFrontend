import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Navbar from "../components/NavBar";
import NotFound from "../pages/NotFound";
import Header from '../components/Header';
import { CartProvider } from "../features/cart/CartContext"; // Ensure correct import path
import Checkout from "../pages/Checkout"; // Import the Checkout component
import ProductDetails from "../pages/ProductDetails";



const AppRouter = ({products}) => {
  return (
    <Router>
      <CartProvider>
        <Header />
        <Navbar /> {/* Display Navbar on every page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetails products={products} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default AppRouter;
