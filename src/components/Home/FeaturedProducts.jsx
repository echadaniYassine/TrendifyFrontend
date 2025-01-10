import React, { useState, useEffect } from "react";
import ProductCard from "../Home/ProductCart"; // Ensure the correct import
import axios from "axios";
import '../../styles/components/featuresProducts.css'; // Updated CSS file name

const FeaturedProducts = ({ products }) => {
  const [allProducts, setAllProducts] = useState([]); // Renamed state variable
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend API
  useEffect(() => {
    axios.get("https://trendify-backend.vercel.app/api/Trendify/Products/getAllProducts")
      .then(response => {
        console.log(response.data);  // Inspect the structure of the response
        setAllProducts(Array.isArray(response.data) ? response.data : []); // Update state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error("Error fetching products", error);
        setError("Failed to fetch products"); // Set error message
        setLoading(false); // Stop loading on error
      });
  }, []);

  // Filter products to get only featured ones
  const featuredProducts = allProducts.filter((product) => product.featured);

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <section className="featured-products-section">
      <h2 className="section-heading">Our Featured Products</h2>
      <div className="featured-products-grid">
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="no-products-message">No featured products available.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
