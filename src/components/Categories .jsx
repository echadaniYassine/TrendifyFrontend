import React from "react";

const Categories = ({ categories, setSelectedCategory }) => {
  return (
    <section className="categories">
      <h2>Shop by Category</h2>
      <div className="category-list">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => setSelectedCategory(category.categoryName)} // Set selected category on click
            style={{ cursor: "pointer" }}
          >
            <img src={category.img} alt={category.categoryName} />
            <h3>{category.categoryName}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
