import React from "react";
import ProductCard from "../components/ProductCart"; // Assuming you have a ProductCard component

const ProductList = ({ products }) => {
  return (
    <section className="product-list">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
