import React from "react";
import '../../styles/components/footer.css';

const Footer = () => (
  <footer className="footer-container">
    <p className="footer-text">&copy; {new Date().getFullYear()} Trendify. All rights reserved.</p>
  </footer>
);

export default Footer;
