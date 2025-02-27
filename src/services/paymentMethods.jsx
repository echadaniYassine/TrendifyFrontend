import React, { useState, useEffect } from "react";
import "../styles/components/paymentComponent.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "./StripePaymentForm ";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FaPaypal, FaCcStripe } from 'react-icons/fa';

// Load Stripe public key (replace with your actual key)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "pk_test_51QdCJXFWi5fV7v5emdPmPdK8GjSi4rUdAKsjuQGbvi8q3jG8XIsNQiDwvoSlGUwaZjWX5dRav6SlynoCSPWHgpyX00SohzAuRE");

const PaymentComponent = () => {
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  const handleApprove = async (orderID) => {
    try {
      const response = await fetch("https://trendify-backend.vercel.app/api/payments/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID }),
      });
      const data = await response.json();
      alert(data.success ? "Payment successful!" : "Payment failed.");
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
    }
  };
  useEffect(() => {
    if (paymentMethod === "stripe") {
      const fetchClientSecret = async () => {
        try {
          const response = await fetch("https://trendify-backend.vercel.app/api/payments/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 5000 }), // amount in cents (e.g., $50)
          });
          const data = await response.json();
          setPaymentIntentClientSecret(data.clientSecret);
        } catch (error) {
          console.error("Error creating payment intent:", error);
        }
      };

      fetchClientSecret();
    }
  }, [paymentMethod]);



  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || "ATtW9W9Wm72BSu6VkDX71DzxqtHaNhtkV10yNYY2Ks1jGOFV-PBLQJaxocMrbQMVfAqqxisxQ__HnrmU";

  return (
    <div className="payment-section">
      <h3 className="payment-title">Payment Details</h3>
      <div className="payment-method-container">
        <button className="payment-method-btn paypal-btn" onClick={() => setPaymentMethod("paypal")}>
          <FaPaypal className="payment-icon" />
          Pay with PayPal
        </button>
        <button className="payment-method-btn stripe-btn" onClick={() => setPaymentMethod("stripe")}>
          <FaCcStripe className="payment-icon" />
          Pay with Stripe
        </button>
      </div>

      {paymentMethod === "paypal" && (
        <div className="paypal-section">
          <PayPalScriptProvider options={{ "client-id": clientId }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{ amount: { value: "50.00" } }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handleApprove(details.id);
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}

      {paymentMethod === "stripe" && paymentIntentClientSecret && (
        <Elements stripe={stripePromise}>
          <StripePaymentForm clientSecret={paymentIntentClientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentComponent;
