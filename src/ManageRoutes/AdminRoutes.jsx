import Dashboard from "../Components/Dashboard";
import About from "../Components/Admin/Pages/About";
import Sidebar from "../Components/Admin/Sidebar";
import Comment from "../Components/Admin/Pages/Comment";
import Product from "../Components/Admin/Pages/Product";
import ProductList from "../Components/Admin/Pages/ProductList";
import AllProjects from "../Components/Admin/Pages/AllProjects";
import AddProject from "../Components/Admin/Pages/AddProject";
import { ViewProject } from "../Components/Admin/ViewProject";
import { Route, Routes } from "react-router-dom";
export default function AdminRoutes() {
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/AdminDashboard" element={<Dashboard />} />
        <Route path="/Dashboard/AllProjects" element={<AllProjects />} />
        <Route path="/Dashboard/AddProject" element={<AddProject />} />
        <Route path="/Dashboard/ViewProject" element={<ViewProject />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productList" element={<ProductList />} />
      </Routes>
    </Sidebar>
  );
}
