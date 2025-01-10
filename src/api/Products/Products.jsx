import axios from "axios";

const API_URL = "https://trendify-backend.vercel.app/Products"; // Adjust as per your back-end server

// Function to fetch all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllProducts`);
    return response.data; // Assuming your back-end returns product data here
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

// Function to fetch a product by ID
export const getById = async (productId) => { // Added productId parameter
  try {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data; // Assuming your back-end returns product data here
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw error;
  }
};

// Function to add a new product
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/addProduct`, productData);
    return response.data; // Assuming your back-end returns the newly created product
  } catch (error) {
    console.error("Failed to add product:", error);
    throw error;
  }
};

// Function to update a product (e.g., mark as sold out)
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await axios.patch(`${API_URL}/updateProduct/${productId}`, updatedData);
    return response.data; // Assuming your back-end returns the updated product
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
};

// Function to delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteProduct/${productId}`);
    return response.data; // Assuming your back-end confirms deletion
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
};

// Function to patch a product
export const patchProduct = async (productId, updatedFields) => {
  try {
    const response = await axios.patch(`${API_URL}/patchProduct/${productId}`, updatedFields);
    return response.data; // Assuming the API returns the updated product object
  } catch (error) {
    console.error("Failed to patch product:", error);
    throw error;
  }
};
