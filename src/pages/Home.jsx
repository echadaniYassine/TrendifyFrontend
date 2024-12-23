import React, { useState } from "react";
import Footer from "../components/Footer";
import ProductList from "../pages/ProductList";
import About from "../components/About";
import Hero from "../components/Hero";
import Categories from "../components/Categories ";
import Benefits from "../components/Benefits ";
import Newsletter from "../components/Newsletter ";
import { ProductsData, categories } from "../data/ProductsData"; // Import updated data
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");

  // Filter products based on the selected category and subcategory
  const filteredProducts = ProductsData.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.categoryName === selectedCategory;
    const subCategoryMatch = selectedSubCategory === "All" || product.subcategory === selectedSubCategory;
    return categoryMatch && subCategoryMatch;
  });

  return (
    <div>
      <Hero />
      <FeaturedProducts products={ProductsData}/>
      <Categories
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        setSelectedSubCategory={setSelectedSubCategory}  // Ensure this is passed correctly
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
