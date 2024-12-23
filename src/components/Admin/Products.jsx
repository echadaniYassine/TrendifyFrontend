import React, { useState, useEffect } from 'react';

// Mock data import (replace with actual data fetch from an API if available)
import { ProductsData } from '../../data/ProductsData';

const Products = () => {
  const [products, setProducts] = useState([]); // State to hold the products data

  // Load products on component mount
  useEffect(() => {
    // Simulate fetching data from an API
    setProducts(ProductsData); // Replace this with an actual API call if needed
  }, []);

  // Delete a product by ID
  const deleteProduct = (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      // Filter out the deleted product
      const updatedProducts = products.filter((product) => product._id !== productId);
      setProducts(updatedProducts);}
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    onClick={() => alert(`Editing product: ${product.name}`)} // Placeholder for edit functionality
                  >
                    Edit
                  </button>
                  <button
                    style={{ marginLeft: '5px' }}
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
