<<<<<<< HEAD
import AdminDashboard from "../Components/Admin/AdminDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="Dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
=======
// import { Route, Routes } from "react-router-dom";
// import AdminDashboard from "../Components/Admin/AdminDashboard";
// export default function AdminRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<AdminDashboard />} />
//     </Routes>
//   );
// }

import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../Components/Admin/AdminDashboard";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
    </Routes>
  );
}
>>>>>>> Login
