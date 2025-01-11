import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import '../styles/service/stripePayment.css'
const StripePaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not loaded. Please try again later.");
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      } else {
        setErrorMessage("Payment failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form className="form-stripe-pay" onSubmit={handleSubmit}>
    <div className="payment-form-group">
      <label htmlFor="cardElement" className="payment-form-label">
        Card Details
      </label>
      <CardElement id="cardElement" className="payment-form-input" />
    </div>
    {errorMessage && <p className="payment-error-message">{errorMessage}</p>}
    <button
      type="submit"
      className="payment-submit-button"
      disabled={!stripe || isProcessing}
    >
      {isProcessing ? "Processing..." : "Pay Now"}
    </button>
  </form>
  
  );
};

export default StripePaymentForm;
