import AdminDashboard from "../Components/Admin/AdminDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
    </Routes>
  );
}
