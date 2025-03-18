import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeRoutes from "./ManageRoutes/EmployeeRoutes";
import AdminRoutes from "./ManageRoutes/AdminRoutes";
import ProtectedRoute from "./ManageRoutes/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/*" element={<EmployeeRoutes />} />
        <Route path="/*" element={<EmployeeRoutes />} />

        <Route path="/dashboard/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
