import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../features/cart/CartContext";
import { Link } from "react-router-dom";
import '../../styles/components/header.css';
import { FaShoppingCart, FaUser } from "react-icons/fa"; // Import cart icon

const Header = () => {
  const { state } = useContext(CartContext); // Get the cart state
  const [isFixed, setIsFixed] = useState(false); // State to manage fixed header

  // Scroll to a section with smooth scroll
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 50) { // Adjust this value as needed
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header-container ${isFixed ? 'fixed' : ''}`}>
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/Products" className="nav-link">Products</Link>
          </li>
          <li className="nav-item">
            <a
              href="#About"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();  // Prevent default anchor behavior
                scrollToSection("About"); // Smooth scroll to the About section
              }}
            >
              About
            </a>
          </li>
          <li className="nav-item">
            <Link to="/Profile" className="nav-link">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/Cart" className="nav-link">
              <FaShoppingCart className="cart-icon" />
              {state.cart.length > 0 && (
                <span className="cart-notification">{state.cart.length}</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;