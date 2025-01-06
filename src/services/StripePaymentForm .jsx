import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripePaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet.
    }

    const cardElement = elements.getElement(CardElement);

    // Confirm the payment intent with the client secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else {
      // Send the payment intent ID to your server for processing if necessary
      fetch("/api/payments/stripe/capture-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: paymentIntent.payment_method }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Payment successful!");
          } else {
            setErrorMessage("Payment failed. Please try again.");
          }
          setIsProcessing(false);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cardElement" className="form-label">
          Card Details
        </label>
        <CardElement id="cardElement" className="form-input" />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button
        type="submit"
        className="submit-button"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default StripePaymentForm;
