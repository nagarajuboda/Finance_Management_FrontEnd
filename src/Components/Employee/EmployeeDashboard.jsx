// import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
// import DashboardSidebar from "./DashboardSidebar";
// import Dashboard from "./DashboardPages/Dashboard";
// import Setting from "./DashboardPages/Setting";
// import Header from "./Header";

// export default function EmployeeDashboard() {
//   return (
//     <BrowserRouter>
//       <DashboardSidebar>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/Settings" element={<Setting />} />
//         </Routes>
//       </DashboardSidebar>
//     </BrowserRouter>
//   );
// }

import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import Dashboard from "./DashboardPages/Dashboard";
import Setting from "./DashboardPages/Setting";
import Header from "./Header";

export default function EmployeeDashboard() {
  return (
    <div className="dashboard-container" style={{ height: "100vh" }}>
      <Header />
      <DashboardSidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Settings" element={<Setting />} />
        </Routes>
      </div>
    </div>
  );
}
