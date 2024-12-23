import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../features/cart/CartContext"; // Correct import path

const ProductDetails = ({ products }) => {
  const { productId } = useParams(); // Get the product ID from the URL
  const product = products.find((p) => p.id === Number(productId)); // Convert productId to a number
  const { state, dispatch } = useContext(CartContext); // Access cart state and dispatch

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };
  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.img} alt={product.name} style={{ width: "200px", height: "200px" }} />
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;