import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard";
import About from "./Pages/About";
import Sidebar from "./Sidebar";
import Comment from "./Pages/Comment";
import Analytics from "./Pages/Analytics";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";

export default function AdminDashboard() {
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productList" element={<ProductList />} />
      </Routes>
    </Sidebar>
  );
}
