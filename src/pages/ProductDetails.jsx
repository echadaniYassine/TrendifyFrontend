import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../features/cart/CartContext";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const { dispatch } = useContext(CartContext); // Access cart context
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productId) {
      console.error("Product ID is missing in the URL.");
      return; // Return early if productId is not available
    }

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4002/api/Trendify/Products/product/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img
        src={product.img}
        alt={product.name}
        style={{ width: "200px", height: "200px" }}
      />
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
