import React from "react";
import Footer from "../components/Footer";
import ProductList from "./ProductList";
import About from "../components/About";

const Home = () => {
  return (
    <div>
      
      <ProductList />
      <About/>
      <Footer/>
    </div>
  );
};

export default Home;
