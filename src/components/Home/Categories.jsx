import React, { useState, useEffect, useRef } from "react";
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
  const sectionRef = useRef(null); // Reference for observing the section
  const [isVisible, setIsVisible] = useState(false); // State for tracking visibility

  // Subcategory options
  const subCategories = ["Hoodies", "Pants", "Jackets", "Shirts"];

  // Intersection Observer for triggering animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory("All");
    setActiveCategory(categoryName);
  };

  const handleSubCategorySelect = (subCategoryName) => {
    setSelectedSubCategory(subCategoryName);
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.categoryName === selectedCategory;
    const subCategoryMatch =
      selectedSubCategory === "All" || product.subcategory === selectedSubCategory;
    return categoryMatch && subCategoryMatch;
  });

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

  const defaultProducts =
    selectedCategory === "All"
      ? [
          ...getCategoryProducts("Men").slice(0, 4),
          ...getCategoryProducts("Women").slice(0, 4),
        ]
      : filteredProducts;

  return (
    <section
      className={`categories-section ${isVisible ? "animate" : ""}`}
      ref={sectionRef}
    >
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
          <select
            onChange={(e) => handleSubCategorySelect(e.target.value)}
            value={selectedSubCategory}
          >
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
