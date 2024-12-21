import React from "react";

const Categories = () => {
  const categories = [
    { name: "Men", img: "/assets/men.jpg" },
    { name: "Women", img: "/assets/women.jpg" },
    { name: "Accessories", img: "/assets/accessories.jpg" },
  ];

  return (
    <section className="categories">
      <h2>Shop by Category</h2>
      <div className="category-list">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.img} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
