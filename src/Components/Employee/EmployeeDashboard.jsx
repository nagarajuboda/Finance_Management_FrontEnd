import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import EmployeeModal from "./AddEmployeeModal";
import ConfirmationModal from "./DeleteConfirmationEmpModal";
import "../../assets/Styles/EmployeePages/EmployeeDashboard.css";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

import { post } from "jquery";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);
  const [inactiveEmployees, setInactiveEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [AllEmployees, setAllEmployees] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "employeeId",
    direction: "asc",
  });
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employeeToDeactivate, setEmployeeToDeactivate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showInactive, setShowInactive] = useState(false);
  const [messagefromchild, setMessageFormChild] = useState("");
  const [selectedfile, setSelectedFile] = useState(null);
  const [existvalues, setExsitValue] = useState([]);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchEmployees();
    fetchRoles();
  }, [0]);

  useEffect(() => {
    successMesage();
  }, [messagefromchild]);
  useEffect(() => {
    setCurrentPage(1);
  }, [showInactive]);
  const successMesage = () => {
    if (messagefromchild) {
      toast.success(messagefromchild, {
        position: "top-right",
        autoClose: "4000",
      });
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44305/api/Employees/AllEmployees"
      );
      setAllEmployees(response.data);
      const employeesData = response.data;
      console.log(employeesData, "employee data");
      setEmployees(employeesData.filter((emp) => emp.employeeStatus === 1));
      setInactiveEmployees(
        employeesData.filter((emp) => emp.employeeStatus === 0)
      );

      const rolesResponse = await axios.get(
        "https://localhost:44305/api/Roles/AllRoles"
      );
      setRoles(rolesResponse.data);

      const projectManagerRole = rolesResponse.data.find(
        (role) => role.name === "Project Manager"
      );
      if (projectManagerRole) {
        const managers = employeesData.filter(
          (emp) => emp.roleId === projectManagerRole.id
        );
        setProjectManagers(managers);
      }
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44305/api/Roles/AllRoles"
      );
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles", error);
    }
  };

  const getRoleName = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : "Unknown Role";
  };

  const getProjectManagerName = (projectManagerId) => {
    const projectManager = AllEmployees.find(
      (emp) => emp.id === projectManagerId
    );
    return projectManager
      ? `${projectManager.firstName} ${projectManager.lastName}`
      : "--";
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleDeactivate = (employee) => {
    setEmployeeToDeactivate(employee);
    setShowConfirmModal(true);
  };

  const confirmDeactivate = async () => {
    try {
      if (employeeToDeactivate) {
        await axios.put(
          `https://localhost:44305/api/Employees/UpdateEmployee`,
          { ...employeeToDeactivate, employeeStatus: 0 }
        );
        fetchEmployees();
      }
      setShowConfirmModal(false);
      setEmployeeToDeactivate(null);
    } catch (error) {
      console.error("Error deactivating employee", error);
    }
  };

  const cancelDeactivate = () => {
    setShowConfirmModal(false);
    setEmployeeToDeactivate(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [
    ...(showInactive ? inactiveEmployees : employees),
  ].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredEmployees = sortedEmployees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHeaderClass = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "sorted-asc" : "sorted-desc";
    }
    return "";
  };

  const handleRowClick = (employeeId) => {
    localStorage.setItem("id", employeeId);
    navigate("/EmployeeDetails");
  };

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const displayedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(event);
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const InsertbulkDate = async (e) => {
    e.preventDefault();
    if (!selectedfile) {
      alert("please select ex sheet");
    }
    const formData = new FormData();
    formData.append("file", selectedfile);
    const response = await axios.post(
      "https://localhost:44305/api/Employees/BulkInsert",
      formData
    );
    var result = response.data;
    debugger;
    if (result.item.item2 == false) {
      debugger;
      // fileInputRef.current.value = null;
      setAllEmployees(result.item.item1);
      setEmployees(result.item.item1.filter((emp) => emp.employeeStatus === 1));
      setInactiveEmployees(
        result.item.item1.filter((emp) => emp.employeeStatus === 0)
      );
      fetchEmployees();
      Swal.fire({
        title: "Good job!",
        text: "Data inserted successfully done ...",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      let vlauesss = [];
      var emails = result.item.item1.map((obj) => obj.email);
      var ids = result.item.item1.map((obj) => obj.employeeId);
      console.log(result.item.item1, "======>");
      vlauesss.push(...emails); // Spread the emails array into vlauesss
      vlauesss.push(...ids); // Spread the ids array into vlauesss
      //setExsitValue(emails);

      Swal.fire({
        title: "Error!",
        text: vlauesss,
        //text: result.message || "Something went wrong while adding the project",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  return (
    <div className="EmployeeDashboard">
      <div className="EmpHeader">
        <div className="EmpHeaderLeft">
          <h1>Employee List</h1>
          <form onSubmit={InsertbulkDate}>
            <div style={{ justifyContent: "end" }}>
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                placeholder="please select Excel sheet"
              />
              <button className="btn btn-success">Add</button>
            </div>
          </form>
        </div>
        <div className="EmpHeaderRight">
          <input
            type="EmpSearchtxt"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="EmpSearchTxt"
          />
          <label className="EmpInactiveBtn">
            <input
              type="checkbox"
              className="EmpCheckbox"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
            Inactive Employees
          </label>
          <button
            className="EmpAddBtn"
            onClick={() => {
              setCurrentEmployee(null);
              setShowModal(true);
            }}
          >
            Add Employee
          </button>
        </div>
      </div>
      <div className="EmpDashboardContainer">
        <table className="EmpDashboardTbl">
          <thead>
            <tr>
              <th
                className={getHeaderClass("employeeId")}
                onClick={() => handleSort("employeeId")}
              >
                Employee Id
              </th>
              <th
                className={getHeaderClass("firstName")}
                onClick={() => handleSort("firstName")}
              >
                Name
              </th>

              <th
                className={getHeaderClass("email")}
                onClick={() => handleSort("email")}
              >
                Email
              </th>
              <th
                className={getHeaderClass("mobileNo")}
                onClick={() => handleSort("mobileNo")}
              >
                Mobile No
              </th>
              <th
                className={getHeaderClass("dateOfJoining")}
                onClick={() => handleSort("dateOfJoining")}
              >
                Date of Joining
              </th>
              <th>Status</th>
              <th
                className={getHeaderClass("roleId")}
                onClick={() => handleSort("roleId")}
              >
                Role
              </th>
              <th>Reporting Manager</th>
            </tr>
          </thead>
          <tbody>
            {displayedEmployees.length > 0 ? (
              displayedEmployees.map((employee) => (
                <tr
                  key={employee.employeeId}
                  onClick={() => handleRowClick(employee.id)}
                  className="clickable-row"
                >
                  <td>{employee.employeeId}</td>
                  <td>{`${employee.firstName} ${employee.lastName}`}</td>

                  <td>{employee.email}</td>
                  <td>{employee.mobileNo}</td>
                  <td>
                    {new Date(employee.dateOfJoining).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>
                  <td>
                    {employee.employeeStatus === 1 ? "Active" : "Inactive"}
                  </td>
                  <td>{getRoleName(employee.roleId)}</td>
                  <td>{getProjectManagerName(employee.projectManagerId)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="EmpDashboardNoEmp">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {showModal && (
          <div>
            <EmployeeModal
              prfref={profileRef}
              successMessage={setMessageFormChild}
              className="profile-popup"
              employee={currentEmployee}
              onClose={() => setShowModal(false)}
              onRefresh={fetchEmployees}
            />
          </div>
        )}

        {/* {showModal && (
          <div>
            <EmployeeModal
              className="addemployeeComponent"
              employee={currentEmployee}
              onClose={() => setShowModal(false)}
              onRefresh={fetchEmployees}
            />
          </div>
        )} */}

        {showConfirmModal && (
          <ConfirmationModal
            onConfirm={confirmDeactivate}
            onCancel={cancelDeactivate}
            employeeName={
              employeeToDeactivate
                ? `${employeeToDeactivate.firstName} ${employeeToDeactivate.lastName}`
                : ""
            }
          />
        )}
      </div>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  return (
    <div className="EmpDashPagination">
      <button
        className={`EmpPaginationArrow ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        &larr;
      </button>
      <span className="EmpPaginationInfo">
        {currentPage} of {totalPages}
      </span>
      <button
        className={`EmpPaginationArrow ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        &rarr;
      </button>
    </div>
  );
};

export default EmployeeDashboard;
