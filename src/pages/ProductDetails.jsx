import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = ({ products }) => {
  const { productId } = useParams(); // Get the product ID from the URL
  const product = products.find((p) => p.id === Number(productId)); // Convert productId to a number

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.img} alt={product.name} style={{ width: "200px", height: "200px" }} />
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;