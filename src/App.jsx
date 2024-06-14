import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import DashboardRoutes from "./ManageRoutes/DashboardRoutes";
import EmployeeRoutes from "./ManageRoutes/EmployeeRoutes";
import AdminRoutes from "./ManageRoutes/AdminRoutes";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AdminDashboard />} />

        <Route path="/Employee" element={<EmployeeRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
