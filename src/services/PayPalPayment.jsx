import React, { useState, useEffect } from "react";
import "../styles/components/paymentComponent.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "./StripePaymentForm "; // A separate component for Stripe payment form
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Load Stripe public key (replace with your actual key)
const stripePromise = loadStripe("your-stripe-public-key-here");

const PaymentComponent = () => {
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("stripe"); // "stripe" or "paypal"

  // Fetch client secret when component mounts for Stripe
  useEffect(() => {
    fetch("http://localhost:4002/api/payments/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000 }), // amount in cents (e.g., $50)
    })
      .then((res) => res.json())
      .then((data) => {
        setPaymentIntentClientSecret(data.clientSecret);
      })
      .catch((error) => console.error("Error creating payment intent:", error));
  }, []);

  // Handle PayPal payment success
  const handleApprove = (orderID) => {
    fetch("/api/payments/paypal-capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Payment successful!");
        } else {
          alert("Payment failed.");
        }
      });
  };

  return (
    <div className="section-content">
      <h3>Payment Details</h3>

      {/* Payment Method Selector */}
      <div>
        <button onClick={() => setPaymentMethod("stripe")}>Pay with Stripe</button>
        <button onClick={() => setPaymentMethod("paypal")}>Pay with PayPal</button>
      </div>

      {/* Conditionally render Stripe or PayPal based on selected payment method */}
      {paymentMethod === "stripe" && paymentIntentClientSecret && (
        <Elements stripe={stripePromise}>
          <StripePaymentForm clientSecret={paymentIntentClientSecret} />
        </Elements>
      )}

      {paymentMethod === "paypal" && (
        <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "50.00", // Amount in USD
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                handleApprove(details.id);
              });
            }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default PaymentComponent;
