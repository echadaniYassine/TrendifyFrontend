import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import success icon
import "../../styles/components/newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState(""); // State to hold email input
  const [message, setMessage] = useState(""); // State to display success/error message
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status
  const [showSuccess, setShowSuccess] = useState(false); // State for showing success tab
  const successTabRef = useRef(null); // Ref to success subtab for detecting clicks outside

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setMessage(""); // Clear message on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage(""); // Clear previous messages

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage("Thank you for subscribing to our newsletter!");
      setEmail(""); // Clear the input field
      setShowSuccess(true); // Show success message
    }, 2000);
  };

  // Close success tab when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (successTabRef.current && !successTabRef.current.contains(event.target)) {
        setShowSuccess(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="newsletter">
      <section className="newsletter-section">
        <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
        <p className="newsletter-description">Get the latest trends and offers directly in your inbox.</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="newsletter-button" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </button>
        </form>
        {message && <p className={`newsletter-message ${message.includes("Thank you") ? "success" : "error"}`}>{message}</p>}
      </section>

      {/* Success Subtab */}
      {showSuccess && (
        <div className="success-subtab" ref={successTabRef}>
          <div className="success-message">
            <FaCheckCircle size={30} color="green" />
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newsletter;
