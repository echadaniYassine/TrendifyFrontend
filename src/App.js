import React from 'react';
import AppRouter from './router/AppRouter';
import './App.css';
import {ProductsData} from "./data/ProductsData"; // Ensure you import your product data

function App() {
  return (
    <div className="App">
      <AppRouter products={ProductsData} />
    </div>
  );
}

export default App;
