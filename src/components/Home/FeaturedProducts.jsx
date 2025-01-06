import React, { useState, useEffect } from "react";
import ProductCard from "../Home/ProductCart"; // Ensure the correct import
import axios from "axios";
import '../../styles/components/featuresProducts.css'; // Updated CSS file name

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4002/api/Trendify/Products/getAllProducts");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products to get only featured ones
  const featuredProducts = products.filter((product) => product.featured);

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
