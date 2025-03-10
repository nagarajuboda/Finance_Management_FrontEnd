import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  debugger;
  var token = localStorage.getItem("token");
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
