import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../features/cart/CartContext";
import axios from "axios";
import "../styles/pages/productDetails.css";
import ProductList from "./ProductList";
import Cookies from "js-cookie";

const ProductDetails = () => {
  const { productId } = useParams();
  const { dispatch } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [reviews, setReviews] = useState([]); // Changed from feedbacks to reviews
  const [reviewText, setReviewText] = useState(""); // Changed from feedbackText to reviewText
  const [rating, setRating] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      console.error("Product ID is missing in the URL.");
      return;
    }

    const fetchProductDetailsAndProducts = async () => {
      try {
        setLoading(true);

        // Fetch product details
        const productResponse = await axios.get(
          `http://127.0.0.1:4002/api/Trendify/Products/product/${productId}`
        );
        const selectedProduct = productResponse.data;
        setProduct(selectedProduct);

        // Fetch all products
        const allProductsResponse = await axios.get(
          "http://127.0.0.1:4002/api/Trendify/Products/getAllProducts"
        );
        const allProducts = allProductsResponse.data;
        setAllProducts(allProducts);

        const related = allProducts.filter(
          (p) =>
            p.categoryName?.toLowerCase() === selectedProduct.categoryName?.toLowerCase() &&
            p.subcategory?.toLowerCase() === selectedProduct.subcategory?.toLowerCase() &&
            p._id !== selectedProduct._id
        );

        setRelatedProducts(related);

        // Fetch reviews for the product (no login required)
        const reviewsResponse = await axios.get(
          `http://127.0.0.1:4002/api/Trendify/feedback/get-all-feedbackes/${productId}`
        );
        setReviews(reviewsResponse.data); // Changed from setFeedbacks to setReviews
      } catch (error) {
        console.error("Failed to fetch product details or products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetailsAndProducts();
  }, [productId]);

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
  };

  const handleSubmitReview = async () => { // Changed from handleSubmitFeedback to handleSubmitReview
    if (!reviewText || !rating) { // Changed from feedbackText to reviewText
      setStatusMessage("Please provide a review and a rating."); // Updated message
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      setStatusMessage("You must be logged in to submit a review."); // Updated message
      return;
    }

    try {
      setStatusMessage("Submitting your review..."); // Updated message

      await axios.post(
        "http://127.0.0.1:4002/api/Trendify/feedback/submit-feedback",
        { productId, text: reviewText, rating }, // Changed from feedbackText to reviewText
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviewText(""); // Changed from feedbackText to reviewText
      setRating(0);
      setStatusMessage("Review submitted successfully."); // Updated message

      // Fetch updated reviews
      const reviewsResponse = await axios.get(
        `http://127.0.0.1:4002/api/Trendify/feedback/get-all-feedbackes/${productId}`
      );
      setReviews(reviewsResponse.data); // Changed from setFeedbacks to setReviews
    } catch (error) {
      console.error("Failed to submit review:", error);
      setStatusMessage("Failed to submit review. Please try again."); // Updated message
    }
  };

  if (loading) {
    return <p className="loading-message">Loading product details...</p>;
  }

  if (!product) {
    return <p className="error-message">Product not found.</p>;
  }

  const categoryImage =
    product.categoryName === "Men"
      ? "/assets/menDetails.png"
      : "/assets/wemenDetails.png";
      
  const handleStarClick = (value) => {
    setRating(value); // Set the rating based on the star clicked
  };

  return (
    <>
      <div className="product-details-container">
        <div className="product-image-container">
          <img src={categoryImage} alt={product.name} className="product-category-image" />
        </div>

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
          <p style={{ textAlign: "center", color: "aliceblue", fontSize: "30px" }}>No related products found.</p>
        )}
      </div>

      <div className="reviews-section-details">
        <h3 className="reviews-heading-details">Reviews</h3>
        <textarea
          className="reviews-textarea-details"
          placeholder="Leave your review..."
          value={reviewText} // Changed from feedbackText to reviewText
          onChange={(e) => setReviewText(e.target.value)} // Changed from setFeedbackText to setReviewText
        />
        <div className="rating-section-details">
          <label>
            <span className="rating-label">Rating:</span>
          </label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button onClick={handleSubmitReview} className="submit-review-btn-details"> {/* Changed from handleSubmitFeedback to handleSubmitReview */}
          Submit Review
        </button>
        <p className="reviews-status-message-details">{statusMessage}</p> {/* Changed from feedback-status-message-details to reviews-status-message-details */}

        <div className="reviews-history-details">
          {reviews.length > 0 ? ( // Changed from feedbacks to reviews
            <ul className="reviews-history-list"> {/* Changed from feedback-history-list to reviews-history-list */}
              {reviews.map((review, index) => ( // Changed from feedback to review
                <li className="reviews-history-list-child" key={index}> {/* Changed from feedback-history-list-child to reviews-history-list-child */}
                  <p><strong>Rating:</strong> {review.rating} Stars</p> {/* Changed from feedback to review */}
                  <p>{review.text}</p> {/* Changed from feedback to review */}
                  <p><em>Submitted on: {new Date(review.createdAt).toLocaleDateString()}</em></p> {/* Changed from feedback to review */}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ textAlign: "center", color: "aliceblue", fontSize: "30px" }}>
              No reviews yet for this product. {/* Changed from feedbacks to reviews */}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;