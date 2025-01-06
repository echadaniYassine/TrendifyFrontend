import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../features/cart/CartContext";
import axios from "axios";
import "../styles/pages/productDetails.css";
import ProductList from "./ProductList";

const ProductDetails = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const { dispatch } = useContext(CartContext); // Access cart context
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products by category and subcategory
  const [allProducts, setAllProducts] = useState([]); // State to store all products

  useEffect(() => {
    if (!productId) {
      console.error("Product ID is missing in the URL.");
      return;
    }

    const fetchProductDetailsAndProducts = async () => {
      try {
        // Fetch the selected product
        const productResponse = await axios.get(
          `http://127.0.0.1:4002/api/Trendify/Products/product/${productId}` // Use _id
        );
        const selectedProduct = productResponse.data;
        setProduct(selectedProduct);

        // Fetch all products
        const allProductsResponse = await axios.get(
          "http://127.0.0.1:4002/api/Trendify/Products/getAllProducts"
        );
        setAllProducts(allProductsResponse.data);

        // Filter related products by both categoryName and subcategory
        const related = allProductsResponse.data.filter(
          (p) =>
            p.categoryName === selectedProduct.categoryName &&
            p.subcategory === selectedProduct.subcategory &&
            p._id !== selectedProduct._id // Exclude the current product
        );
        setRelatedProducts(related);
      } catch (error) {
        console.error("Failed to fetch product details or products:", error);
      }
    };

    fetchProductDetailsAndProducts();
  }, [productId]);

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
  };

  if (!product) {
    return <p className="loading-message">Loading product details...</p>;
  }

  // Determine the image to display based on category
  const categoryImage =
    product.categoryName === "Men"
      ? "/assets/menDetails.png"
      : "/assets/wemenDetails.png";

  return (
    <>
      <div className="product-details-container">
        {/* Image on the left */}
        <div className="product-image-container">
          <img src={categoryImage} alt={product.name} className="product-category-image" />
        </div>

        {/* Product details on the right */}
        <div className="product-info-container">
          <h2 className="product-name">{product.name}</h2>
          <img src={product.img} alt={product.name} className="product-image" />
          <p className="product-price">Price: ${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>

          <button className="add-to-cart-btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="section-relatedProduct">
        <h3 className="relatedProduct">Related Products</h3>
        {relatedProducts.length > 0 ? (
          <div className="product-list-container">
            <ProductList products={relatedProducts} showCategories={false} showTitle={false} />
          </div>
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
