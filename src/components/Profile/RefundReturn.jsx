import React, { useState, useEffect } from "react";
import "../styles/components/refundReturn.css";
import { fetchRefundRequests, submitRefundRequest } from "../api/refundApi"; // Assume you have these API calls

const RefundReturn = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refundReason, setRefundReason] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const loadRefunds = async () => {
      try {
        setLoading(true);
        setError(false);
        const fetchedRefunds = await fetchRefundRequests(); // Fetch refund requests
        setRefunds(fetchedRefunds);
      } catch (err) {
        console.error("Error fetching refund requests:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadRefunds();
  }, []);

  const handleSubmitRequest = async () => {
    if (!selectedOrder || !refundReason) {
      setStatusMessage("Please select an order and provide a reason for the refund.");
      return;
    }

    try {
      setStatusMessage("Submitting your refund request...");
      await submitRefundRequest(selectedOrder, refundReason); // Submit the refund request
      setStatusMessage("Refund request submitted successfully.");
    } catch (err) {
      console.error("Error submitting refund request:", err);
      setStatusMessage("Failed to submit refund request. Please try again.");
    }
  };

  return (
    <div className="section-content">
      <h3 className="refund-return-title">Refund/Return</h3>
      <p className="refund-return-description">Track your refunds or return requests here.</p>

      {/* Refund Request Form */}
      <div className="refund-return-form">
        <h4>Submit a Refund/Return Request</h4>
        <select
          className="order-select"
          value={selectedOrder}
          onChange={(e) => setSelectedOrder(e.target.value)}
        >
          <option value="">Select Order</option>
          {/* Render all orders to choose from */}
          {refunds.map((refund) => (
            <option key={refund.orderId} value={refund.orderId}>
              Order #{refund.orderId}
            </option>
          ))}
        </select>

        <textarea
          className="refund-reason-input"
          placeholder="Reason for refund/return"
          value={refundReason}
          onChange={(e) => setRefundReason(e.target.value)}
        />

        <button className="submit-refund-btn" onClick={handleSubmitRequest}>
          Submit Request
        </button>
        <p className="status-message">{statusMessage}</p>
      </div>

      {/* Refund/Return Requests History */}
      <div className="refund-return-history">
        <h4>Your Past Refund/Return Requests</h4>
        {loading ? (
          <p>Loading your refund history...</p>
        ) : error ? (
          <p>Failed to load refund history.</p>
        ) : refunds.length === 0 ? (
          <p>You have no past refund/return requests.</p>
        ) : (
          <ul className="refund-list">
            {refunds.map((refund) => (
              <li key={refund.orderId} className="refund-item">
                <p>
                  <strong>Order #{refund.orderId}</strong>
                </p>
                <p>Status: {refund.status || "Pending"}</p>
                <p>Reason: {refund.reason}</p>
                <p>Date Requested: {new Date(refund.dateRequested).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RefundReturn;
