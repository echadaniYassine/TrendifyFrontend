import React from "react";
import ProductCard from "./ProductCart"; // Assuming you have a ProductCard component

const Categories = ({ categories, setSelectedCategory, setSelectedSubCategory, selectedCategory, selectedSubCategory, products = [] }) => {

  // Function to handle category selection
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName); // Passing to parent component
    setSelectedSubCategory("All"); // Reset subcategory selection
  };

  // Function to handle subcategory selection
  const handleSubCategorySelect = (subCategoryName) => {
    setSelectedSubCategory(subCategoryName); // Passing to parent component
  };

  // Filter products based on category and subcategory
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.categoryName === selectedCategory;
    const subCategoryMatch = selectedSubCategory === "All" || product.subcategory === selectedSubCategory;
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
        {filteredProducts.length > 0 ? (
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
