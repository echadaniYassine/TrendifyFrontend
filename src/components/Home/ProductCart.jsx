// ProductCard.js
import React, { useContext } from "react";
import { CartContext } from "../../features/cart/CartContext";
import { useNavigate } from "react-router-dom";
import '../../styles/components/productCart.css';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  // Add product to cart
  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  // Navigate to product details page
  const handleNavigateToDetails = () => {
    navigate(`/product/${product._id}`);
  };

  // Ensure price and image exist before rendering
  if (!product.price || !product.img) {
    return <div className="product-card">Product details missing</div>;
  }

  return (
    <div className="product-card">
      <img
        src={product.img}
        alt={product.name}
        className="product-card-image"
        onClick={handleNavigateToDetails}
      />
      <h3 className="product-card-title">{product.name}</h3>
      <p className="product-card-price">MAD {product.price ? product.price.toFixed(2) : 'N/A'}</p>
      <button className="product-card-button" onClick={addToCart}>
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
