import React from 'react';
import '../styles/pages/notFound.css'; // Assuming you'll create a specific CSS file for this component

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404: Page Not Found</h1>
      <p className="not-found-message">Sorry, the page you're looking for doesn't exist or has been moved.</p>
    </div>
  );
}
