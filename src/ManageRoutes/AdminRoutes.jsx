import Sidebar from "../Components/Admin/Sidebar";
import AllProjects from "../Components/Admin/Pages/AllProjects";
import AddProject from "../Components/Admin/Pages/AddProject";
import { ViewProject } from "../Components/Admin/ViewProject";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Roles from "../Components/Employee/Roles";
import EmployeeDetails from "../Components/Employee/EmployeeDetails";
import ViewMangerProject from "../Components/Employee/DashboardPages/ViewProject";
import TimeSheet from "../Components/Employee/DashboardPages/TimeSheet";
import Profile from "../Components/Admin/Pages/Profile";
import GetAllRevenue from "../Components/IndianFinance/Revenue";
import AddRevenue from "../Components/USFinance/AddRevenue";
import USFiNanceAllProjects from "../Components/USFinance/AllProjects";
import Employees from "../Components/Employee/Employees";
import AddEmployee from "../Components/Employee/AddEmployee";
import Projectss from "../Components/Admin/Pages/Projects";
import EditEmployeePopup from "../Components/Employee/EditEmployeePopup";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import Employeess from "../Components/Manager/Employees";
import ManagerDashboard from "../Components/Manager/ManagerDashboard";
import ProjectManagerProjects from "../Components/Manager/ProjectManagerProjects";
import TimeSheetModule from "../Components/Manager/TimeSheet";
import UsFinanceTeamDashboard from "../Components/USFinance/Dashboard";
import USFinanceTeamAllProjects from "../Components/USFinance/AllProjects";
import Notifications from "../Components/Admin/Notifications";
import IndianFinanceTeamDashboard from "../Components/IndianFinance/Dashboard";
import ListOfEmployees from "../Components/IndianFinance/ListOfEmployees";
import ProjectsList from "../Components/IndianFinance/Projects";
import AddExpense from "../Components/IndianFinance/AddExpense";
import ProtectedRoute from "./ProtectedRoute";
export default function AdminRoutes() {
  const sessionData = localStorage.getItem("sessionData");
  const userDetails = sessionData ? JSON.parse(sessionData) : null;
  return (
    <div>
      {userDetails.employee.role.name === "Admin" && (
        <ProtectedRoute>
          <Sidebar>
            <Routes>
              <Route path="/AdminDashboard" element={<AdminDashboard />} />
              <Route path="/Dashboard/AllProjects" element={<AllProjects />} />
              <Route path="/AddProject" element={<AddProject />} />
              <Route path="/All/Projects" element={<Projectss />} />
              <Route path="/ViewProject" element={<ViewProject />} />
              <Route path="/Roles" element={<Roles />} />
              <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
              <Route path="/Employeeslist" element={<Employeess />} />
              <Route
                path="/FinanceDashboard"
                element={<UsFinanceTeamDashboard />}
              />
              <Route
                path="/ProjectManagerProjects"
                element={<ProjectManagerProjects />}
              />
              <Route path="/ManagerDasboard" element={<ManagerDashboard />} />
              <Route
                path="/Employee/ViewProject"
                element={<ViewMangerProject />}
              />
              <Route path="/EditEmployee" element={<EditEmployeePopup />} />
              <Route path="/TimeSheet" element={<TimeSheetModule />} />
              <Route path="/Employee/TimeSheet" element={<TimeSheet />} />
              <Route path="/Dashboard/Profile" element={<Profile />} />
              <Route
                path="/IndianFinance/Revenue"
                element={<GetAllRevenue />}
              />
              <Route path="/AddExpense" element={<AddExpense />} />
              <Route path="/USFinance/AddRevenue" element={<AddRevenue />} />
              <Route path="/Employees" element={<Employees />} />
              <Route path="/AddEmployee" element={<AddEmployee />} />
              <Route path="/Notifications" element={<Notifications />} />
              <Route path="/EmployeeList" element={<ListOfEmployees />} />
              <Route
                path="/Dashboard"
                element={<IndianFinanceTeamDashboard />}
              />
              <Route path="/ProjectList" element={<ProjectsList />} />
              <Route
                path="/USFinanceTeamAllProjects"
                element={<USFinanceTeamAllProjects />}
              />
              <Route
                path="/USFinance/UsFinaceALlProjects"
                element={<USFiNanceAllProjects />}
              />
            </Routes>
          </Sidebar>
        </ProtectedRoute>
      )}
    </div>
  );
}
