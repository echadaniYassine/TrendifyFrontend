import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../features/cart/CartContext";
import axios from "axios";
import "../styles/pages/productDetails.css";
import ProductList from "./ProductList";
import Cookies from "js-cookie"; // Make sure js-cookie is imported

const ProductDetails = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const { dispatch } = useContext(CartContext); // Access cart context
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products
  const [allProducts, setAllProducts] = useState([]); // State to store all products
  const [feedbacks, setFeedbacks] = useState([]); // State to store feedbacks
  const [feedbackText, setFeedbackText] = useState(""); // Text of feedback
  const [rating, setRating] = useState(0); // Rating for feedback
  const [statusMessage, setStatusMessage] = useState(""); // Status message

  useEffect(() => {
    if (!productId) {
      console.error("Product ID is missing in the URL.");
      return;
    }

    const fetchProductDetailsAndProducts = async () => {
      try {
        // Fetch the selected product
        const productResponse = await axios.get(
          `http://127.0.0.1:4002/api/Trendify/Products/product/${productId}` // Use _id
        );
        const selectedProduct = productResponse.data;
        setProduct(selectedProduct);

        // Fetch all products
        const allProductsResponse = await axios.get(
          "http://127.0.0.1:4002/api/Trendify/Products/getAllProducts"
        );
        setAllProducts(allProductsResponse.data);

        // Filter related products by both categoryName and subcategory
        const related = allProductsResponse.data.filter(
          (p) =>
            p.categoryName === selectedProduct.categoryName &&
            p.subcategory === selectedProduct.subcategory &&
            p._id !== selectedProduct._id // Exclude the current product
        );
        setRelatedProducts(related);

        // Fetch feedbacks related to the current product
        const feedbackResponse = await axios.get(
          `http://127.0.0.1:4002/api/Trendify/feedback/get-all-feedbackes/${productId}`, // Get feedbacks for the current product
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`, // Add the token to the Authorization header
            },
          }
        );
        setFeedbacks(feedbackResponse.data);
      } catch (error) {
        console.error("Failed to fetch product details or products:", error);
      }
    };

    fetchProductDetailsAndProducts();
  }, [productId]);

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackText || !rating) {
      setStatusMessage("Please provide feedback and rating.");
      return;
    }

    const token = Cookies.get("token"); // Get the token from the cookies
    if (!token) {
      setStatusMessage("You must be logged in to submit feedback.");
      return;
    }

    try {
      setStatusMessage("Submitting your feedback...");

      // Send the POST request with the Authorization header
      await axios.post(
        "http://127.0.0.1:4002/api/Trendify/feedback/submit-feedback",
        { productId, text: feedbackText, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );

      setFeedbackText(""); // Clear the text input
      setRating(0); // Clear the rating
      setStatusMessage("Feedback submitted successfully.");

      // Fetch updated feedbacks with authorization
      const feedbackResponse = await axios.get(
        `http://127.0.0.1:4002/api/Trendify/feedback/get-all-feedbackes/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
      setFeedbacks(feedbackResponse.data); // Update feedback list
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      setStatusMessage("Failed to submit feedback. Please try again.");
    }
  };

  if (!product) {
    return <p className="loading-message">Loading product details...</p>;
  }

  // Determine the image to display based on category
  const categoryImage =
    product.categoryName === "Men"
      ? "/assets/menDetails.png"
      : "/assets/wemenDetails.png";

  return (
    <>
      <div className="product-details-container">
        {/* Image on the left */}
        <div className="product-image-container">
          <img src={categoryImage} alt={product.name} className="product-category-image" />
        </div>

        {/* Product details on the right */}
        <div className="product-info-container">
          <h2 className="product-name">{product.name}</h2>
          <img src={product.img} alt={product.name} className="product-image" />
          <p className="product-price">Price: ${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>

          <button className="add-to-cart-btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="section-relatedProduct">
        <h3 className="relatedProduct">Related Products</h3>
        {relatedProducts.length > 0 ? (
          <div className="product-list-container">
            <ProductList products={relatedProducts} showCategories={false} showTitle={false} />
          </div>
        ) : (
          <p>No related products found.</p>
        )}
      </div>

      {/* Feedback Section */}
      <div className="section-feedback">
        <h3 className="feedback-heading">Feedback</h3>
        <textarea
          className="feedback-textarea"
          placeholder="Leave your feedback..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />
        <div className="rating-section">
          <label>Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>
        <button onClick={handleSubmitFeedback} className="submit-feedback-btn">
          Submit Feedback
        </button>
        <p className="feedback-status-message">{statusMessage}</p>

        <div className="feedback-history">
          {feedbacks.length > 0 ? (
            <ul>
              {feedbacks.map((feedback, index) => (
                <li key={index}>
                  <p><strong>Rating:</strong> {feedback.rating}</p>
                  <p>{feedback.text}</p>
                  <p><em>Submitted on: {new Date(feedback.createdAt).toLocaleDateString()}</em></p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No feedbacks yet for this product.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
