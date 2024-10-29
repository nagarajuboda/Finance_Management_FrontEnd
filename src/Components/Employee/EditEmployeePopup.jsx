import "../../assets/Styles/EditEmployeepopup.css";
// import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import pulsimage from "../../assets/Images/plus.png";
import AdminDashboardServices from "../../Service/AdminService/AdminDashboardServices";
const EditEmployeePopup = ({ isEditOpen, handleEditClose }) => {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    FeatchData();
  }, []);
  const FeatchData = async () => {
    var response = await AdminDashboardServices.fcngetEmployees();
    const Rolesresponse = await axios.get(
      "https://localhost:44305/api/Roles/AllRoles"
    );
    console.log(Rolesresponse);
    var rolesResult = Rolesresponse.data;
    setRoles(rolesResult);
    if (response.isSuccess) {
      setEmployees(response.item);
    }
  };

  if (!isEditOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modalheader">
          <h2 className="employeeDetailsContent">Edit Employee Details</h2>
          <sapn className="cancelicon1">
            <i
              class="bi bi-x-lg"
              onClick={handleEditClose}
              style={{ cursor: "pointer" }}
            ></i>
          </sapn>
        </div>

        <div
          className="row  "
          style={{ marginTop: "20px", marginLeft: "7px", marginRight: "12px" }}
        >
          <div className="col-4">
            <TextField
              label="Employee ID"
              placeholder="Enter your EmployeeID"
              variant="outlined"
              fullWidth
              select // This prop turns the TextField into a dropdown
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  color: "#000000",
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  color: "#000000",
                  fontSize: "1rem",
                  fontWeight: "600",
                  paddingBottom: "10px !important",
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
                  <MenuItem key={index} value={emp.employee.id}>
                    {emp.employee.employeeId}
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
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  "& fieldset": {
                    borderColor: "#DCDCDC", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#757575", // Hover border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px", // Padding inside the input
                  fontSize: "1rem",
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
          <div className="col-4">
            <TextField
              label="Last Name"
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  background: "#FFFFFF 0% 0% no-repeat padding-box",

                  borderradius: "5px",
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px", // Padding inside the input
                  fontSize: "1rem",
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
        <div
          className="row  employeeUpdateSkills"
          style={{ marginTop: "20px", marginLeft: "7px", marginRight: "12px" }}
        >
          <div className="col-4">
            <TextField
              label="Email ID"
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  "& fieldset": {
                    borderColor: "#DCDCDC", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#757575", // Hover border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px", // Padding inside the input
                  fontSize: "1rem",
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
          <div className="col-4">
            <TextField
              label="Mobile Number"
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  "& fieldset": {
                    borderColor: "#DCDCDC", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#757575", // Hover border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px", // Padding inside the input
                  fontSize: "1rem",
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
          <div className="col-4">
            <TextField
              label="Date of Joining"
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  "& fieldset": {
                    borderColor: "#DCDCDC", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#757575", // Hover border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px", // Padding inside the input
                  fontSize: "1rem",
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
        <div
          className="row  employeeUpdateSkills"
          style={{ marginTop: "20px", marginLeft: "7px", marginRight: "12px" }}
        >
          <div className="col-4">
            {/* <TextField
              label="Status"
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  "& fieldset": {
                    borderColor: "#DCDCDC", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#757575", // Hover border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px", // Padding inside the input
                  fontSize: "1rem",
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
            <TextField
              label="Status"
              placeholder="Select Status"
              variant="outlined"
              fullWidth
              select // This prop turns the TextField into a dropdown
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  color: "#000000",
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  color: "#000000",
                  fontSize: "1rem",
                  fontWeight: "600",
                  paddingBottom: "10px !important",
                  transform: "translate(14px, -6px) scale(0.75)",
                },
                "& input::placeholder": {
                  fontSize: "12px",
                  color: "#AEAEAE",
                },
              }}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value={10}>Active</MenuItem>
              <MenuItem value={20}>InActive</MenuItem>
            </TextField>
          </div>
          <div className="col-4">
            {/* <TextField
              label="Role"
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  "& fieldset": {
                    borderColor: "#DCDCDC", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#757575", // Hover border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px", // Padding inside the input
                  fontSize: "1rem",
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
            <TextField
              label="Role"
              placeholder="Enter your Role"
              variant="outlined"
              fullWidth
              select // This prop turns the TextField into a dropdown
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  color: "#000000",
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  color: "#000000",
                  fontSize: "1rem",
                  fontWeight: "600",
                  paddingBottom: "10px !important",
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
                    {role.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Employees Found</MenuItem>
              )}
            </TextField>
          </div>
          <div className="col-4">
            {/* <TextField
              label="Reporting Manager"
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  "& fieldset": {
                    borderColor: "#DCDCDC", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#757575", // Hover border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px", // Padding inside the input
                  fontSize: "1rem",
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
            <TextField
              label="Reporting Manager"
              placeholder="Enter your Role"
              variant="outlined"
              fullWidth
              select // This prop turns the TextField into a dropdown
              sx={{
                width: "291px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  color: "#000000",
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px",
                  fontSize: "1rem",
                },
                "& .MuiInputLabel-shrink": {
                  color: "#000000",
                  fontSize: "1rem",
                  fontWeight: "600",
                  paddingBottom: "10px !important",
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
                    {emp.employee.firstName} {emp.employee.lastName}
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
                placeholder="Enter your email"
                variant="outlined"
                fullWidth
                width=""
                sx={{
                  width: "240px",
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1rem",
                    "& fieldset": {
                      borderColor: "#DCDCDC", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "#757575", // Hover border color
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#000000",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    transform: "translate(15px, 9px)",
                  },
                  "& .MuiOutlinedInput-input": {
                    height: "22px",
                    padding: "8px 12px", // Padding inside the input
                    fontSize: "1rem",
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
            <div className="ms-2">
              <img src={pulsimage} alt="" width="35px" height="36px" />
            </div>
          </div>
          <div className="col-8">
            <TextField
              id="outlined-basic"
              label="Skill Sets"
              variant="outlined"
              placeholder="Add Skills"
              multiline
              rows={1.5}
              sx={{
                width: "600px",
                height: "10px",
                "& .MuiOutlinedInput-root": {
                  fontSize: "1rem",
                  "& fieldset": {
                    borderColor: "#DCDCDC", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#757575", // Hover border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#000000",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  transform: "translate(15px, 9px)",
                },
                "& .MuiOutlinedInput-input": {
                  height: "22px",
                  padding: "8px 12px", // Padding inside the input
                  fontSize: "1rem",
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
        <div
          className=" row"
          style={{ marginTop: "60px", marginLeft: "7px", marginRight: "12px" }}
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
