import React from "react";
import '../../styles/components/benefits.css'

const Benefits = () => {
  return (
    <section className="benefits-section">
      <h2>Why Shop with Us?</h2>
      <div className="benefits-list">
        <div className="benefit-item">
          <h3>Free Shipping</h3>
          <p>On all orders over $50</p>
        </div>
        <div className="benefit-item">
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div className="benefit-item">
          <h3>Secure Payment</h3>
          <p>Your payments are safe with us</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
