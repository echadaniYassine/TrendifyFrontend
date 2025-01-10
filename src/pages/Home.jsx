import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Home/Footer";
import About from "../components/Home/About";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import Benefits from "../components/Home/Benefits";
import Newsletter from "../components/Home/Newsletter";
import FeaturedProducts from "../components/Home/FeaturedProducts";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    axios
      .get("https://trendify-backend.vercel.app/api/Trendify/Products/getAllProducts")
      .then((response) => {
        console.log("Products Response:", response.data); // Log the response to inspect its structure
        setProducts(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
      })
      .catch((error) => {
        console.error("Error fetching products", error);
        setProducts([]); // Set to an empty array if the fetch fails
      });
  }, []);


  useEffect(() => {
    axios
      .get("https://trendify-backend.vercel.app/api/Trendify/Category/getCategories")
      .then((response) => {
        console.log("Categories Response:", response.data);
        setCategories(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
        setCategories([]);
      });
  }, []);

  // Filter products based on the selected category and subcategory
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.categoryName === selectedCategory;
      const subCategoryMatch =
        selectedSubCategory === "All" || product.subcategory === selectedSubCategory;
      return categoryMatch && subCategoryMatch;
    })
    : [];


  return (
    <div>
      <Hero />
      <FeaturedProducts products={Array.isArray(filteredProducts) ? filteredProducts : []} />
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
