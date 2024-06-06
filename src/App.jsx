// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import EmployeeRoutes from "./ManageRoutes/EmployeeRoutes";
// import AdminRoutes from "./ManageRoutes/AdminRoutes";
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/*" element={<EmployeeRoutes />} />
//         <Route path="Archents/admin/*" element={<AdminRoutes />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeRoutes from "./ManageRoutes/EmployeeRoutes";
import AdminRoutes from "./ManageRoutes/AdminRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<EmployeeRoutes />} />
        <Route path="/Archents/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
