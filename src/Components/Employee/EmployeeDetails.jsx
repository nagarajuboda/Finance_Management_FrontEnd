import axios from "axios";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeModal from "./AddEmployeeModal";
import ConfirmationModal from "./DeleteConfirmationEmpModal";
import ManagedEmployeesModal from "./ManagedEmployeesModal";
import "../../assets/Styles/EmployeePages/EmployeeDetails.css";
import { IoArrowBackCircle } from "react-icons/io5";
import EmployeeService from "../../Service/EmployeeService/EmployeeService";
import { Today } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [messagefromchild, setMessageFormChild] = useState("");
  const [roles, setRoles] = useState([]);
  const [managedEmployees, setManagedEmployees] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showManagedEmployeesModal, setShowManagedEmployeesModal] =
    useState(false);
  const [actionType, setActionType] = useState("");
  const [projectManagerName, setProjectManagerName] = useState("NA");
  const navigate = useNavigate();
  const empId = localStorage.getItem("id");
  const [projectManager, setProjectManager] = useState({});
  const [employeeProject, setEmployeeProject] = useState({});
  const [Projects, setProjects] = useState({});
  const [client, setClient] = useState({});
  const [projectlength, setProjectLength] = useState([]);
  const [Response1, setResponse] = useState([]);
  const [employeeTracking, setemployeeTracking] = useState([]);
  const profileRef = useRef(null);
  useEffect(() => {
    fetchEmployeeDetails(empId);
    fetchRoles();
  }, [empId]);
  useEffect(() => {
    successMesage();
  }, [messagefromchild]);

  const successMesage = () => {
    if (messagefromchild) {
      toast.success(messagefromchild, {
        position: "top-right",
        autoClose: "4000",
      });
    }
  };
  console.log(messagefromchild, "=======>in employee Details");
  const fetchEmployeeDetails = useCallback(
    async (empId) => {
      try {
        const response = await axios.get(
          `https://localhost:44305/api/Employees/GetEmployee?id=${empId}`
        );
        const GetProjectsResponse = await EmployeeService.GetEmployeefcn(empId);
        setemployeeTracking(GetProjectsResponse);

        const employeeData = response.data;
        setEmployee(employeeData);
        if (employeeData.projectManagerId) {
          const pmResponse = await axios.get(
            `https://localhost:44305/api/Employees/GetEmployee?id=${employeeData.projectManagerId}`
          );
          setProjectManagerName(
            `${pmResponse.data.firstName} ${pmResponse.data.lastName}`
          );
        } else {
          setProjectManagerName("NA");
        }

        // Fetch all employees to check if this employee manages anyone
        const allEmployeesResponse = await axios.get(
          `https://localhost:44305/api/Employees/AllEmployees`
        );
        const allEmployees = allEmployeesResponse.data;
        const managed = allEmployees.filter(
          (emp) => emp.projectManagerId === employeeData.id
        );
        setManagedEmployees(managed);
      } catch (error) {
        console.error(
          "Error fetching employee details",
          error.response ? error.response.data : error.message
        );
      }
    },
    [empId]
  );

  const fetchRoles = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://localhost:44305/api/Roles/AllRoles"
      );
      setRoles(response.data);
    } catch (error) {
      console.error(
        "Error fetching roles",
        error.response ? error.response.data : error.message
      );
    }
  }, []);

  const getRoleName = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : "Unknown Role";
  };

  const handleEdit = () => setShowEditModal(true);

  const handleDeactivate = () => {
    if (
      getRoleName(employee.roleId) === "Project Manager" &&
      managedEmployees.length > 0
    ) {
      setShowManagedEmployeesModal(true);
    } else {
      setActionType("deactivate");
      setShowConfirmModal(true);
    }
  };

  const handleActivate = () => {
    setActionType("activate");
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    if (
      getRoleName(employee.roleId) === "Project Manager" &&
      managedEmployees.length > 0
    ) {
      setShowManagedEmployeesModal(true);
    } else {
      setActionType("delete");
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = async () => {
    try {
      if (actionType === "deactivate" && employee) {
        await axios.put(
          `https://localhost:44305/api/Employees/UpdateEmployee`,
          { ...employee, employeeStatus: 0 }
        );
      } else if (actionType === "activate" && employee) {
        await axios.put(
          `https://localhost:44305/api/Employees/UpdateEmployee`,
          { ...employee, employeeStatus: 1 }
        );
      } else if (actionType === "delete" && employee) {
        await axios.delete(
          `https://localhost:44305/api/Employees/${employee.id}`
        );
      }
      navigate("/EmployeeDashboard");
      setShowConfirmModal(false);
    } catch (error) {
      console.error(
        `Error during ${actionType} operation`,
        error.response ? error.response.data : error.message
      );
    }
  };
  function backonclick(e) {
    e.preventDefault();
    navigate("/EmployeeDashboard");
  }
  const cancelAction = () => {
    setShowConfirmModal(false);
    setActionType("");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(event);
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowEditModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (!employee) return <div>Loading...</div>;

  const isInactive = employee.employeeStatus === 0;

  return (
    <div className="">
      <div className="d-flex"></div>
      <div className="EmployeeDetails card" style={{ borderRadius: "0px" }}>
        <div className="EmpDetailsHeader">
          <div className="d-flex">
            <IoArrowBackCircle
              style={{ cursor: "pointer", fontSize: "28px", color: "black" }}
              onClick={backonclick}
            />

            <p style={{ fontSize: "1.25rem" }} className="ms-1">
              Employee Details
            </p>
          </div>
          <div className="EmpActions mb-4">
            {isInactive ? (
              <>
                <button className="EmpActivateBtn" onClick={handleActivate}>
                  Activate
                </button>
                <button className="EmpDeleteBtn" onClick={handleDelete}>
                  Delete
                </button>
              </>
            ) : (
              <>
                <button className="EmpEditBtn" onClick={handleEdit}>
                  Edit
                </button>
                <button
                  className="EmpDeactivateBtn me-2"
                  onClick={handleDeactivate}
                >
                  Deactivate
                </button>
              </>
            )}
          </div>
        </div>
        <div className="EmpDetailsContainer">
          {Object.entries({
            "Employee ID": employee.employeeId,
            Name: `${employee.firstName} ${employee.lastName}`,
            Email: employee.email,
            "Mobile No": employee.mobileNo,
            "Date of Joining": new Date(
              employee.dateOfJoining
            ).toLocaleDateString("en-GB"),
            Status: isInactive ? "Inactive" : "Active",
            Role: getRoleName(employee.roleId),
            "Reporting Manager": projectManagerName,
            Skills: employee.skillSets || "--",
          }).map(([label, value]) => (
            <div className="EmpDetailsRow" key={label}>
              <div className="EmpDetailsLabel">{label}:</div>
              <div className="EmpDetailsValue">{value}</div>
            </div>
          ))}
        </div>

        {showEditModal && (
          <div>
            <EmployeeModal
              prfref={profileRef}
              className="profile-popup"
              successMessage={setMessageFormChild}
              employee={employee}
              onClose={() => setShowEditModal(false)}
              onRefresh={() => fetchEmployeeDetails(empId)}
            />
          </div>
        )}
        {showConfirmModal && (
          <ConfirmationModal
            message={`Are you sure you want to ${actionType} "${employee.firstName} ${employee.lastName}"?`}
            onConfirm={handleConfirm}
            onCancel={cancelAction}
          />
        )}
        {showManagedEmployeesModal && (
          <ManagedEmployeesModal
            employees={managedEmployees}
            managerName={`${employee.firstName} ${employee.lastName}`}
            onClose={() => setShowManagedEmployeesModal(false)}
            deactivatingEmployeeName={`${employee.firstName} ${employee.lastName}`}
          />
        )}
        {/* from this logic added by nagaraju */}
        <div>
          <div>
            <div className="mt-5">
              <p
                className="psDetails"
                style={{
                  fontSize: "1.25rem",
                  color: "#196e8a",
                  fontFamily: "sans-serif",
                  fontWeight: "700",
                }}
              >
                PROJECTS
              </p>
            </div>
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                      PROJECT NAME
                    </th>
                    <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                      CLIENT NAME
                    </th>
                    <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                      PROJECT MANAGER
                    </th>
                    <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                      FROM DATE (dd/mm/yyyy)
                    </th>
                    <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                      TO DATE (dd/mm/yyyy)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employeeTracking.item.map((obj, index) => {
                    // Split the period into fromDate and toDate
                    const dates = obj.period.split(" to ");
                    const fromDate = dates[0];
                    const toDate = dates[1];
                    return obj.bench === true ? (
                      <tr key={index}>
                        <td>
                          <p>Bench</p>
                        </td>
                        <td>
                          <p
                            className="ms-4"
                            style={{
                              fontWeight: "800",
                              margin: "0",
                            }}
                          >
                            --
                          </p>
                        </td>
                        <td>
                          <p
                            className="ms-4"
                            style={{
                              fontWeight: "800",
                              margin: "0",
                            }}
                          >
                            --
                          </p>
                        </td>
                        <td style={{ textAlign: "center" }}> {fromDate}</td>
                        <td style={{ textAlign: "center" }}> {toDate}</td>
                      </tr>
                    ) : (
                      <tr key={index}>
                        <td>{obj.project.projectName}</td>
                        <td>{obj.client.clientName}</td>
                        <td>
                          {obj.projectManager.firstName}{" "}
                          {obj.projectManager.lastName}
                        </td>
                        <td style={{ textAlign: "center" }}>{fromDate}</td>
                        {toDate == "present" ? (
                          <td style={{ fontSize: "1.25rem" }}>
                            {
                              <p
                                style={{
                                  fontWeight: "800",
                                  margin: "0",
                                  textAlign: "center",
                                }}
                              >
                                --
                              </p>
                            }
                          </td>
                        ) : (
                          <td style={{ textAlign: "center" }}>{toDate}</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
};

export default EmployeeDetails;
