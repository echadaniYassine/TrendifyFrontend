import React from "react";
import ProductCard from "../components/ProductCart"; // Correct path to ProductCard
import {ProductsData} from "../data/ProductsData"; // Ensure you have your product data available

const ProductList = () => {
  if (!ProductsData) return null;

  return (
    <div className="product-list">
      {ProductsData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
