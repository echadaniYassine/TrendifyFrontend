import React, { useState } from "react";
import ProductCard from "./ProductCart"; // Assuming you have a ProductCard component
const Categories = ({ categories, setSelectedCategory, setSelectedSubCategory, products = [] }) => {
  const [selectedCategory, setSelectedCategoryState] = useState("All");
  const [selectedSubCategory, setSelectedSubCategoryState] = useState("All");

  // Function to handle category selection
  const handleCategorySelect = (categoryName) => {
    setSelectedCategoryState(categoryName);
    setSelectedCategory(categoryName); // Passing to parent component
    setSelectedSubCategoryState("All"); // Reset subcategory selection
    setSelectedSubCategory("All"); // Reset subcategory in parent
  };

  // Function to handle subcategory selection
  const handleSubCategorySelect = (subCategoryName) => {
    setSelectedSubCategoryState(subCategoryName);
    setSelectedSubCategory(subCategoryName); // Passing to parent component
  };

  // Ensure products array is available before calling .filter()
  const filteredProducts = products?.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.categoryName === selectedCategory;
    const subCategoryMatch =
      selectedSubCategory === "All" || product.subcategory === selectedSubCategory; // Ensure this matches your data
    console.log(`Filtering: ${product.name}, Category Match: ${categoryMatch}, Subcategory Match: ${subCategoryMatch}`);
    return categoryMatch && subCategoryMatch;
  });

  // Subcategory options (Jackets, Pants, Hoodies, Shirts)
  const subCategories = [
    "All",
    "Jackets",
    "Pants",
    "Hoodies",
    "Shirts"
  ];

  return (
    <section className="categories">
      <h2>Shop by Category</h2>
      <div className="category-list">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => handleCategorySelect(category.categoryName)}
            style={{ cursor: "pointer" }}
          >
            <img src={category.img} alt={category.categoryName} />
            <h3>{category.categoryName}</h3>
          </div>
        ))}
      </div>

      {/* Display subcategory menu if a main category (Men/Women) is selected */}
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

      {/* Display filtered products based on the selected category and subcategory */}
      <div className="product-list">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available for the selected category and subcategory.</p>
        )}
      </div>
    </section>
  );
};

export default Categories;
