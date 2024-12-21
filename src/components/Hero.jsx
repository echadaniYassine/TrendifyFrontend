import React from "react";

const Hero = () => {
  return (
    <section className="hero">
      <h1>Welcome to Trendify!</h1>
      <p>Your one-stop shop for the latest trends.</p>
      <button onClick={() => window.location.href = "/products"}>Shop Now</button>
    </section>
  );
};

export default Hero;
