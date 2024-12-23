import React from "react";
import ProductCard from "../components/ProductCart"; // Assuming you have a ProductCard component

const FeaturedProducts = ({ products }) => {
  // Filter products to get only featured ones
  const featuredProducts = products.filter(product => product.featured);

  return (
    <section className="product-list">
      <h2>Our Featured Products</h2>
      <div className="product-grid">
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No featured products available.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;