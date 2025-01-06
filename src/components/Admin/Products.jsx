import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct, addProduct, getById } from '../../api/Products/Products'; // Correct the import
import '../../styles/admin/Products.css'; // Import the CSS file

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await deleteProduct(productId);
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      } catch (err) {
        alert('Failed to delete the product.');
        console.error(err);
      }
    }
  };

  const handleViewProduct = async (productId) => {
    try {
      const product = await getById(productId);
      setSelectedProduct(product);
    } catch (err) {
      alert('Failed to fetch product details.');
      console.error(err);
    }
  };

  return (
    <div className="products-container">
      <h2 className="products-title">Manage Products</h2>
      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Subcategory</th>
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
                        className="view-button"
                        onClick={() => handleViewProduct(product._id)}
                      >
                        View
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(product._id)}
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

          {selectedProduct && (
            <div className="product-details">
              <h3>Product Details</h3>
              <img src={selectedProduct.img} alt={selectedProduct.name} width="150" />
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Category:</strong> {selectedProduct.categoryName}</p>
              <p><strong>Subcategory:</strong> {selectedProduct.subcategory}</p>
              <p><strong>Featured:</strong> {selectedProduct.featured ? 'Yes' : 'No'}</p>
              <p><strong>Sold Out:</strong> {selectedProduct.soldOut ? 'Yes' : 'No'}</p>
              <button className="close-button" onClick={() => setSelectedProduct(null)}>Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
