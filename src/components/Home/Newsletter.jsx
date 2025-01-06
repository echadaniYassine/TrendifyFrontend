import React from "react";
import '../../styles/components/newsletter.css';

const Newsletter = () => {
  return (
    <div className="newsletter"> 
      <section className="newsletter-section">
      <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
      <p className="newsletter-description">Get the latest trends and offers directly in your inbox.</p>
      <form className="newsletter-form">
        <input type="email" className="newsletter-input" placeholder="Enter your email" required />
        <button type="submit" className="newsletter-button">Subscribe</button>
      </form>
    </section>
    </div>
  );
};

export default Newsletter;
