import React, { useState } from "react";
import Footer from "../components/Footer";
import ProductList from "../pages/ProductList";
import About from "../components/About";
import Hero from "../components/Hero";
import Categories from "../components/Categories ";
import Benefits from "../components/Benefits ";
import Newsletter from "../components/Newsletter ";
import { ProductsData, categories } from "../data/ProductsData"; // Import updated data

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All"); // State to store selected category

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? ProductsData // Show all products
      : ProductsData.filter((product) => product.categoryName === selectedCategory); // Filter products based on category

  return (
    <div>
      <Hero />
      <Categories categories={categories} setSelectedCategory={setSelectedCategory} />
      <ProductList products={filteredProducts} />
      <About />
      <Benefits />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;