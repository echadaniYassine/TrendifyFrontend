import React, { useState, useEffect } from "react";
import ProductCard from "../Home/ProductCart"; // Assuming you have a ProductCard component
import "../../styles/components/categories.css";

const Categories = ({
  categories,
  setSelectedCategory,
  setSelectedSubCategory,
  selectedCategory,
  selectedSubCategory,
  products = [],
}) => {
  const [activeCategory, setActiveCategory] = useState(""); // Tracks the active category

  // Subcategory options (Jackets, Pants, Hoodies, Shirts)
  const subCategories = ["Jackets", "Pants", "Hoodies", "Shirts"];

  // Function to handle category selection
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName); // Passing to parent component
    setSelectedSubCategory("All"); // Reset subcategory selection
    setActiveCategory(categoryName); // Set active category
  };

  // Function to handle subcategory selection
  const handleSubCategorySelect = (subCategoryName) => {
    setSelectedSubCategory(subCategoryName); // Passing to parent component
  };

  // Filter products based on category
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.categoryName === selectedCategory;
    const subCategoryMatch =
      selectedSubCategory === "All" || product.subcategory === selectedSubCategory;
    return categoryMatch && subCategoryMatch;
  });

  // Get 1 product from each subcategory (Jackets, Pants, Hoodies, Shirts) for Men and Women
  const getCategoryProducts = (category) => {
    const categoryProducts = filteredProducts.filter(
      (product) => product.categoryName === category
    );

    return subCategories.reduce((result, subCategory) => {
      const subCategoryProduct = categoryProducts.find(
        (product) => product.subcategory === subCategory
      );
      if (subCategoryProduct) result.push(subCategoryProduct);
      return result;
    }, []);
  };

  // Show only 8 products by default (4 for Men, 4 for Women)
  const defaultProducts =
    selectedCategory === "All"
      ? [
          ...getCategoryProducts("Men").slice(0, 4), // Get 4 products for Men
          ...getCategoryProducts("Women").slice(0, 4), // Get 4 products for Women
        ]
      : filteredProducts;

  return (
    <section className="categories-section">
      <h2>Shop by Category</h2>
      <div className="category-cards-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-card ${activeCategory === category.categoryName ? "active" : ""}`}
            onClick={() => handleCategorySelect(category.categoryName)}
            style={{ cursor: "pointer" }}
          >
            <img src={category.img} alt={category.categoryName} />
            <h3>{category.categoryName}</h3>
          </div>
        ))}
      </div>

      {(selectedCategory === "Men" || selectedCategory === "Women") && (
        <div className="subcategory-menu">
          <h3>Select a Subcategory</h3>
          <select onChange={(e) => handleSubCategorySelect(e.target.value)} value={selectedSubCategory}>
            {subCategories.map((subCategory, index) => (
              <option key={index} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="product-list">
        {defaultProducts.length > 0 ? (
          defaultProducts.map((product) => (
            <ProductCard key={product._id} product={product} /> 
          ))
        ) : (
          <p>No products available for the selected category and subcategory.</p>
        )}
      </div>
    </section>
  );
};

export default Categories;
