import React, { useState, useEffect } from "react";
import "../styles/components/feedback.css";
import { fetchFeedbacks, submitFeedback } from "../api/feedbackApi"; // Assume you have these API calls

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        setLoading(true);
        setError(false);
        const fetchedFeedbacks = await fetchFeedbacks(); // Fetch feedbacks
        setFeedbacks(fetchedFeedbacks);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadFeedbacks();
  }, []);

  const handleSubmitFeedback = async () => {
    if (!feedbackText) {
      setStatusMessage("Please provide your feedback before submitting.");
      return;
    }

    try {
      setStatusMessage("Submitting your feedback...");
      await submitFeedback(feedbackText, rating); // Submit the feedback
      setStatusMessage("Feedback submitted successfully.");
      setFeedbackText("");
      setRating(0);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setStatusMessage("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="section-content">
      <h3 className="feedback-title">Feedback</h3>
      <p className="feedback-description">Leave your feedback to help us improve.</p>

      {/* Feedback Submission Form */}
      <div className="feedback-form">
        <h4>Submit Your Feedback</h4>
        <textarea
          className="feedback-textarea"
          placeholder="Your feedback..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

        <div className="rating">
          <label>Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="rating-input"
          />
        </div>

        <button className="submit-feedback-btn" onClick={handleSubmitFeedback}>
          Submit Feedback
        </button>
        <p className="status-message">{statusMessage}</p>
      </div>

      {/* Feedback History */}
      <div className="feedback-history">
        <h4>Your Past Feedback</h4>
        {loading ? (
          <p>Loading your feedback history...</p>
        ) : error ? (
          <p>Failed to load your feedback history.</p>
        ) : feedbacks.length === 0 ? (
          <p>You have not submitted any feedback yet.</p>
        ) : (
          <ul className="feedback-list">
            {feedbacks.map((feedback, index) => (
              <li key={index} className="feedback-item">
                <p>
                  <strong>Feedback #{index + 1}</strong>
                </p>
                <p>{feedback.text}</p>
                <p>Rating: {feedback.rating}</p>
                <p>Date Submitted: {new Date(feedback.dateSubmitted).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feedback;
