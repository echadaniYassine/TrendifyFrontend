import React, { useState, useEffect } from "react";
import ProductCard from "../Home/ProductCart"; // Ensure the correct import
import axios from "axios";
import '../../styles/components/featuresProducts.css'; // Updated CSS file name

const FeaturedProducts = ({ products }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const filteredProducts = Array.isArray(products) ? products.filter(product => product.someCondition) : [];

  // Fetch products from the backend API
  useEffect(() => {
    axios.get("https://trendify-frontend-nine.vercel.app/Products/getAllProducts")
      .then(response => {
        console.log(response.data);  // Inspect the structure of the response
        setProducts(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => {
        console.error("Error fetching products", error);
      });
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
