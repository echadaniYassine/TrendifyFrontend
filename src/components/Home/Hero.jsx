import React from "react";
import '../../styles/components/hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-video-container">
        <video
          src="assets/vid1.mp4"
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay Content */}
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to Trendify!</h1>
          <p className="hero-description">Whether you're looking for the most stylish outfits,
            we have it all.
            Shop and enjoy fast, reliable delivery to your doorstep.</p>
          <button className="shop-now-btn" onClick={() => window.location.href = "/Products"}>Shop Now</button> </div>
      </div>
    </div>
  );
};

export default Hero;
