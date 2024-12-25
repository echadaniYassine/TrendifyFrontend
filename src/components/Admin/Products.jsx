import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct, addProduct, getById } from '../../api/Products'; // Correct the import

const Products = () => {
  const [products, setProducts] = useState([]); // State to hold the products data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to hold any errors during fetch
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the selected product details

  // Load products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
      } catch (err) {
        setError('Failed to load products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle deleting a product
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        // Call the delete function from the API
        await deleteProduct(productId);

        // Remove the deleted product from the state
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      } catch (err) {
        alert('Failed to delete the product.');
        console.error(err);
      }
    }
  };

  // Handle viewing product by id
  const handleViewProduct = async (productId) => {
    try {
      const product = await getById(productId); // Fetch product details by ID
      setSelectedProduct(product); // Set the selected product data to state
    } catch (err) {
      alert('Failed to fetch product details.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>id</th>
                <th>Category Name</th>
                <th>Sub Category</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Featured</th>
                <th>Sold Out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.categoryName}</td>
                    <td>{product.subcategory}</td>
                    <td>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <img src={product.img} alt={product.name} width="50" />
                    </td>
                    <td>{product.featured ? 'Yes' : 'No'}</td>
                    <td>{product.soldout ? 'Yes' : 'No'}</td>
                    <td>
                      <button
                        onClick={() => handleViewProduct(product._id)} // Call handleViewProduct with productId
                      >
                        View
                      </button>
                      <button
                        style={{ marginLeft: '5px' }}
                        onClick={() => handleDelete(product._id)} // Call handleDelete with productId
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No products available</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Conditionally render the selected product details */}
          {selectedProduct && (
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
              <h3>Product Details</h3>
              <img src={selectedProduct.img} alt={selectedProduct.name} width="150" />
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Category:</strong> {selectedProduct.categoryName}</p>
              <p><strong>Subcategory:</strong> {selectedProduct.subcategory}</p>
              <p><strong>Featured:</strong> {selectedProduct.featured ? 'Yes' : 'No'}</p>
              <p><strong>Sold Out:</strong> {selectedProduct.soldOut ? 'Yes' : 'No'}</p>
              <button onClick={() => setSelectedProduct(null)}>Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
