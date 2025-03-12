import Dashboard from "../Components/Dashboard";
import About from "../Components/Admin/Pages/About";
import Sidebar from "../Components/Admin/Sidebar";
import Comment from "../Components/Admin/Pages/Comment";
import Product from "../Components/Admin/Pages/Product";
import ProductList from "../Components/Admin/Pages/ProductList";
import AllProjects from "../Components/Admin/Pages/AllProjects";
import AddProject from "../Components/Admin/Pages/AddProject";
import { ViewProject } from "../Components/Admin/ViewProject";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeDashboard from "../Components/Employee/EmployeeDashboard";
import Roles from "../Components/Employee/Roles";
import EmployeeDetails from "../Components/Employee/EmployeeDetails";
import Projects from "../Components/Employee/DashboardPages/Projects";
import ViewMangerProject from "../Components/Employee/DashboardPages/ViewProject";
import TimeSheet from "../Components/Employee/DashboardPages/TimeSheet";
import Profile from "../Components/Admin/Pages/Profile";
import AllEmployees from "../Components/Hr/Employees";
import GetAllRevenue from "../Components/IndianFinance/Revenue";
import UnderManagerEmployees from "../Components/Manager/UnderManagerEmployees";
import AddRevenue from "../Components/USFinance/AddRevenue";
import USFiNanceAllProjects from "../Components/USFinance/AllProjects";
import Employees from "../Components/Employee/Employees";
import AddEmployee from "../Components/Employee/AddEmployee";
import Projectss from "../Components/Admin/Pages/Projects";
import EditEmployeePopup from "../Components/Employee/EditEmployeePopup";
import UpdateProject from "../Components/Admin/Pages/UpdateProject";
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
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/comment" element={<Comment />} />
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard/AllProjects"
          element={
            <ProtectedRoute>
              <AllProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddProject"
          element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/All/Projects"
          element={
            <ProtectedRoute>
              <Projectss />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ViewProject"
          element={
            <ProtectedRoute>
              <ViewProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="/productList"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EmployeeDashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Roles"
          element={
            <ProtectedRoute>
              <Roles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EmployeeDetails"
          element={
            <ProtectedRoute>
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Employeeslist"
          element={
            <ProtectedRoute>
              <Employeess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/FinanceDashboard"
          element={
            <ProtectedRoute>
              <UsFinanceTeamDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ProjectManagerProjects"
          element={
            <ProtectedRoute>
              <ProjectManagerProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ManagerDasboard"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Employee/Projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Employee/ViewProject"
          element={
            <ProtectedRoute>
              <ViewMangerProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/EditEmployee"
          element={
            <ProtectedRoute>
              <EditEmployeePopup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UpdateProject"
          element={
            <ProtectedRoute>
              <UpdateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/TimeSheet"
          element={
            <ProtectedRoute>
              <TimeSheetModule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Employee/TimeSheet"
          element={
            <ProtectedRoute>
              <TimeSheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Dashboard/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/IndianFinance/Revenue"
          element={
            <ProtectedRoute>
              <GetAllRevenue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AddExpense"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />
        <Route
          path="/USFinance/AddRevenue"
          element={
            <ProtectedRoute>
              <AddRevenue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddEmployee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EmployeeList"
          element={
            <ProtectedRoute>
              <ListOfEmployees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <IndianFinanceTeamDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ProjectList"
          element={
            <ProtectedRoute>
              <ProjectsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/USFinanceTeamAllProjects"
          element={
            <ProtectedRoute>
              <USFinanceTeamAllProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/UnderManagerEmployees"
          element={
            <ProtectedRoute>
              <UnderManagerEmployees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/USFinance/UsFinaceALlProjects"
          element={
            <ProtectedRoute>
              <USFiNanceAllProjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AllEmployees"
          element={
            <ProtectedRoute>
              <AllEmployees />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Sidebar>
  );
}
