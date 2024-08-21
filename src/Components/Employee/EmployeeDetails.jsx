import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeModal from "./AddEmployeeModal";
import ConfirmationModal from "./DeleteConfirmationEmpModal";
import "../../assets/Styles/EmployeePages/EmployeeDetails.css";
import EmployeeService from "../../Service/EmployeeService/EmployeeService";
import { IoArrowBackCircle } from "react-icons/io5";
const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const [roles, setRoles] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(""); // new state to track action type
  const [projectManagerName, setProjectManagerName] = useState("NA");
  const [role, setRole] = useState({});
  const [projectManager, setProjectManager] = useState({});
  const [employeeProject, setEmployeeProject] = useState({});
  const [projectlength, setProjectLength] = useState([]);
  const [Response1, setResponse] = useState([]);
  const [Projects, setProjects] = useState({});
  const [client, setClient] = useState({});
  const [manager, setManager] = useState({});
  const navigate = useNavigate();
  const empId = localStorage.getItem("id");

  useEffect(() => {
    fetchEmployeeDetails(empId);
    fetchRoles();
  }, [empId]);

  const fetchEmployeeDetails = async (empId) => {
    try {
      // const response = await axios.get(
      //   `https://localhost:44305/api/Employees/GetEmployee?id=${empId}`
      // );
      var getemployee = await axios.get(
        `https://localhost:44305/api/Employees/GetEmployee?id=${empId}`
      );
      var result = getemployee.data.item;
      console.log(result, "---------->");

      setEmployee(result.employee);
      setRole(result.role);
      setManager(result.manager);
      const response = await EmployeeService.GetEmployeefcn(empId);
      setResponse(response.item);
      console.log(Response1, "response=============>");
      setProjectLength(response.item);
      response.item.forEach((obj) => {
        // setRole(obj.role);
        setProjectManager(obj.projectManager);
        setEmployeeProject(obj.employeeProject);
        setProjects(obj.project);
        setClient(obj.client);
      });
    } catch (error) {
      console.error(
        "Error fetching employee details",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchRoles = async () => {
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
  };

  const getRoleName = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    return role ? role.name : "Unknown Role";
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDeactivate = () => {
    setActionType("deactivate");
    setShowConfirmModal(true);
  };

  const handleActivate = () => {
    setActionType("activate");
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    setActionType("delete");
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    try {
      if (actionType === "deactivate" && employee) {
        await axios.put(
          `https://localhost:44305/api/Employees/UpdateEmployee`,
          { ...employee, employeeStatus: 0 }
        );
        navigate("/EmployeeDashboard");
      } else if (actionType === "activate" && employee) {
        await axios.put(
          `https://localhost:44305/api/Employees/UpdateEmployee`,
          { ...employee, employeeStatus: 1 }
        );
        navigate("/EmployeeDashboard");
      } else if (actionType === "delete" && employee) {
        await axios.delete(
          `https://localhost:44305/api/Employees/${employee.id}`
        );
        navigate("/EmployeeDashboard");
      }
      setShowConfirmModal(false);
    } catch (error) {
      console.error(
        `Error during ${actionType} operation`,
        error.response ? error.response.data : error.message
      );
    }
  };

  const cancelAction = () => {
    setShowConfirmModal(false);
    setActionType("");
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  const isInactive = employee.employeeStatus === 0;

  return (
    <div>
      <div className="d-flex">
        <IoArrowBackCircle
          style={{ cursor: "pointer", fontSize: "28px", color: "block" }}
          onClick={() => navigate("/EmployeeDashboard")}
        />
        <p style={{ fontSize: "20px" }} className="ms-1 ">
          Back
        </p>
      </div>
      <div
        className="EmployeeDetails card"
        style={{ margin: "0px", borderRadius: "0px" }}
      >
        <div>
          <p
            className="psDetails"
            style={{
              fontSize: "1.25rem",
              color: "#196e8a",
              fontFamily: " sans-serif",
              fontWeight: "700",
            }}
          >
            Employee Details
          </p>
        </div>
        <div className="">
          {/* <div className="d-flex">
            <p className="rowheader ">Employee Id:</p>
            <p className="ms-2">{employee.employeeId}</p>
          </div>
          <div className="row">
            <p className="rowheader col-2">Name :</p>
            <p className="ms-2 col-2">{`${employee.firstName} ${employee.lastName}`}</p>
          </div>
          <div className="d-flex">
            <p className="rowheader">Email:</p>
            <p className="ms-2">{employee.email}</p>
          </div>
          <div className="d-flex">
            <p className="rowheader">Mobile No:</p>
            <p className="ms-2">{employee.mobileNo}</p>
          </div>
          <div className="d-flex">
            <p className="rowheader">Date of Joining:</p>
            <p className="ms-2">
              {new Date(employee.dateOfJoining).toLocaleDateString("en-GB")}
            </p>
          </div>
          <div className="d-flex">
            <p className="rowheader">Status:</p>
            <p className="ms-2"> {isInactive ? "Inactive" : "Active"}</p>
          </div>
        </div>
        <div className="">
          <div className="col-2">
            <p className="rowheader">Role</p>
            <p>{role.name}</p>
          </div>
          <div className="col-2">
            <p className="rowheader">Manager </p>
            {manager == null ? (
              <p>NA</p>
            ) : (
              <p>{`${manager.firstName} ${manager.lastName}`}</p>
            )}
          </div>
          <div className="col-2">
            <p className="rowheader">Skills</p>
            <p>{employee.skillSets || "NA"}</p>
          </div> */}
          <div
            className="EmpActions"
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            {isInactive ? (
              <>
                <div className="d-flex me-5">
                  <button
                    className="me-5 btn btn-success"
                    onClick={handleActivate}
                  >
                    Activate
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <button className="me-5 btn btn-success" onClick={handleEdit}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={handleDeactivate}>
                    Deactivate
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="EmpDetailsContainer">
            <div className="EmpDetailsRow">
              <div className="EmpDetailsLabel">Employee ID:</div>
              <div className="EmpDetailsValue">{employee.employeeId}</div>
            </div>
            <div className="EmpDetailsRow">
              <div className="EmpDetailsLabel">First Name:</div>
              <div className="EmpDetailsValue">{employee.firstName}</div>
            </div>
            <div className="EmpDetailsRow">
              <div className="EmpDetailsLabel">Last Name:</div>
              <div className="EmpDetailsValue">{employee.lastName}</div>
            </div>
            <div className="EmpDetailsRow">
              <div className="EmpDetailsLabel">Email:</div>
              <div className="EmpDetailsValue">{employee.email}</div>
            </div>
            <div className="EmpDetailsRow">
              <div className="EmpDetailsLabel">Mobile No:</div>
              <div className="EmpDetailsValue">{employee.mobileNo}</div>
            </div>
            <div className="EmpDetailsRow">
              <div className="EmpDetailsLabel">Date of Joining:</div>
              <div className="EmpDetailsValue">
                {new Date(employee.dateOfJoining).toLocaleDateString("en-GB")}
              </div>
            </div>
            <div className="EmpDetailsRow">
              <div className="EmpDetailsLabel">Status:</div>
              <div className="EmpDetailsValue">
                {isInactive ? "Inactive" : "Active"}
              </div>
            </div>
            <div className="EmpDetailsRow">
              <div className="EmpDetailsLabel">Role:</div>
              <div className="EmpDetailsValue">
                {getRoleName(employee.roleId)}
              </div>
            </div>
            <div className="EmpDetailsRow">
              <div className="EmpDetailsLabel"> Manager:</div>
              <div className="EmpDetailsValue">
                {manager == null ? (
                  <p>NA</p>
                ) : (
                  <p>{`${manager.firstName} ${manager.lastName}`}</p>
                )}
              </div>
            </div>
            <div className="EmpDetailsRow">
              <div className="EmpDetailsLabel">Skills:</div>
              <div className="EmpDetailsValue">
                {employee.skillSets || "NA"}
              </div>
            </div>
          </div>
          <div className="">
            {showEditModal && (
              <EmployeeModal
                employee={employee}
                onClose={() => setShowEditModal(false)}
                onRefresh={() => fetchEmployeeDetails(empId)}
              />
            )}
            {showConfirmModal && (
              <ConfirmationModal
                message={`Are you sure you want to ${actionType} "${employee.firstName} ${employee.lastName}"?`}
                onConfirm={handleConfirm}
                onCancel={cancelAction}
              />
            )}
          </div>
        </div>
        {Response1.length > 0 ? (
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
                    <th>PROJECT NAME</th>
                    <th>CLIENT NAME</th>
                    <th>PROJECT MANAGER</th>
                    <th>FROM DATE</th>
                    <th>TO DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {Response1.map((obj) => (
                    <tr>
                      <td>{obj.project.projectName}</td>
                      <td>{obj.client.clientName}</td>
                      <td>{`${obj.projectManager.firstName} ${obj.projectManager.lastName}`}</td>
                      <td>
                        {new Date(
                          obj.employeeProject.assignedDate
                        ).toLocaleDateString("en-GB")}
                      </td>
                      <td>
                        {obj.employeeProject.isAssinged == true ? (
                          <p
                            class="large-dash"
                            style={{ fontSize: "30px", margin: "-16px 30px" }}
                          >
                            -
                          </p>
                        ) : (
                          new Date(
                            obj.employeeProject.deAssignedDate
                          ).toLocaleDateString("en-GB")
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="mt-4" style={{ textAlign: "center" }}></p>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
