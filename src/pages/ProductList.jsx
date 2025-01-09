import React, { useState, useEffect } from "react";
import ProductCard from "../components/Home/ProductCart"; // Corrected import name
import axios from "axios";
import "../styles/pages/productList.css"; // Import the CSS file

const ProductList = ({ products: initialProducts = [], showCategories = true, showTitle = true }) => {
  const [products, setProducts] = useState(initialProducts);
  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);

  // Fetch products only when the component mounts or when initialProducts changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:4002/api/Trendify/Products/getAllProducts"
        );
        setProducts(response.data); // Set products from API response
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    if (initialProducts.length === 0 && products.length === 0) {
      fetchProducts();
    }
  }, [initialProducts, products]);

  useEffect(() => {
    const categorizeProducts = (products) => {
      const men = products.filter((product) => product.categoryName === "Men");
      const women = products.filter((product) => product.categoryName === "Women");
      setMenProducts(men);
      setWomenProducts(women);
    };

    if (products.length > 0) {
      categorizeProducts(products);
    }
  }, [products]);

  return (
    <section className="product-list-container">
      {showTitle && <h2 className="product-list-title">Our Products</h2>}

      {showCategories && (
        <>
          {/* Men Products Section */}
          <div className="product-section">
            <div className="product-display">
              <img src="/assets/men.png" alt="Men's Products" className="product-image" />
              <div className="product-text">
                <h3>Men's Products</h3>
                <p className="productList-description">
                  Explore our exclusive collection of men's products designed to elevate your style. From casual wear to formal attire, find the perfect pieces for every occasion.
                </p>
              </div>
            </div>

            <div className="product-grid">
              {menProducts.length > 0 ? (
                menProducts.map((product) => (
                  <ProductCard key={product._id} product={product} /> // Using _id for key
                ))
              ) : (
                <p>No men's products available.</p>
              )}
            </div>
          </div>

          {/* Women Products Section */}
          <div className="product-section">
            <div className="product-display">
              <img src="/assets/wemen.png" alt="Women's Products" className="product-image" />
              <div className="product-text">
                <h3>Women's Products</h3>
                <p className="productList-description">
                  Discover our handpicked collection of women's products, perfect for every season. Whether you're looking for trendy outfits or elegant accessories, we've got you covered.
                </p>
              </div>
            </div>

            <div className="product-grid">
              {womenProducts.length > 0 ? (
                womenProducts.map((product) => (
                  <ProductCard key={product._id} product={product} /> // Using _id for key
                ))
              ) : (
                <p>No women's products available.</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Display all products if showCategories is false */}
      {!showCategories && (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} /> // Using _id for key
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default ProductList;