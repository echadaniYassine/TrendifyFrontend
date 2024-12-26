import React, { useContext } from "react";
import { CartContext } from "../features/cart/CartContext";
import { useNavigate } from "react-router-dom";
import '../styles/components/productCart.css';

const ProductCard = ({ product }) => {
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const handleNavigateToDetails = () => {
    navigate(`/product/${product._id}`); // Use MongoDB's `_id`
  };

  return (
    <div className="product-card">
      <img
        src={product.img}
        alt={product.name}
        className="product-card-image"
        onClick={handleNavigateToDetails}
      />
      <h3 className="product-card-title">{product.name}</h3>
      <p className="product-card-price">${product.price.toFixed(2)}</p>
      <button className="product-card-button" onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
