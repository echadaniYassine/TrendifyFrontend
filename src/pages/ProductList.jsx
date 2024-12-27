import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCart";
import axios from "axios";
import "../styles/pages/productList.css"; // Import the CSS file

const ProductList = ({ products: initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    if (initialProducts.length === 0) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:4002/api/Trendify/Products/getAllProducts"
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      };

      fetchProducts();
    }
  }, [initialProducts]);

  return (
    <section className="product-list-container">
      <h2 className="product-list-title">Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
