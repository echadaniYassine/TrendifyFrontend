import React, { useState, useEffect } from "react";
import "../../styles/profile/feedBack.css";
import { fetchUserFeedback, submitFeedback } from "../../api/feedback/feedbackApi";

const Feedback = ({ productId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  // Fetch user feedbacks on component mount
  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        setLoading(true);
        setError(false);
        const fetchedFeedbacks = await fetchUserFeedback(); // Fetch feedbacks for the user
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

  // Handle feedback submission
  const handleSubmitFeedback = async () => {
    if (!feedbackText) {
      setStatusMessage("Please provide your feedback before submitting.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setStatusMessage("Please provide a valid rating between 1 and 5.");
      return;
    }

    try {
      setStatusMessage("Submitting your feedback...");
      await submitFeedback(productId, feedbackText, rating); // Submit feedback for the product
      setStatusMessage("Feedback submitted successfully.");
      setFeedbackText("");
      setRating(0);

      // Refresh feedback list after successful submission
      const updatedFeedbacks = await fetchUserFeedback();
      setFeedbacks(updatedFeedbacks);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setStatusMessage("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="feedback-section">
      {/* Feedback History */}
      <div className="feedback-history-section">
        <h4 className="PastFeedback">Feedback<br/><br/>Your Past Feedback</h4>
        {loading ? (
          <p>Loading your feedback history...</p>
        ) : error ? (
          <p>Failed to load your feedback history.</p>
        ) : feedbacks.length === 0 ? (
          <p>You have not submitted any feedback yet.</p>
        ) : (
          <ul className="feedback-list">
            {feedbacks.map((feedback, index) => (
              <li key={feedback._id || index} className="feedback-item">
                <p className="feedback-item-paragraphe-strong">
                  Feedback #{index + 1}
                </p>
                <p className="feedback-item-paragraphe">
                {feedback.text}</p>
                <p className="feedback-item-paragraphe">
                Rating: {feedback.rating}</p>
                <p className="feedback-item-paragraphe">
                Date Submitted: {new Date(feedback.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feedback;
