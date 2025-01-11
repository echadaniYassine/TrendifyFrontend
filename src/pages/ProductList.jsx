import React, { useState, useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa"; // Import a relevant icon
import ProductCard from "../components/Home/ProductCart";
import axios from "axios";
import "../styles/pages/productList.css";

const ProductList = ({ products: initialProducts = [], showCategories = true, showTitle = true }) => {
  const [products, setProducts] = useState(initialProducts);
  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);
  const [showMenMore, setShowMenMore] = useState(false); // State for Men category "See More"
  const [showWomenMore, setShowWomenMore] = useState(false); // State for Women category "See More"

  // Fetch products only when the component mounts or when initialProducts changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://trendify-backend.vercel.app/api/Trendify/Products/getAllProducts"
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
                  Explore our exclusive collection of men's products designed to elevate your style.
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

            {/* See More Button */}
            <button className="see-more-btn" onClick={() => setShowMenMore(!showMenMore)}>
              {showMenMore ? "Hide" : "See More"}
            </button>

            {/* Show "New Modern Products Are Coming Soon" sub-tab for Men */}
            {showMenMore && (
              <div className="sub-tab">
                <div className="sub-tab-message">
                  <FaExclamationCircle size={30} color="blue" />
                  <p className="sub-tab-message-p">New modern products are coming soon!</p>
                </div>
              </div>
            )}
          </div>

          {/* Women Products Section */}
          <div className="product-section">
            <div className="product-display">
              <img src="/assets/wemen.png" alt="Women's Products" className="product-image" />
              <div className="product-text">
                <h3>Women's Products</h3>
                <p className="productList-description">
                  Discover our handpicked collection of women's products, perfect for every season.
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

            {/* See More Button */}
            <button className="see-more-btn" onClick={() => setShowWomenMore(!showWomenMore)}>
              {showWomenMore ? "Hide" : "See More"}
            </button>

            {/* Show "New Modern Products Are Coming Soon" sub-tab for Women */}
            {showWomenMore && (
              <div className="sub-tab">
                <div className="sub-tab-message">
                  <FaExclamationCircle size={30} color="blue" />
                  <p className="sub-tab-message-p">New modern products are coming soon!</p>
                </div>
              </div>
            )}
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
