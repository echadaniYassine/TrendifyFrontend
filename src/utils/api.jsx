const API_BASE_URL = "https://api.example.com";

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response.json();
};
