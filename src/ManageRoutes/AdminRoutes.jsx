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
