import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Admin/Sidebar";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import Dashboard from "../Components/Dashboard";
import About from "../Components/Admin/Pages/About";
import Analytics from "../Components/Admin/Pages/Analytics";
import Comment from "../Components/Admin/Pages/Comment";
import Product from "../Components/Admin/Pages/Product";
import ProductList from "../Components/Admin/Pages/ProductList";

export default function DashboardRoutes() {
  return (
    <div>
      <Sidebar>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/About" element={<About />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Comment" element={<Comment />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/ProductList" element={<ProductList />} />
        </Routes>
      </Sidebar>
    </div>
  );
}
