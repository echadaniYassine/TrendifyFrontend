import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import About from "../components/About";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Benefits from "../components/Benefits";
import Newsletter from "../components/Newsletter";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    axios.get("http://127.0.0.1:4002/api/Trendify/Category/getCategories")
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories", error);
      });

    // Fetch products from the API
    axios.get("http://127.0.0.1:4002/api/Trendify/Products/getAllProducts")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products", error);
      });
  }, []);

  // Filter products based on the selected category and subcategory
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.categoryName === selectedCategory;
    const subCategoryMatch = selectedSubCategory === "All" || product.subcategory === selectedSubCategory;
    return categoryMatch && subCategoryMatch;
  });

  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        setSelectedSubCategory={setSelectedSubCategory}
        selectedCategory={selectedCategory} // Pass selectedCategory to Categories
        selectedSubCategory={selectedSubCategory} // Pass selectedSubCategory to Categories
        products={filteredProducts} // Pass filtered products to Categories
      />
      <About />
      <Benefits />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
