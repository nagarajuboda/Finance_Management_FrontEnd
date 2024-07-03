import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Users/Login";
import ForgotPassword from "../Components/Users/ForgotPassword";
import EmployeeDashboard from "../Components/Employee/EmployeeDashboard";
// import AdminDashboard from "../Components/Admin/AdminDashboard";

export default function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="dashboard/*" element={<EmployeeDashboard />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
