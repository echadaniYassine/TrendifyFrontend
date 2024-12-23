import React, { useContext } from "react";
import { CartContext } from "../features/cart/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { state, dispatch } = useContext(CartContext);

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };
  const navigate = useNavigate(); 

  const handleNavigateToDetails = () => {
    navigate(`/products/${product.id}`); 
  };

  return (
    <div className="product-card" >
      <img src={product.img} alt={product.name} onClick={handleNavigateToDetails} style={{ cursor: "pointer" }}/>
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
