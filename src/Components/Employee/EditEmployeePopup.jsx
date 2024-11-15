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
  // const [ReportingManagerid, setReportingManagerid] = useState("");
  const [ReportingManagerId, setReportingManagerId] = useState("");
  const [ReportingManagerName, setReportingManagerName] = useState("");
  const [ReportingManagerEmail, setReportingManagerEmail] = useState("");
  const [namesList, setNamesList] = useState([]);
  const [Skills, setSkills] = useState([]);
  const [employeelist, setEmployeelist] = useState([]);
  const [employeeData, setEmployeeData] = useState({});
  const [roleList, setRoleList] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    FeatchData();
  }, [employeeID]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
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
    setEmployeeData((prevValues) => ({
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
    const Rolesresponse = await axios.get(
      "https://localhost:44305/api/Roles/AllRoles"
    );

    var rolesResult = Rolesresponse.data;
    setRoleList(rolesResult);

    // if (response.isSuccess) {
    //   setEmployees(response.item);
    // }
    setEmployeelist(response.item);
    var getEmployeeResponse =
      await AdminDashboardServices.fcngetEmployeeDetails(employeeID);
    setEmployeeData(getEmployeeResponse.item.employee);
    setRoleName(getEmployeeResponse.item.getRole.name);
    setRoleId(getEmployeeResponse.item.getRole.id);
    setempid(getEmployeeResponse.item.employee.employeeId);
    console.log(getEmployeeResponse, "getemployee response");
    setReportingManagerName(
      getEmployeeResponse.item.reportingManager
        ? `${getEmployeeResponse.item.reportingManager.firstName || ""} ${
            getEmployeeResponse.item.reportingManager.lastName || ""
          }`.trim()
        : "NA"
    );
    // setReportingManagerId(
    //   getEmployeeResponse.item.reportingManager
    //     ? getEmployeeResponse.item.reportingManager.id
    //     : "NA"
    // );

    // setReportingManagerid(getEmployeeResponse.item.reportingManager.id);
    // setReportingManagerEmail(
    //   getEmployeeResponse.item.reportingManager
    //     ? `${getEmployeeResponse.item.reportingManager.email || ""} ${
    //         getEmployeeResponse.item.reportingManager.email || ""
    //       }`.trim()
    //     : "NA"
    // );
    setEmployee(getEmployeeResponse.item.employee);
    setNamesList(getEmployeeResponse.item.getSkillsets);
  };

  // const handleManagerOnChange = (event) => {
  //   const selectedManagerEmail = event.target.value;
  //   setReportingManagerEmail(selectedManagerEmail);
  //   const selectedManager = employees.find(
  //     (emp) => emp.employee.email === selectedManagerEmail
  //   );

  //   if (selectedManager) {
  //     setReportingManagerid(selectedManager.employee.id);
  //     setReportingManagerName(
  //       `${selectedManager.employee.firstName} ${selectedManager.employee.lastName}`
  //     );
  //   }
  // };
  const handleRoleOnChange = (event) => {
    const selectedRoleName = event.target.value;

    setRoleId(selectedRoleName);
  };
  const handleStatusChange = (e) => {
    const { value } = e.target;
    setEmployeeData((prevEmployee) => ({
      ...prevEmployee,
      employeeStatus: parseInt(value, 10),
    }));
  };

  const handleInputChange11 = (e) => {
    setName(e.target.value);
  };
  const addName = () => {
    if (name.trim() !== "") {
      setNamesList([...namesList, { skill: name }]);
      setName("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addName();
    }
  };

  const cancleSkill = (e, index) => {
    setNamesList((prevNamesList) =>
      prevNamesList.filter((_, i) => i !== index)
    );
  };
  const handleManagerOnChange = (event) => {
    const selectedId = event.target.value;
    setReportingManagerId(selectedId);
    const selectedEmployee = employeelist.find(
      (emp) => emp.employee.id === selectedId
    );
    if (selectedEmployee) {
      setReportingManagerName(
        `${selectedEmployee.employee.firstName} ${selectedEmployee.employee.lastName}`
      );
    } else {
      setReportingManagerName("NA");
    }
  };
  console.log(employeeData.employeeStatus, "status");

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
              value={employeeData.employeeId || ""}
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
                    color: "black",
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
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {employeelist && employeelist.length > 0 ? (
                employeelist.map((emp, index) => (
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
              value={employeeData.firstName || ""}
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

                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
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
          <div className="col-4">
            <TextField
              label="Last Name"
              name="lastName"
              value={employeeData.lastName || ""}
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
              value={employeeData.email || ""}
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

                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
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
          <div className="col-4">
            <TextField
              label="Mobile Number"
              variant="outlined"
              name="mobileNo"
              value={employeeData.mobileNo || ""}
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

                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
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
          <div className="col-4">
            <TextField
              label="Date of Joining"
              variant="outlined"
              type="date"
              name="dateOfJoining"
              value={
                employeeData.dateOfJoining
                  ? new Date(employeeData.dateOfJoining)
                      .toISOString()
                      .split("T")[0]
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

                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
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
              label="Status"
              variant="outlined"
              name="employeeStatus"
              value={employeeData.employeeStatus || ""}
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

                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
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
              value={roleId}
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

                  fontWeight: "500",
                  transform: "translate(15px, 9px)",
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
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
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {roleList && roleList.length > 0 ? (
                roleList.map((role, index) => (
                  <MenuItem key={role.id} value={role.id}>
                    <span style={{ fontSize: "12px" }}> {role.name}</span>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Roles Found</MenuItem>
              )}
            </TextField>
          </div>
          <div className="col-4">
            <TextField
              label="Reporting Manager"
              variant="outlined"
              onChange={handleManagerOnChange}
              //value={ReportingManagerName || ""}
              value={ReportingManagerId || ""}
              //value={`${ReportingManagerName.firstName} ${ReportingManagerName.lastName}`}
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
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {employeelist && employeelist.length > 0 ? (
                employeelist.map((emp) => (
                  <MenuItem key={emp.employee.id} value={emp.employee.id}>
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
        {/*  <div
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
                onKeyPress={handleKeyPress}
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

                    fontWeight: "500",
                    transform: "translate(15px, 9px)",
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    height: "22px",
                    padding: "8px 12px",
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
            <div
              className="skillsetdiv"
              style={{
                overflowY: "scroll",

                resize: "none",
                width: "100%",
                border: "1px solid #ccc",
                padding: "5px",
                gap: "2px",

                height: "70px",

                borderRadius: "4px",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {namesList.map((name, index) => (
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
        </div> */}
      </div>
    </div>
  );
};

export default EditEmployeePopup;
