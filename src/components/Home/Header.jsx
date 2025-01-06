import React from "react";
import { Link } from "react-router-dom";
import '../../styles/components/header.css';

const Header = () => (
  <header className="header-container">
    <nav className="navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/Products" className="nav-link">Products</Link>
        </li>
        <li className="nav-item">
          <a href="#About" className="nav-link">About</a>
        </li>
        <li className="nav-item">
          <Link to="/Cart" className="nav-link">Cart</Link>
        </li>
        <li className="nav-item">
          <Link to="/Profile" className="nav-link">Profile</Link> 
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
