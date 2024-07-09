<<<<<<< HEAD
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard";
import About from "./Pages/About";
import Sidebar from "./Sidebar";
import Comment from "./Pages/Comment";
import Analytics from "./Pages/Analytics";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import AllProjects from "./Pages/AllProjects";
import AddProject from "./Pages/AddProject";
import { ViewProject } from "./ViewProject";
export default function AdminDashboard() {
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/comment" element={<Comment />} />
        {/* <Route path="/analytics" element={<Analytics />} /> */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Dashboard/AllProjects" element={<AllProjects />} />
        <Route path="/Dashboard/AddProject" element={<AddProject />} />
        <Route path="/Dashboard/ViewProject" element={<ViewProject />} />
        {/* <Route path="/" element={<Analytics />}>
          <Route path="/AllProjects" element={<AllProjects />} />
        </Route> */}
        <Route path="/product" element={<Product />} />
        <Route path="/productList" element={<ProductList />} />
      </Routes>
    </Sidebar>
  );
}
=======
export default function AdminDashboard() {
  return <div>AdminDashboard</div>;
}
>>>>>>> Login
