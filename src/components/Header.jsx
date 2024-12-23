import React from "react";
import { Link } from "react-router-dom";
const Header = () => (
  <header>
    <h1>Trendify</h1>
    <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/Products">Products</Link>
      </li>
      <li>
        <a href="#About">About</a>
      </li>
      <li>
        <Link to="/Cart">Cart</Link>
      </li>
      <li>
        <Link to="/Profile">Profile</Link> {/* Corrected from /Profil to /Profile */}
      </li>
    </ul>
  </nav>
  </header>
);

export default Header;
