import "../../assets/Styles/EditEmployeepopup.css";
// import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import pulsimage from "../../assets/Images/plus.png";
import AdminDashboardServices from "../../Service/AdminService/AdminDashboardServices";
import { Button, Box, Typography } from "@mui/material";
import checkimage1 from "../../assets/Images/cancelbutton.png";
const EditEmployeePopup = ({ isEditOpen, handleEditClose, employeeID }) => {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [employee, setEmployee] = useState({});
  const [empid, setempid] = useState("");
  const [role, setRoleName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [ReportingManagerid, setReportingManagerid] = useState("");
  const [ReportingManagerName, setReportingManagerName] = useState("");
  const [ReportingManagerEmail, setReportingManagerEmail] = useState("");
  const [namesList, setNamesList] = useState([]);
  const [Skills, setSkills] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    FeatchData();
  }, [employeeID]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const [values, setValues] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    dateOfJoining: "",
    employeeStatus: "",
    projectManager: "",
    role: "",
    skillSets: "",
  });
  const [errors, setErrors] = useState({
    employeeId: "",
    firstName: "",
    email: "",
    mobileNo: "",
    dateOfJoining: "",
    projectManager: "",
    role: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [status, setStatus] = useState("InActive");
  const handleChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
  };

  const FeatchData = async () => {
    var response = await AdminDashboardServices.fcngetEmployees();
    var getEmployeeResponse =
      await AdminDashboardServices.fcngetEmployeeDetails(employeeID);
    console.log(getEmployeeResponse, "EmployeeDetails");
    setRoleName(getEmployeeResponse.item.getRole.name);
    setempid(getEmployeeResponse.item.employee.employeeId);
    setReportingManagerName(
      `${getEmployeeResponse.item.reportingManager.firstName} ${getEmployeeResponse.item.reportingManager.lastName}`
    );
    setReportingManagerid(getEmployeeResponse.item.reportingManager.id);
    setReportingManagerEmail(getEmployeeResponse.item.reportingManager.email);
    setEmployee(getEmployeeResponse.item.employee);
    setSkills(getEmployeeResponse.item.getSkillsets);

    const Rolesresponse = await axios.get(
      "https://localhost:44305/api/Roles/AllRoles"
    );

    var rolesResult = Rolesresponse.data;
    setRoles(rolesResult);
    if (response.isSuccess) {
      setEmployees(response.item);
    }
  };
  const handleManagerOnChange = (event) => {
    const selectedManagerEmail = event.target.value;
    setReportingManagerEmail(selectedManagerEmail);

    // Find the selected manager from the employees array
    const selectedManager = employees.find(
      (emp) => emp.employee.email === selectedManagerEmail
    );

    if (selectedManager) {
      setReportingManagerid(selectedManager.employee.id);
      setReportingManagerName(
        `${selectedManager.employee.firstName} ${selectedManager.employee.lastName}`
      );
    }
  };

  const [ManagerName, setManagerName] = useState("");
  const [ManagerId, setManagerId] = useState("");
  const handleRoleOnChange = (event) => {
    const selectedRoleName = event.target.value;
    setRoleName(selectedRoleName);

    // Find the ID associated with the selected role name
    const selectedRole = roles.find((role) => role.name === selectedRoleName);
    setRoleId(selectedRole ? selectedRole.id : "");
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      employeeStatus: parseInt(value, 10),
    }));
  };
  const handleInputChange11 = (e) => {
    setName(e.target.value); // Update the name state
  };
  const addName = () => {
    if (name.trim() !== "") {
      setNamesList([...namesList, name]);
      setName("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addName();
    }
  };
  const cancleSkill = (e, index, skill) => {
    setNamesList((prevLanguages) =>
      prevLanguages.filter((item) => item.trim() !== skill)
    );
  };

  if (!isEditOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modalheader">
          <h2 className="employeeDetailsContent">Edit Employee Details</h2>
          <span className="cancelicon1">
            <i
              className="bi bi-x-lg"
              onClick={handleEditClose}
              style={{ cursor: "pointer" }}
            ></i>
          </span>
        </div>

        <div
          className="row  "
          style={{ marginTop: "20px", marginLeft: "7px", marginRight: "12px" }}
        >
          <div className="col-4">
            <TextField
              label="Employee ID"
              variant="outlined"
              name="employeeId"
              onChange={handleOnChange}
              value={employee.employeeId || ""}
              fullWidth
              select
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  "& fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black", // Desired color when focused
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  fontSize: "1rem",
                  transform: "translate(14px, -9px) scale(0.75)",
                },
                "& input::placeholder": {
                  fontSize: "12px",
                  color: "#AEAEAE",
                },
              }}
              // sx={{
              //   "& .MuiOutlinedInput-root": {
              //     fontSize: "12px",
              //     "& fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&:hover fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&.Mui-focused fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //   },
              //   "& .MuiInputLabel-root": {
              //     color: "#000000",
              //     fontSize: "12px",
              //     fontWeight: "600",
              //     transform: "translate(15px, 9px)",
              //     "&.Mui-focused": {
              //       color: "black",
              //     },
              //   },
              //   "& .MuiOutlinedInput-input": {
              //     height: "22px",
              //     padding: "8px 12px",
              //     fontSize: "12px",
              //   },
              //   "& .MuiInputLabel-shrink": {
              //     fontSize: "12px",
              //     transform: "translate(14px, -6px) scale(0.75)",
              //   },
              //   "& input::placeholder": {
              //     fontSize: "12px",
              //     color: "#AEAEAE",
              //   },
              // }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {employees && employees.length > 0 ? (
                employees.map((emp, index) => (
                  <MenuItem key={emp.id} value={emp.employee.employeeId}>
                    <span style={{ fontSize: "12px" }}>
                      {emp.employee.employeeId}
                    </span>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Employees Found</MenuItem>
              )}
            </TextField>
          </div>
          <div className="col-4">
            <TextField
              label="First Name"
              name="firstName"
              value={employee.firstName || ""}
              variant="outlined"
              onChange={handleInputChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "12px",
                  "& fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  // fontSize: "0.85rem",
                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black", // Desired color when focused
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  // fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  fontSize: "1rem",
                  transform: "translate(14px, -9px) scale(0.75)",
                },
                "& input::placeholder": {
                  fontSize: "12px",
                  color: "#AEAEAE",
                },
              }}
              // sx={{
              //   "& .MuiOutlinedInput-root": {
              //     fontSize: "12px",
              //     "& fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&:hover fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&.Mui-focused fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //   },
              //   "& .MuiInputLabel-root": {
              //     color: "#000000",
              //     fontSize: "12px",
              //     fontWeight: "600",
              //     transform: "translate(15px, 9px)",
              //     "&.Mui-focused": {
              //       color: "black", // Desired color when focused
              //     },
              //   },
              //   "& .MuiOutlinedInput-input": {
              //     height: "22px",
              //     padding: "8px 12px",
              //     fontSize: "12px",
              //   },
              //   "& .MuiInputLabel-shrink": {
              //     fontSize: "12px",
              //     transform: "translate(14px, -6px) scale(0.75)",
              //   },
              //   "& input::placeholder": {
              //     fontSize: "12px",
              //     color: "#AEAEAE",
              //   },
              // }}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Last Name"
              value={employee.lastName || ""}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "12px",
                  "& fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  // fontSize: "0.85rem",
                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black", // Desired color when focused
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  // fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  fontSize: "1rem",
                  transform: "translate(14px, -9px) scale(0.75)",
                },
                "& input::placeholder": {
                  fontSize: "12px",
                  color: "#AEAEAE",
                },
              }}
            />
          </div>
        </div>
        <div
          className="row  employeeUpdateSkills"
          style={{ marginTop: "20px", marginLeft: "7px", marginRight: "12px" }}
        >
          <div className="col-4">
            <TextField
              label="Email ID"
              value={employee.email || ""}
              onChange={handleInputChange}
              variant="outlined"
              name="email"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "12px",
                  "& fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  // fontSize: "0.85rem",
                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black", // Desired color when focused
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  // fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  fontSize: "1rem",
                  transform: "translate(14px, -9px) scale(0.75)",
                },
                "& input::placeholder": {
                  fontSize: "12px",
                  color: "#AEAEAE",
                },
              }}
              // sx={{
              //   "& .MuiOutlinedInput-root": {
              //     fontSize: "1rem",
              //     "& fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&:hover fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&.Mui-focused fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //   },
              //   "& .MuiInputLabel-root": {
              //     color: "#000000",
              //     fontSize: "0.85rem",
              //     fontWeight: "600",
              //     transform: "translate(15px, 9px)",
              //     "&.Mui-focused": {
              //       color: "black", // Desired color when focused
              //     },
              //   },
              //   "& .MuiOutlinedInput-input": {
              //     height: "22px",
              //     padding: "8px 12px",
              //     fontSize: "1rem",
              //   },
              //   "& .MuiInputLabel-shrink": {
              //     fontSize: "1rem",
              //     transform: "translate(14px, -6px) scale(0.75)",
              //   },
              //   "& input::placeholder": {
              //     fontSize: "12px",
              //     color: "#AEAEAE",
              //   },
              // }}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Mobile Number"
              variant="outlined"
              name="mobileNo"
              value={employee.mobileNo || ""}
              onChange={handleInputChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "12px",
                  "& fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  // fontSize: "0.85rem",
                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black", // Desired color when focused
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  // fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  fontSize: "1rem",
                  transform: "translate(14px, -9px) scale(0.75)",
                },
                "& input::placeholder": {
                  fontSize: "12px",
                  color: "#AEAEAE",
                },
              }}
              // sx={{
              //   "& .MuiOutlinedInput-root": {
              //     fontSize: "1rem",
              //     "& fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&:hover fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&.Mui-focused fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //   },
              //   "& .MuiInputLabel-root": {
              //     color: "#000000",
              //     fontSize: "0.85rem",
              //     fontWeight: "600",
              //     transform: "translate(15px, 9px)",
              //     "&.Mui-focused": {
              //       color: "black", // Desired color when focused
              //     },
              //   },
              //   "& .MuiOutlinedInput-input": {
              //     height: "22px",
              //     padding: "8px 12px",
              //     fontSize: "1rem",
              //   },
              //   "& .MuiInputLabel-shrink": {
              //     fontSize: "1rem",
              //     transform: "translate(14px, -6px) scale(0.75)",
              //   },
              //   "& input::placeholder": {
              //     fontSize: "12px",
              //     color: "#AEAEAE",
              //   },
              // }}
            />
          </div>
          <div className="col-4">
            <TextField
              label="Date of Joining"
              variant="outlined"
              type="date"
              name="dateOfJoining"
              value={
                employee.dateOfJoining
                  ? new Date(employee.dateOfJoining).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleOnChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "12px",
                  "& fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  // fontSize: "0.85rem",
                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black", // Desired color when focused
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  // fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  fontSize: "1rem",
                  transform: "translate(14px, -9px) scale(0.75)",
                },
                "& input::placeholder": {
                  fontSize: "12px",
                  color: "#AEAEAE",
                },
              }}
              // sx={{
              //   "& .MuiOutlinedInput-root": {
              //     fontSize: "1rem",
              //     "& fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&:hover fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&.Mui-focused fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //   },
              //   "& .MuiInputLabel-root": {
              //     color: "#000000",
              //     fontSize: "0.85rem",
              //     fontWeight: "600",
              //     transform: "translate(15px, 9px)",
              //     "&.Mui-focused": {
              //       color: "black", // Desired color when focused
              //     },
              //   },
              //   "& .MuiOutlinedInput-input": {
              //     height: "22px",
              //     padding: "8px 12px",
              //     fontSize: "1rem",
              //   },
              //   "& .MuiInputLabel-shrink": {
              //     fontSize: "1rem",
              //     transform: "translate(14px, -6px) scale(0.75)",
              //   },
              //   "& input::placeholder": {
              //     fontSize: "12px",
              //     color: "#AEAEAE",
              //   },
              // }}
            />
          </div>
        </div>
        <div
          className="row  employeeUpdateSkills"
          style={{ marginTop: "20px", marginLeft: "7px", marginRight: "12px" }}
        >
          <div className="col-4">
            <TextField
              label="Status"
              variant="outlined"
              name="employeeStatus"
              value={employee.employeeStatus || ""}
              className="row-checkbox "
              onChange={(e) => handleStatusChange(e)}
              fullWidth
              select
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "12px",
                  "& fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  // fontSize: "0.85rem",
                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black", // Desired color when focused
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  // fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  fontSize: "1rem",
                  transform: "translate(14px, -9px) scale(0.75)",
                },
                "& input::placeholder": {
                  fontSize: "12px",
                  color: "#AEAEAE",
                },
              }}
              // sx={{
              //   "& .MuiOutlinedInput-root": {
              //     fontSize: "12px",
              //     "& fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&:hover fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&.Mui-focused fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //   },
              //   "& .MuiInputLabel-root": {
              //     color: "#000000",
              //     fontSize: "12px",
              //     fontWeight: "600",
              //     transform: "translate(15px, 9px)",
              //     "&.Mui-focused": {
              //       color: "black",
              //     },
              //   },
              //   "& .MuiOutlinedInput-input": {
              //     height: "22px",
              //     padding: "8px 12px",
              //     fontSize: "1rem",
              //   },
              //   "& .MuiInputLabel-shrink": {
              //     fontSize: "12px",
              //     transform: "translate(14px, -6px) scale(0.75)",
              //   },
              //   "& input::placeholder": {
              //     fontSize: "12px",
              //     color: "#AEAEAE",
              //   },
              // }}
            >
              <MenuItem value={1} style={{ fontSize: "12px" }}>
                Active
              </MenuItem>
              <MenuItem value={0} style={{ fontSize: "12px" }}>
                InActive
              </MenuItem>
            </TextField>
          </div>
          <div className="col-4">
            <TextField
              label="Role"
              name="role"
              onChange={handleRoleOnChange}
              value={role}
              variant="outlined"
              fullWidth
              select
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "12px",
                  "& fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  // fontSize: "0.85rem",
                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black", // Desired color when focused
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  // fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  fontSize: "1rem",
                  transform: "translate(14px, -9px) scale(0.75)",
                },
                "& input::placeholder": {
                  fontSize: "12px",
                  color: "#AEAEAE",
                },
              }}
              // sx={{
              //   "& .MuiOutlinedInput-root": {
              //     fontSize: "1rem",
              //     "& fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&:hover fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&.Mui-focused fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //   },
              //   "& .MuiInputLabel-root": {
              //     color: "#000000",
              //     fontSize: "0.85rem",
              //     fontWeight: "600",
              //     transform: "translate(15px, 9px)",
              //     "&.Mui-focused": {
              //       color: "black", // Desired color when focused
              //     },
              //   },
              //   "& .MuiOutlinedInput-input": {
              //     height: "22px",
              //     padding: "8px 12px",
              //     fontSize: "1rem",
              //   },
              //   "& .MuiInputLabel-shrink": {
              //     fontSize: "1rem",
              //     transform: "translate(14px, -6px) scale(0.75)",
              //   },
              //   "& input::placeholder": {
              //     fontSize: "12px",
              //     color: "#AEAEAE",
              //   },
              // }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {roles && roles.length > 0 ? (
                roles.map((role, index) => (
                  <MenuItem key={role.id} value={role.name}>
                    <span style={{ fontSize: "12px" }}> {role.name}</span>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Employees Found</MenuItem>
              )}
            </TextField>
          </div>
          <div className="col-4">
            <TextField
              label="Reporting Manager"
              variant="outlined"
              onChange={handleManagerOnChange}
              value={ReportingManagerEmail || ""}
              // value={`${ReportingManagerName.firstName} ${ReportingManagerName.lastName}`}
              fullWidth
              select
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "12px",
                  "& fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  // fontSize: "0.85rem",
                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black", // Desired color when focused
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  // fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  fontSize: "1rem",
                  transform: "translate(14px, -9px) scale(0.75)",
                },
                "& input::placeholder": {
                  fontSize: "12px",
                  color: "#AEAEAE",
                },
              }}
              // sx={{
              //   "& .MuiOutlinedInput-root": {
              //     fontSize: "1rem",
              //     "& fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&:hover fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //     "&.Mui-focused fieldset": {
              //       border: "1px solid #DCDCDC",
              //     },
              //   },
              //   "& .MuiInputLabel-root": {
              //     color: "#000000",
              //     fontSize: "0.85rem",
              //     fontWeight: "600",
              //     transform: "translate(15px, 9px)",
              //     "&.Mui-focused": {
              //       color: "black", // Desired color when focused
              //     },
              //   },
              //   "& .MuiOutlinedInput-input": {
              //     height: "22px",
              //     padding: "8px 12px",
              //     fontSize: "1rem",
              //   },
              //   "& .MuiInputLabel-shrink": {
              //     fontSize: "1rem",
              //     transform: "translate(14px, -6px) scale(0.75)",
              //   },
              //   "& input::placeholder": {
              //     fontSize: "12px",
              //     color: "#AEAEAE",
              //   },
              // }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {employees && employees.length > 0 ? (
                employees.map((emp) => (
                  <MenuItem key={emp.employee.id} value={emp.employee.email}>
                    <span style={{ fontSize: "12px" }}>
                      {emp.employee.firstName} {emp.employee.lastName}
                    </span>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Employees Found</MenuItem>
              )}
            </TextField>
          </div>
        </div>
        <div
          className="row  employeeUpdateSkills"
          style={{ marginTop: "20px", marginLeft: "7px", marginRight: "12px" }}
        >
          <div
            className="col-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <TextField
                label="Add Skill"
                variant="outlined"
                value={name}
                onChange={handleInputChange11}
                onKeyPress={handleKeyPress} // Detect Enter key press
                fullWidth
                sx={{
                  width: "240px",
                  "& .MuiOutlinedInput-root": {
                    fontSize: "12px",
                    "& fieldset": {
                      border: "1px solid #DCDCDC",
                    },
                    "&:hover fieldset": {
                      border: "1px solid #DCDCDC",
                    },
                    "&.Mui-focused fieldset": {
                      border: "1px solid #DCDCDC",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#000000",
                    // fontSize: "0.85rem",
                    fontWeight: "500",
                    transform: "translate(15px, 9px)",
                    "&.Mui-focused": {
                      color: "black", // Desired color when focused
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    height: "22px",
                    padding: "8px 12px",
                    // fontSize: "1rem",
                  },
                  "& .MuiInputLabel-shrink": {
                    fontSize: "1rem",
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                  "& input::placeholder": {
                    fontSize: "12px",
                    color: "#AEAEAE",
                  },
                }}
              />
            </div>
            <div className="ms-2">
              <img
                src={pulsimage}
                alt=""
                width="35px"
                height="36px"
                onClick={addName}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="col-8">
            {/* <span
              style={{
                fontSize: "12px",
                margin: "0",
                padding: "0",
              }}
            >
              Skill Sets
            </span> */}
            <div
              className="skillsetdiv"
              style={{
                overflowY: "scroll",
                height: "70px",
                resize: "none",
                width: "100%",
                border: "1px solid #ccc",
                padding: "5px",
                // backgroundColor: "#f9f9f9",
                borderRadius: "4px",
                display: "flex",
              }}
            >
              {Skills.map((name, index) => (
                <div
                  key={index}
                  className="skillsetbox"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p
                    className="ms-2 mt-3  "
                    style={{ fontSize: "12px", width: "auto" }}
                  >
                    {name.skill}
                  </p>
                  <img
                    src={checkimage1}
                    alt=""
                    height="15px"
                    width="15px"
                    style={{ cursor: "pointer" }}
                    className="m-1"
                    onClick={(e) => cancleSkill(e, index, name)}
                  />
                </div>
              ))}
            </div>

            {/* <textarea
              disabled
              name=""
              id=""
              style={{
                overflowY: "scroll",
                height: "70px",
                resize: "none",
                width: "100%",
              }}
              value={Skills.map(skill => skill.skill).join(", ")}
            >

              <Box>
                {Skills.map((name, index) => (
                  <Box key={index} className="skillsetbox">
                    <Typography
                      className="skillsetitem "
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        //padding: "0px 0px 0px 5px",
                      }}
                    >
                      <p
                        className="ms-2"
                        style={{ fontSize: "12px", width: "auto" }}
                      >
                        {name.skill}
                      </p>
                      <p className="ms-2">
                        <img
                          src={checkimage1}
                          alt=""
                          className="me-2"
                          height="15px"
                          width="15px"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => cancleSkill(e, index, name)}
                        />
                      </p>
                    </Typography>
                  </Box>
                ))}
              </Box>
            </textarea> */}
            {/* <TextField
              variant="outlined"
              label="Skill Sets"
              //placeholder="Add Skills"
              multiline
              height="10px"
              disabled
              InputProps={{
                startAdornment: (
                  <Box
                    sx={{
                      display: "flex",
                      // flexWrap: "wrap",
                      gap: "5px", // Space between each name box
                      // marginTop: 2,
                    }}
                  >
                    {Skills.map((name, index) => (
                      <Box key={index} className="skillsetbox">
                        <Typography
                          className="skillsetitem "
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            //padding: "0px 0px 0px 5px",
                          }}
                        >
                          <p
                            className="ms-2"
                            style={{ fontSize: "12px", width: "auto" }}
                          >
                            {name.skill}
                          </p>
                          <p className="ms-2">
                            <img
                              src={checkimage1}
                              alt=""
                              className="me-2"
                              height="15px"
                              width="15px"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => cancleSkill(e, index, name)}
                            />
                          </p>
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ),
              }}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  height: "auto", // Sets max height for scrollable area
                  // overflowY: "auto", // Enables vertical scrolling within the box
                  // width: "100%",
                  // padding: "8px", // Add padding for better readability
                  fontSize: "1rem",
                  "& fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&:hover fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                  "&.Mui-focused fieldset": {
                    border: "1px solid #DCDCDC",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black", // Desired color when focused
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  fontSize: "12px",
                },
                "& .MuiInputLabel-shrink": {
                  fontSize: "1rem",
                  transform: "translate(14px, -6px) scale(0.75)",
                },
                "& input::placeholder": {
                  fontSize: "12px",
                  color: "#AEAEAE",
                },
              }}
            /> */}
          </div>
        </div>
        <div
          className=" row"
          style={{ marginTop: "20px", marginLeft: "7px", marginRight: "12px" }}
        >
          <div className="col-4">
            <button className="EditformSubmit">
              <span className="editformspan">Save</span>
            </button>
            <button className="EditformCancel ms-2" onClick={handleEditClose}>
              <span className="editformcacelspan">Cancel</span>
            </button>
          </div>
          <div className="col-8"></div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeePopup;
