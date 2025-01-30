import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Users/Login";
import ForgotPassword from "../Components/Users/ForgotPassword";
import VerifyOtp from "../Components/Users/VerifyOtp";
import CreateNewPassword from "../Components/Users/CreateNewPassword";

export default function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/VerifyOtp" element={<VerifyOtp />} />
      <Route path="/CreateNewPassword" element={<CreateNewPassword />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
