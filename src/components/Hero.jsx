import React from "react";
import '../styles/components/hero.css';

const Hero = () => {
  return (
    <>
    <div className="hero">
    <section className="hero-section">
        <div className="hero-text-content">
          <h1 className="hero-title">Welcome to Trendify!</h1>
          <p className="hero-description">Your one-stop shop for the latest trends.</p>
          <button className="shop-now-btn" onClick={() => window.location.href = "/Products"}>Shop Now</button>
        </div>
        <div className="hero-image-container">
          <img src="path/to/your/image.jpg" alt="Hero Image" className="hero-image" />
        </div>
      </section>
    </div>
    </>
  );
};

export default Hero;
