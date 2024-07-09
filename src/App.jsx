<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import DashboardRoutes from "./ManageRoutes/DashboardRoutes";
import EmployeeRoutes from "./ManageRoutes/EmployeeRoutes";
import AdminRoutes from "./ManageRoutes/AdminRoutes";
=======

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeRoutes from "./ManageRoutes/EmployeeRoutes";
import AdminRoutes from "./ManageRoutes/AdminRoutes";

>>>>>>> Login
function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/*" element={<AdminDashboard />} />

        <Route path="/Employee" element={<EmployeeRoutes />} />
=======
        <Route path="/*" element={<EmployeeRoutes />} />
        <Route path="/Archents/admin/*" element={<AdminRoutes />} />
>>>>>>> Login
      </Routes>
    </Router>
  );
}

export default App;
