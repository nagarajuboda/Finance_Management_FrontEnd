import "../../assets/Styles/AddEmployee.css";
import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import { Button, Box, Typography } from "@mui/material";
import checkimage1 from "../../assets/Images/cancelbutton.png";
import "react-toastify/dist/ReactToastify.css";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import pulsimage from "../../assets/Images/plus.png";
import calendarimage from "../../assets/Images/calendar.png";
import { addEmployeeFormValidation } from "./addEmployeeFormValidation";
import AdminDashboardServices from "../../Service/AdminService/AdminDashboardServices";
import { ContentPasteSearchOutlined } from "@mui/icons-material";
import "../../assets/Styles/SuccessPopup.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ellips from "../../assets/Images/Ellipse.png";
import checkimage from "../../assets/Images/check.png";
import { useNavigate } from "react-router-dom";
export default function AddEmployee() {
  const [isopen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedProjectManager, setSelectedProjectManager] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState("");
  const [namesList, setNamesList] = useState([]);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const handleInputChange = (e) => {
    setName(e.target.value);
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
  const textFieldStyles = {
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
      fontWeight: 600,
      transform: "translate(15px, 10px) scale(1)",
      "&.Mui-focused": {
        color: "#000000",
      },
    },
    "& .MuiOutlinedInput-input": {
      height: "1.4375em", // Adjust to align with label properly
      padding: "8px 12px",
      fontSize: "12px",
    },
    "& .MuiInputLabel-shrink": {
      fontSize: "0.85rem",
      transform: "translate(14px, -4px) scale(0.75)",
    },
    "& input::placeholder": {
      fontSize: "0.85rem",
      color: "#AEAEAE",
    },
    "& .MuiSvgIcon-root": {
      color: "#AEAEAE",
    },
  };

  const [values, setValues] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    dateOfJoining: "",
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
  useEffect(() => {
    FeatchData();
  }, [selectedRole, selectedDate]);
  const formatDateToMMDDYYYY = (date) => {
    if (date && date.$d instanceof Date) {
      date = date.$d;
    } else if (date && date.$d) {
      date = new Date(date.$d);
    }

    if (!date || isNaN(date.getTime())) {
      return "";
    }

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const formattedDate = formatDateToMMDDYYYY(selectedDate);

  const FeatchData = async () => {
    var response = await AdminDashboardServices.fcngetEmployees();
    const Rolesresponse = await axios.get(
      "https://localhost:44305/api/Roles/AllRoles"
    );
    var rolesResult = Rolesresponse.data;
    setRoles(rolesResult);
    if (response.isSuccess) {
      setEmployees(response.item);
    }
  };
  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };
  const ProjectManagerhandleChange = (event) => {
    setSelectedProjectManager(event.target.value);
  };

  const Handleonchnage = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Validate the current input change
    setErrors({
      ...errors,
      [name]: addEmployeeFormValidation(name, value),
    });
  };
  const inputStyles = {
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
      fontSize: "0.85rem",
      fontWeight: 600,
      transform: "translate(15px, 10px) scale(1)",
      "&.Mui-focused": {
        color: "black",
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
    "& .MuiSvgIcon-root": {
      color: "#AEAEAE", // Color for the calendar icon
    },
  };
  const closeSuccessPopup = () => {
    setIsOpen(false);
    navigate("/dashboard/Employees");
  };
  async function AddEmployeeForm(e) {
    e.preventDefault();
    console.log(values);
    const newErrors = {
      employeeId: addEmployeeFormValidation("employeeId", values.employeeId),
      firstName: addEmployeeFormValidation("firstName", values.firstName),
      lastName: addEmployeeFormValidation("lastName", values.lastName),
      email: addEmployeeFormValidation("email", values.email),
      mobileNo: addEmployeeFormValidation("mobileNo", values.mobileNo),
      role: addEmployeeFormValidation("role", values.role),
      selectedDate: addEmployeeFormValidation(
        "selectedDate",
        values.selectedDate
      ),
      dateOfJoining: addEmployeeFormValidation(
        "dateOfJoining",
        values.dateOfJoining
      ),
      projectManager: addEmployeeFormValidation(
        "projectManager",
        values.projectManager
      ),
    };
    setErrors(newErrors);
    console.log(errors, "errors");
    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      var obj = {
        Employee: {
          employeeId: values.employeeId,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobileNo: values.mobileNo,
          dateOfJoining: formattedDate,
          otp: values.projectManager,
          roleId: values.role,
          EmployeeStatus: "Active",
          skillSets: values.skillSets,
        },
        Skillsetlists: namesList,
      };
      console.log(obj, "formData");

      var response = await axios.post(
        "https://localhost:44305/api/Employees/Add",
        obj
      );
      console.log(response, "=======>response");
      if (response.data.isSuccess == true) {
        setIsOpen(true);
      } else {
        toast.error(response.data.error.message, {
          position: "top-right",
          autoClose: "4000",
        });
      }
    }
  }
  const ClearValues = () => {
    setValues({});
    console.log(values);
  };
  console.log(values.role);
  return (
    <div className="addemployeemaindiv">
      <div className="addemployeecontent">Add new Employee</div>
      <form onSubmit={AddEmployeeForm}>
        <div className="employeeformdiv">
          <div className="row  m-0">
            <div className="col-3">
              <TextField
                label="Employee ID"
                placeholder="IARCXXXX"
                variant="outlined"
                name="employeeId"
                onChange={Handleonchnage}
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
                    fontSize: "12px",
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
              />

              {errors.employeeId && (
                <span
                  className="error ms-1"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  {errors.employeeId}
                </span>
              )}
            </div>
            <div className="col-3">
              <TextField
                label="FirstName"
                placeholder="loreum ipsum"
                variant="outlined"
                name="firstName"
                onChange={Handleonchnage}
                fullWidth
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
              />
              {errors.firstName && (
                <span
                  className="error ms-1"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  {errors.firstName}
                </span>
              )}
            </div>
            <div className="col-3">
              <TextField
                label="LastName"
                placeholder="loreum ipsum"
                variant="outlined"
                name="lastName"
                onChange={Handleonchnage}
                fullWidth
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
              />
            </div>
            <div className="col-3">
              <TextField
                label="Email ID"
                placeholder="name.surename@archents.com"
                variant="outlined"
                name="email"
                onChange={Handleonchnage}
                fullWidth
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
              />
              {errors.email && (
                <span
                  className="error ms-1"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="row  m-0" style={{ paddingTop: "50px" }}>
            <div className="col-3">
              <TextField
                label="Mobile Number"
                placeholder="+91 XXXXXXXXXX"
                name="mobileNo"
                onChange={Handleonchnage}
                variant="outlined"
                fullWidth
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
              />

              {errors.mobileNo && (
                <span
                  className="error"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  {errors.mobileNo}
                </span>
              )}
            </div>
            <div className="col-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Joining"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                    Handleonchnage({
                      target: { name: "dateOfJoining", value: newValue },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="MM/DD/YYYY"
                      variant="outlined"
                      fullWidth
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
                    />
                  )}
                />
              </LocalizationProvider>

              {errors.dateOfJoining && (
                <span
                  className="error ms-1"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  {errors.dateOfJoining}
                </span>
              )}
            </div>
            <div className="col-3">
              <TextField
                label="Role"
                placeholder="Enter your Role"
                variant="outlined"
                name="role"
                value={values.role}
                onChange={Handleonchnage}
                fullWidth
                select // This prop turns the TextField into a dropdown
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {roles && roles.length > 0 ? (
                  roles.map((role, index) => (
                    <MenuItem key={index} value={role.id}>
                      <span style={{ fontSize: "12px" }}> {role.name}</span>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Employees Found</MenuItem>
                )}
              </TextField>
              {errors.role && (
                <span
                  className="error ms-1"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  {errors.role}
                </span>
              )}
            </div>
            <div className="col-3">
              <TextField
                name="projectManager"
                value={values.projectManager}
                onChange={Handleonchnage}
                label="Reporting Manager"
                placeholder="Enter your Role"
                variant="outlined"
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
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {employees && employees.length > 0 ? (
                  employees.map((emp, index) => (
                    <MenuItem key={index} value={emp.employee.email}>
                      <span style={{ fontSize: "12px" }}>
                        {emp.employee.firstName} {emp.employee.lastName}
                      </span>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Employees Found</MenuItem>
                )}
              </TextField>
              {errors.projectManager && (
                <span
                  className="error ms-1"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  {errors.projectManager}
                </span>
              )}
            </div>
          </div>
          <div className="row m-0" style={{ paddingTop: "50px" }}>
            <div className="col-3" style={{ display: "flex" }}>
              <div>
                <TextField
                  label="Add Skill"
                  placeholder="Add Skills"
                  variant="outlined"
                  value={name}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress} // Detect Enter key press
                  fullWidth
                  width=""
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
                />
              </div>
              <div className=" col-1">
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
            <div className="col-3"></div>
            <div className="col-3"></div>
            <div className="col-3"></div>
          </div>

          <div
            className="row m-0"
            style={{
              paddingTop: "44px",
            }}
          >
            <div className="col-12">
              <TextField
                variant="outlined"
                label="Skill Sets"
                //placeholder="Add Skills"
                multiline
                // height="85px"
                disabled
                InputProps={{
                  startAdornment: (
                    <Box
                      sx={{
                        display: "flex",
                        //flexWrap: "wrap",
                        gap: "10px", // Space between each name box
                        marginTop: 2,
                      }}
                    >
                      {namesList.map((name, index) => (
                        <Box key={index} className="skillsetbox">
                          <Typography
                            className="skillsetitem "
                            style={{
                              display: "flex",
                              alignItems: "center",
                              //justifyContent: "space-between",
                              padding: "0px 0px 0px 5px",
                            }}
                          >
                            <p className="ms-2"> {name}</p>
                            <p className="ms-2">
                              <img
                                src={checkimage1}
                                alt=""
                                className="me-2"
                                height="20px"
                                width="20px"
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
                    fontSize: "1rem",
                    overflowY: "scroll",
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
              />
            </div>
          </div>
          <div className="row m-0" style={{ paddingTop: "25px " }}>
            <div className="col-10"></div>
            <div
              className="col-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button className=" addEmployeeSubmitbutton me-1 ">
                <span className="addemployeespan ">submit</span>
              </button>
              <button
                className="addemployeeResetbutton  "
                onClick={ClearValues}
              >
                <span className="resetspan">reset</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      {isopen && (
        <div className="unique-popup-overlay">
          <div className="unique-popup-container">
            <div className="unique-popup-icon">
              <div className="ellipse-container">
                <img
                  src={checkimage}
                  alt="Check"
                  className="check-image"
                  height="40px"
                  width="40px"
                />
                <img
                  src={ellips}
                  alt="Ellipse"
                  className="ellipse-image"
                  height="65px"
                  width="65px"
                />
              </div>
            </div>
            <h2 className="unique-popup-title">Deleted Successfully</h2>
            <p className="unique-popup-message">Click OK to see the results</p>
            <button className="unique-popup-button" onClick={closeSuccessPopup}>
              OK
            </button>
          </div>
        </div>
      )}
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
}
