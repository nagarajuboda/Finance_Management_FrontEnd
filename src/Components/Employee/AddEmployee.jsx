import "../../assets/Styles/AddEmployee.css";
import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";

import InputAdornment from "@mui/material/InputAdornment";
import pulsimage from "../../assets/Images/plus.png";
import calendar from "../../assets/Images/calendar.png";
import { addEmployeeFormValidation } from "./addEmployeeFormValidation";
import AdminDashboardServices from "../../Service/AdminService/AdminDashboardServices";
import { ContentPasteSearchOutlined } from "@mui/icons-material";
export default function AddEmployee() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedProjectManager, setSelectedProjectManager] = useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [roles, setRoles] = useState([]);

  const [date, setDate] = useState(null);
  const [employees, setEmployees] = useState([]);

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
  }
  console.log(values.role);
  return (
    <div className="addemployeemaindiv">
      <div className="addemployeecontent">Add employee model</div>
      <div className="employeeformdiv">
        <form onSubmit={AddEmployeeForm}>
          <div className="row  m-0">
            <div className="col-3">
              <TextField
                id="employee-id"
                label="Employee ID"
                placeholder="IARCXXXX"
                variant="outlined"
                name="employeeId"
                onChange={Handleonchnage}
                sx={{
                  width: "100%",
                }}
                InputProps={{
                  sx: {
                    height: "36px",
                    // padding: "0px 14px",
                    boxSizing: "border-box",
                    "& input:focus + fieldset legend": {
                      fontSize: "0.8em",
                    },
                    "& input::placeholder": {
                      height: "16px",
                      textAlign: "left",
                      fontStyle: "normal",
                      fontVariant: "normal",
                      fontWeight: "normal",
                      fontSize: "12px",
                      lineHeight: "30px",
                      fontFamily: "Segoe UI",
                      color: "#000000",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "13px",
                    fontFamily: "Segoe UI sans-serif",
                    color: "#000000",
                    fontWeight: "600",
                    lineHeight: "20px",
                    transform: "translate(8px, 8px) scale(1)",
                    "&.Mui-focused": {
                      transform: "translate(13px, -8px) scale(0.75)",
                      fontSize: "18px",
                      fontFamily: "Segoe UI sans-serif",
                      color: "#000000",
                      fontWeight: "600",
                      lineHeight: "20px",
                    },
                    "&.MuiFormLabel-filled": {
                      transform: "translate(14px, -8px) scale(0.75)",
                    },
                  },
                }}
              />
              {errors.employeeId && (
                <span className="error ms-1" style={{ fontSize: "13px" }}>
                  {errors.employeeId}
                </span>
              )}
            </div>
            <div className="col-3">
              <TextField
                id="employee-id"
                label="FirstName"
                placeholder="loreum ipsum"
                variant="outlined"
                name="firstName"
                onChange={Handleonchnage}
                sx={{
                  width: "100%",
                }}
                InputProps={{
                  sx: {
                    height: "36px",
                    // padding: "0px 14px",
                    boxSizing: "border-box",
                    "& input:focus + fieldset legend": {
                      fontSize: "0.8em",
                    },
                    "& input::placeholder": {
                      height: "16px",
                      textAlign: "left",
                      fontStyle: "normal",
                      fontVariant: "normal",
                      fontWeight: "normal",
                      fontSize: "12px",
                      lineHeight: "30px",
                      fontFamily: "Segoe UI",
                      color: "#000000",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "13px",
                    fontFamily: "Segoe UI sans-serif",
                    color: "#000000",
                    fontWeight: "600",
                    lineHeight: "20px",
                    transform: "translate(8px, 8px) scale(1)",
                    "&.Mui-focused": {
                      transform: "translate(13px, -8px) scale(0.75)",
                      fontSize: "18px",
                      fontFamily: "Segoe UI sans-serif",
                      color: "#000000",
                      fontWeight: "600",
                      lineHeight: "20px",
                    },
                    "&.MuiFormLabel-filled": {
                      transform: "translate(14px, -8px) scale(0.75)",
                    },
                  },
                }}
              />
              {errors.firstName && (
                <span className="error ms-1" style={{ fontSize: "13px" }}>
                  {errors.firstName}
                </span>
              )}
            </div>
            <div className="col-3">
              <TextField
                id="employee-id"
                label="LastName"
                placeholder="loreum ipsum"
                variant="outlined"
                name="lastName"
                onChange={Handleonchnage}
                sx={{
                  width: "100%",
                }}
                InputProps={{
                  sx: {
                    height: "36px",
                    // padding: "0px 14px",
                    boxSizing: "border-box",
                    "& input:focus + fieldset legend": {
                      fontSize: "0.8em",
                    },
                    "& input::placeholder": {
                      height: "16px",
                      textAlign: "left",
                      fontStyle: "normal",
                      fontVariant: "normal",
                      fontWeight: "normal",
                      fontSize: "12px",
                      lineHeight: "30px",
                      fontFamily: "Segoe UI",
                      color: "#000000",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "13px",
                    fontFamily: "Segoe UI sans-serif",
                    color: "#000000",
                    fontWeight: "600",
                    lineHeight: "20px",
                    transform: "translate(8px, 8px) scale(1)",
                    "&.Mui-focused": {
                      transform: "translate(13px, -8px) scale(0.75)",
                      fontSize: "18px",
                      fontFamily: "Segoe UI sans-serif",
                      color: "#000000",
                      fontWeight: "600",
                      lineHeight: "20px",
                    },
                    "&.MuiFormLabel-filled": {
                      transform: "translate(14px, -8px) scale(0.75)",
                    },
                  },
                }}
              />
            </div>
            <div className="col-3">
              <TextField
                id="employee-id"
                label="Email ID"
                placeholder="name.surename@archents.com"
                variant="outlined"
                name="email"
                onChange={Handleonchnage}
                sx={{
                  width: "100%",
                }}
                InputProps={{
                  sx: {
                    height: "36px",
                    boxSizing: "border-box",
                    "& input:focus + fieldset legend": {
                      fontSize: "0.8em",
                    },
                    "& input::placeholder": {
                      height: "16px",
                      textAlign: "left",
                      fontStyle: "normal",
                      fontVariant: "normal",
                      fontWeight: "normal",
                      fontSize: "12px",
                      lineHeight: "30px",
                      fontFamily: "Segoe UI",
                      color: "#000000",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "13px",
                    fontFamily: "Segoe UI sans-serif",
                    color: "#000000",
                    fontWeight: "600",
                    lineHeight: "20px",
                    transform: "translate(8px, 8px) scale(1)",
                    "&.Mui-focused": {
                      transform: "translate(13px, -8px) scale(0.75)",
                      fontSize: "18px",
                      fontFamily: "Segoe UI sans-serif",
                      color: "#000000",
                      fontWeight: "600",
                      lineHeight: "20px",
                    },
                    "&.MuiFormLabel-filled": {
                      transform: "translate(14px, -8px) scale(0.75)",
                    },
                  },
                }}
              />
              {errors.email && (
                <span className="error ms-1" style={{ fontSize: "13px" }}>
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="row  m-0" style={{ paddingTop: "40px" }}>
            <div className="col-3">
              <TextField
                id="employee-id"
                label="Mobile Number"
                placeholder="+91 XXXXXXXXXX"
                name="mobileNo"
                onChange={Handleonchnage}
                variant="outlined"
                sx={{
                  width: "100%",
                }}
                InputProps={{
                  sx: {
                    height: "36px",
                    // padding: "0px 14px",
                    boxSizing: "border-box",
                    "& input:focus + fieldset legend": {
                      fontSize: "0.8em",
                    },
                    "& input::placeholder": {
                      height: "16px",
                      textAlign: "left",
                      fontStyle: "normal",
                      fontVariant: "normal",
                      fontWeight: "normal",
                      fontSize: "12px",
                      lineHeight: "30px",
                      fontFamily: "Segoe UI",
                      color: "#000000",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    fontSize: "13px",
                    fontFamily: "Segoe UI sans-serif",
                    color: "#000000",
                    fontWeight: "600",
                    lineHeight: "20px",
                    transform: "translate(8px, 8px) scale(1)",
                    "&.Mui-focused": {
                      transform: "translate(13px, -8px) scale(0.75)",
                      fontSize: "18px",
                      fontFamily: "Segoe UI sans-serif",
                      color: "#000000",
                      fontWeight: "600",
                      lineHeight: "20px",
                    },
                    "&.MuiFormLabel-filled": {
                      transform: "translate(14px, -8px) scale(0.75)",
                    },
                  },
                }}
              />
              {errors.mobileNo && (
                <span className="error" style={{ fontSize: "13px" }}>
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
                    setSelectedDate(newValue); // Update the selected date
                    Handleonchnage({
                      target: { name: "dateOfJoining", value: newValue },
                    }); // Trigger the handle change
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="MM/DD/YYYY"
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          height: "36px",
                          padding: "0px 14px",
                          boxSizing: "border-box",
                          "& input::placeholder": {
                            fontSize: "60px",
                            fontFamily: "Segoe UI",
                            color: "#000000",
                            lineHeight: "20px",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "13px",
                          fontFamily: "Segoe UI, sans-serif",
                          color: "#000000",
                          fontWeight: 600,
                          lineHeight: "20px",
                          transform: "translate(8px, 8px) scale(1)",
                          transition:
                            "transform 0.2s ease, font-size 0.2s ease",
                          "&.Mui-focused": {
                            transform: "translate(13px, -8px) scale(0.75)",
                            fontSize: "18px",
                            color: "#000000",
                          },
                          "&.MuiFormLabel-filled": {
                            transform: "translate(14px, -8px) scale(0.75)",
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          fontSize: "20px",
                          fontFamily: "Segoe UI sans-serif",
                          color: "#000000",
                          fontWeight: "600",
                          lineHeight: "20px",
                          transform: "translate(8px, 8px) scale(1)",
                          "&.Mui-focused": {
                            transform: "translate(13px, -8px) scale(0.75)",
                            fontSize: "18px",
                            fontFamily: "Segoe UI sans-serif",
                            color: "#000000",
                            fontWeight: "600",
                            lineHeight: "20px",
                          },
                          "&.MuiFormLabel-filled": {
                            transform: "translate(14px, -8px) scale(0.75)",
                          },
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            style={{ padding: "0px" }}
                          >
                            <IconButton>
                              <img
                                src="/mnt/data/image.png"
                                alt="Custom Calendar"
                                style={{ width: "24px", height: "24px" }}
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              {errors.dateOfJoining && (
                <span className="error ms-1" style={{ fontSize: "13px" }}>
                  {errors.dateOfJoining}
                </span>
              )}
            </div>
            <div className="col-3">
              <FormControl variant="outlined" sx={{ minWidth: "100%" }}>
                <InputLabel
                  id="custom-dropdown-label"
                  sx={{
                    fontSize: "13px",
                    fontFamily: "Segoe UI, sans-serif", // Font family
                    color: "#000000", // Label color
                    fontWeight: 600,
                    lineHeight: "20px",
                    transform: "translate(8px, 8px) scale(1)",
                    transition: "transform 0.2s ease, font-size 0.2s ease", // Smooth transition
                    "&.Mui-focused": {
                      transform: "translate(13px, -8px) scale(0.75)",
                      fontSize: "18px",
                      color: "#000000",
                    },
                    "&.MuiFormLabel-filled": {
                      transform: "translate(14px, -8px) scale(0.75)",
                    },
                  }}
                >
                  Role
                </InputLabel>
                <Select
                  labelId="custom-dropdown-label"
                  id="custom-dropdown"
                  //value={values.role}
                  name="role"
                  //value={selectedRole || ""}
                  value={values.role}
                  onChange={Handleonchnage}
                  //onChange={handleChange}
                  label="Select Role"
                  sx={{
                    width: "100%",
                    height: "36px",
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    },
                  }}
                  inputProps={{
                    sx: {
                      height: "36px",
                      boxSizing: "border-box",
                      "&:focus + fieldset legend": {
                        fontSize: "0.8em",
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select Role</em>
                  </MenuItem>
                  {roles && roles.length > 0 ? (
                    roles.map((role, index) => (
                      <MenuItem key={index} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Employees Found</MenuItem>
                  )}
                </Select>
              </FormControl>
              {errors.role && (
                <span className="error ms-1" style={{ fontSize: "13px" }}>
                  {errors.role}
                </span>
              )}
            </div>
            <div className="col-3">
              <FormControl variant="outlined" sx={{ minWidth: 291 }}>
                <InputLabel
                  id="custom-dropdown-label"
                  sx={{
                    width: "290px",
                    height: "36px",
                    fontFamily: "Segoe UI, sans-serif", // Font family
                    color: "#000000", // Label color
                    fontWeight: 600,
                    lineHeight: "20px",
                    transform: "translate(8px, 8px) scale(1)",
                    transition: "transform 0.2s ease, font-size 0.2s ease", // Smooth transition
                    "&.Mui-focused": {
                      transform: "translate(13px, -8px) scale(0.75)",
                      fontSize: "18px",
                      color: "#000000",
                    },
                    "&.MuiFormLabel-filled": {
                      transform: "translate(14px, -8px) scale(0.75)",
                    },
                  }}
                >
                  Reporting Manager
                </InputLabel>
                <Select
                  labelId="custom-dropdown-label"
                  id="custom-dropdown"
                  name="projectManager"
                  //value={selectedProjectManager || ""}
                  value={values.projectManager}
                  onChange={Handleonchnage}
                  label="Select Manager"
                  sx={{
                    width: "100%px",
                    height: "36px",
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    },
                  }}
                  inputProps={{
                    sx: {
                      height: "36px",
                      boxSizing: "border-box",
                      "&:focus + fieldset legend": {
                        fontSize: "0.8em",
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select Manager</em>
                  </MenuItem>
                  {employees && employees.length > 0 ? (
                    employees.map((emp, index) => (
                      <MenuItem key={index} value={emp.employee.email}>
                        {emp.employee.firstName} {emp.employee.lastName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Employees Found</MenuItem>
                  )}
                </Select>
              </FormControl>
              {errors.projectManager && (
                <span className="error ms-1" style={{ fontSize: "13px" }}>
                  {errors.projectManager}
                </span>
              )}
            </div>
          </div>
          <div className="row m-0" style={{ paddingTop: "40px" }}>
            <div
              className="col-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <TextField
                  id="employee-id"
                  label="Add Skills"
                  placeholder="Add Skills"
                  name="skillSets"
                  value={values.skillSets}
                  onChange={Handleonchnage}
                  variant="outlined"
                  sx={{
                    width: "270px",
                  }}
                  InputProps={{
                    sx: {
                      height: "36px",
                      // padding: "0px 14px",
                      boxSizing: "border-box",
                      "& input:focus + fieldset legend": {
                        fontSize: "0.8em",
                      },
                      "& input::placeholder": {
                        width: "58px",
                        height: "16px",
                        textAlign: "left",
                        fontStyle: "normal",
                        fontVariant: "normal",
                        fontWeight: "normal",
                        fontSize: "12px",
                        lineHeight: "30px",
                        fontFamily: "Segoe UI",
                        color: "#000000",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: "13px",
                      fontFamily: "Segoe UI sans-serif",
                      color: "#000000",
                      fontWeight: "600",
                      lineHeight: "20px",
                      transform: "translate(8px, 8px) scale(1)",
                      "&.Mui-focused": {
                        transform: "translate(13px, -8px) scale(0.75)",
                        fontSize: "18px",
                        fontFamily: "Segoe UI sans-serif",
                        color: "#000000",
                        fontWeight: "600",
                        lineHeight: "20px",
                      },
                      "&.MuiFormLabel-filled": {
                        transform: "translate(14px, -8px) scale(0.75)",
                      },
                    },
                  }}
                />
              </div>
              <div className="" style={{ marginRight: "39px" }}>
                <img src={pulsimage} alt="" width="35px" height="36px" />
              </div>
            </div>
            <div className="col-3"></div>
            <div className="col-3"></div>
            <div className="col-3"></div>
          </div>

          <div
            className="row m-0"
            style={{
              paddingTop: "40px",
              paddingLeft: "10px",
              paddingRight: "45px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Skill Sets"
              variant="outlined"
              placeholder="Add Skill Sets"
              multiline
              rows={4}
              InputLabelProps={{
                sx: {
                  fontSize: "13px",
                  fontFamily: "Segoe UI sans-serif",
                  color: "#000000",
                  fontWeight: "600",
                  //lineHeight: "20px",
                  transform: "translate(15px, 20px) scale(1)",
                  "&.Mui-focused": {
                    transform: "translate(10px, -8px) scale(0.75)",
                    fontSize: "18px",
                    fontFamily: "Segoe UI sans-serif",
                    color: "#000000",
                    fontWeight: "600",
                    //lineHeight: "20px",
                  },
                  "&.MuiFormLabel-filled": {
                    transform: "translate(14px, 0px) scale(0.75)",
                  },
                },
              }}
              InputProps={{
                sx: {
                  height: "85px",

                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    textAlign: "left",

                    fontWeight: "600",
                    color: "#AEAEAE",
                    backgroundColor: "#FFFFFF",
                    backgroundPosition: "0% 0%",
                    backgroundRepeat: "no-repeat",
                    border: " 1px solid #DCDCDC",
                    borderRadius: "5px",
                    //  marginTop: "50px",
                  },
                  "& textarea::placeholder": {
                    fontSize: "12px",
                    opacity: 1,

                    fontWeight: "600",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
          <div className="row m-0" style={{ marginTop: "20px !important" }}>
            <div className="col-10"></div>
            <div
              className="col-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button className="btn btn-success">Submit</button>
              <button className="btn btn-primary me-5">reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
