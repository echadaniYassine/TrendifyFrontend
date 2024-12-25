import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCart"; // Assuming you have a ProductCard component
import axios from "axios";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4002/api/Trendify/Products/getAllProducts");
        setProducts(response.data); // Assuming the API returns an array of products
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError("Failed to fetch products.");
        setLoading(false); // Set loading to false on error
      }
    };

    fetchProducts();
  }, []);

  // Filter products to get only featured ones
  const featuredProducts = products.filter((product) => product.featured);

  if (loading) {
    return <p>Loading...</p>; // Show loading text while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Show error message if something went wrong
  }

  return (
    <section className="product-list">
      <h2>Our Featured Products</h2>
      <div className="product-grid">
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} /> // Make sure to use the correct key (e.g., _id)
          ))
        ) : (
          <p>No featured products available.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
