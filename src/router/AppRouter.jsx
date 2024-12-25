import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Header from '../components/Header';
import { CartProvider } from "../features/cart/CartContext"; // Ensure correct import path
import Checkout from "../pages/Checkout"; // Import the Checkout component
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import {ProtectedRoute} from "./ProtectedRoute";
import ForgotPassword from "../pages/ForgetPaaword";
import ResetPassword from "../pages/ResetPassword";
import AdminDashboard from "../pages/AdminDashboard";



const AppRouter = ({ products }) => {
  return (
    <Router>

      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/Products" element={<ProductList products={products} />} />
          <Route path="/product/:productId" element={<ProductDetails products={products} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ResetPassword/:token" element={<ResetPassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>

    </Router>
  );
};

export default AppRouter;
