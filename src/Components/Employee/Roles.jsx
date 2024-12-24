import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/Styles/EmployeePages/Roles.css";
import editicon from "../../assets/Images/Editicon.png";
import deleteicon from "../../assets/Images/deleteicon.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import images from "../../assets/Images/User.png";
import axios from "axios";
import ImportPopup from "./ImportPopup";
import checkimage from "../../assets/Images/check.png";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { AddRoleFormValidation } from "./AddRoleformValidatons";
const priorityMap = {
  1: "High",
  2: "Medium",
  0: "Low",
};

export default function Roles() {
  const navigate = useNavigate();
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditIsPopupOpen] = useState(false);
  const [disiblebuttons, setDisiblebuttons] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);
  const [isUpdateopen, setIsUpdateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setid] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isopen, setisOpen] = useState(false);
  const [RoleName, setRoleName] = useState("");
  const [role, setRole] = useState({});

  useEffect(() => {
    fetchRoles();
  }, []);
  const [values, setValues] = useState({
    RoleName: "",
    Priority: "",
  });
  const [errors, setErrors] = useState({
    RoleName: "",
    Priority: "",
  });
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44305/api/Roles/AllRoles"
      );
      const sortedRoles = response.data.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return a.priority - b.priority;
      });
      setRoles(sortedRoles);
    } catch (error) {
      console.error("Error fetching roles", error);
    }
  };

  const EdittogglePopup = (e, index, roleId) => {
    sessionStorage.setItem("RoleID", roleId);
    navigate("/dashboard/EditRoles");
  };

  const handleOpenPopup = async (e, index, id) => {
    var response = await axios.delete(
      `https://localhost:44305/api/Roles/${id}`
    );
    var result = response.data;
    if (result.isSuccess === true) {
      fetchRoles();
      setOpen(true);
    }
  };

  const closeDeletePopup = () => {
    setOpen(false);
  };
  const [priority, setPriority] = useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: AddRoleFormValidation(name, value),
    });
  };
  // const handleChange1 = (e) => {
  //   const { name, value } = e.target;
  //   setRoleName(value);
  // };
  console.log(values, "values");
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const allRoleIds = currentItems.map((role) => role.id);
      setSelectedRoleIds(allRoleIds);
      setDisiblebuttons(false);
    } else {
      setSelectedRoleIds([]);
      setDisiblebuttons(true);
    }
    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };

  const DeleteSelectedRecords = async () => {
    const response = await axios.put(
      "https://localhost:44305/api/Roles/DeleteSelectedRoles",
      selectedRoleIds
    );
    const result = response.data;
    if (result.isSuccess) {
      setOpen(true);
      fetchRoles();
    }
  };

  const filteredRoles = roles.filter((role) => {
    return (
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.priority.toString().includes(searchQuery.toLowerCase())
    );
  });

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRoles.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);

  const handleCheckboxChange = (roleId, isChecked) => {
    setSelectedRoleIds((prevSelected) => {
      if (isChecked) {
        setDisiblebuttons(false);
        return [...prevSelected, roleId];
      } else {
        setDisiblebuttons(true);
        return prevSelected.filter((id) => id !== roleId);
      }
    });
  };

  const handleToggle = async (roleId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.put(
        `https://localhost:44305/api/Roles/toggle-status/{roleId}`,
        {
          roleId,
          isEnabled: updatedStatus,
        }
      );
      fetchRoles();
    } catch (error) {
      console.error("Error updating role status", error);
    }
  };
  const AddNewRolePopup = () => {
    setValues({
      RoleName: "",
      Priority: "",
    });
    setErrors({
      RoleName: "",
      Priority: "",
    });
    setisOpen(true);
  };
  const CloseAddNewRolePopup = () => {
    setValues({
      RoleName: "",
      Priority: "",
    });
    setErrors({
      RoleName: "",
      Priority: "",
    });
    setisOpen(false);
  };
  const UpdatePopup = async (roleId) => {
    console.log(roleId, "=========>");
    var getRoleResponse = await axios.get(
      `https://localhost:44305/api/Roles/getRole?id=${roleId} `
    );
    setIsUpdateOpen(true);
    var result = getRoleResponse.data;
    setRole(result);
    console.log(result, "===============>");
  };
  const CloseUpdateRolePopup = () => {
    setIsUpdateOpen(false);
  };
  const AddRole = async () => {
    const newErrors = {
      RoleName: AddRoleFormValidation("RoleName", values.RoleName),
      Priority: AddRoleFormValidation("Priority", values.Priority),
    };
    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((error) => error === "");
    console.log(errors, "errors");
    if (isValid) {
      var obj = {
        name: values.RoleName,
        priority: values.priority,
      };
      var response = await axios.post(
        "https://localhost:44305/api/Roles/CreateRole",
        obj
      );
      var result = response.data;
      if (result.isSuccess) {
        setisOpen(false);
        fetchRoles();
      }
      console.log(response, "role");
    }
  };
  return (
    <div className="Rolemaindiv">
      <div className="roleheader">Role and Access</div>
      <div className="Rolelist">
        <div
          className="row"
          style={{
            paddingTop: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="col-4 ">
            <p className="rolecontent ms-2">Roles list</p>
          </div>
          <div
            className="col-2 "
            style={{ display: "flex", justifyContent: "end" }}
          ></div>
          <div className="col-6 d-flex justify-content-end pe-3">
            <div className="me-2">
              <button
                className="DelRecordbutton me-2"
                disabled={disiblebuttons}
                onClick={DeleteSelectedRecords}
              >
                <span className="delSelectedSpan">Delete Selected</span>
              </button>
            </div>
            <div>
              <button
                className="add-new-role-button me-2"
                // onClick={Addrolefuncton}
                onClick={AddNewRolePopup}
              >
                <span>
                  <img
                    src={images}
                    alt=""
                    height="18px"
                    width="18px"
                    className=""
                  />
                </span>
                <span className="add-new-role-span ms-1">Add New Role</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              border: "1px solid #64646430",
              width: "100%",
            }}
            className=" mt-2"
          ></div>
        </div>

        <div style={{ padding: "10px" }}>
          <table id="example" className="roleTable" style={{ width: "100%" }}>
            <thead>
              <tr
                className="roleheader"
                style={{ backgroundColor: "red important" }}
              >
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    className="userCheckbox"
                  />
                </th>
                <th className="rolethclass">Role Name</th>
                <th className="rolethclass">Priority level</th>
                <th className="rolethclass">Priority Number</th>
                <th className="rolethclass">Enable/Disable</th>
                <th className="rolethclass">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((role, index) => (
                <tr className="EmployeeListtablelistrow" key={role.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(role.id, e.target.checked)
                      }
                      className="row-checkbox"
                    />
                  </td>
                  <td>{role.name}</td>
                  <td>{priorityMap[role.priority]}</td>
                  <td>{role.priority}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={role.isEnabled}
                        onChange={() => handleToggle(role.id, role.isEnabled)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <img
                      src={editicon}
                      // onClick={UpdatePopup}
                      onClick={(e) => {
                        UpdatePopup(role.id);
                      }}
                      // onClick={() => handleEdit(role)}
                      alt="Edit Role"
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                      }}
                    />

                    <img
                      src={deleteicon}
                      style={{ width: "25px", cursor: "pointer" }}
                      onClick={(e) => {
                        setid(role.id);
                        setIsPopupOpen(true);
                      }}
                      alt="Delete"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isopen && (
        <div className="overlay-backdrop">
          <div className="overlay-box">
            <div
              className="overlay-header"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h2 className="overlay-heading">
                <span className="Add_New-role_span">Add New Role</span>
              </h2>
              <span className="overlay-close-btn">
                <i
                  className="bi bi-x-lg"
                  onClick={CloseAddNewRolePopup}
                  style={{ cursor: "pointer", color: "white" }}
                ></i>
              </span>
            </div>
            <div style={{ padding: "20px" }}>
              <TextField
                label="Role Name"
                placeholder="Enter RoleName"
                variant="outlined"
                name="RoleName"
                value={values.RoleName}
                onChange={handleChange}
                fullWidth
                className="custom-text-field"
              />
              {errors.RoleName && (
                <span
                  className="error ms-1"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  {errors.RoleName}
                </span>
              )}
            </div>
            <div
              style={{
                paddingRight: "20px",
                paddingLeft: "20px",
                paddingTop: "10px",
              }}
            >
              <TextField
                label="Priority"
                variant="outlined"
                name="Priority"
                value={values.Priority}
                onChange={handleChange}
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
                }}
              >
                <MenuItem value="" style={{ fontSize: "12px" }}>
                  <em>Select</em>
                </MenuItem>

                <MenuItem value={0} style={{ fontSize: "12px" }}>
                  Low
                </MenuItem>
                <MenuItem value={1} style={{ fontSize: "12px" }}>
                  Medium
                </MenuItem>
                <MenuItem value={2} style={{ fontSize: "12px" }}>
                  High
                </MenuItem>
              </TextField>
              {errors.Priority && (
                <span
                  className="error ms-1"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  {errors.Priority}
                </span>
              )}
            </div>
            <div
              className="overlay-content "
              style={{ paddingTop: "20px", display: "flex" }}
            >
              <div className="">
                <button className="overlaysavebtn ms-1" onClick={AddRole}>
                  <span className="overlay-save-label">Save</span>
                </button>
              </div>
              <div className="">
                <button
                  style={{ cursor: "pointer" }}
                  className="ms-3 overlay-cancel-button"
                  onClick={CloseAddNewRolePopup}
                >
                  <span className="overlay-cancel-span">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isUpdateopen && (
        <div className="overlay-backdrop">
          <div className="overlay-box">
            <div
              className="overlay-header"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h2 className="overlay-heading">
                <span className="Add_New-role_span">Add New Role</span>
              </h2>
              <span className="overlay-close-btn">
                <i
                  className="bi bi-x-lg"
                  onClick={CloseUpdateRolePopup}
                  style={{ cursor: "pointer", color: "white" }}
                ></i>
              </span>
            </div>
            <div style={{ padding: "20px" }}>
              <TextField
                label="Role Name"
                placeholder="Enter RoleName"
                variant="outlined"
                name="RoleName"
                value={role.name}
                onChange={handleChange}
                fullWidth
                className="custom-text-field"
              />
            </div>
            <div
              style={{
                paddingRight: "20px",
                paddingLeft: "20px",
                paddingTop: "10px",
              }}
            >
              <TextField
                label="Priority"
                variant="outlined"
                name="Priority"
                value={role.priority}
                onChange={handleChange}
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
                }}
              >
                <MenuItem value="" style={{ fontSize: "12px" }}>
                  <em>Select</em>
                </MenuItem>

                <MenuItem value={0} style={{ fontSize: "12px" }}>
                  Low
                </MenuItem>
                <MenuItem value={1} style={{ fontSize: "12px" }}>
                  Medium
                </MenuItem>
                <MenuItem value={2} style={{ fontSize: "12px" }}>
                  High
                </MenuItem>
              </TextField>
            </div>
            <div className="overlay-content row" style={{ paddingTop: "20px" }}>
              <div className=" col-2">
                <button className="overlaysavebtn ms-1">
                  <span className="overlay-save-label">Save</span>
                </button>
              </div>
              <div className="col-2">
                <button
                  style={{ cursor: "pointer" }}
                  className="ms-4 overlay-cancel-button"
                  onClick={CloseUpdateRolePopup}
                >
                  <span className="overlay-cancel-span">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
