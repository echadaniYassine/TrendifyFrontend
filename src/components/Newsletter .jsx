import React from "react";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <h2>Subscribe to Our Newsletter</h2>
      <p>Get the latest trends and offers directly in your inbox.</p>
      <form>
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
};

export default Newsletter;
