import { Link } from "react-router-dom";
import logo from "../../../assets/Images/1.jpg";
import "../../../assets/Styles/Profile.css";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import EmployeeService from "../../../Service/EmployeeService/EmployeeService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Profile() {
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
  //const userDetails = GetSessionData();
  const [loginUser, setLoginUser] = useState({});

  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  useEffect(() => {
    setLoginUser(userDetails.employee);
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };
  async function formSubmit(e) {
    e.preventDefault();
    var respones = await EmployeeService.UpdateProfilefcn(loginUser);
    if (respones.isSuccess == true) {
      const updatedEmployee = respones.item;
      const updatedSessionData = {
        ...userDetails,
        employee: {
          ...userDetails.employee,
          ...updatedEmployee,
        },
      };
      localStorage.setItem("sessionData", JSON.stringify(updatedSessionData));
      setLoginUser(updatedEmployee);
      toast.success("Profile Update Successfully  done. ", {
        position: "top-right",
        autoClose: "4000",
      });
      handleClose();
    }
  }
  return (
    <div className="profile-container">
      <div
        className="profile-card card shadow-sm p-4"
        style={{ borderRadius: "0px" }}
      >
        <div className="row align-items-center">
          <div className="col-md-3 text-center d-flex flex-column align-items-center">
            <img
              src={logo}
              alt="Profile"
              className="profile-image img-fluid rounded-circle mb-3"
            />
            <button className="btn btn-outline-primary btn-sm">
              Change Image
            </button>
          </div>
          <div className="col-md-7">
            <h4 className="mb-2">{`${loginUser.firstName} ${loginUser.lastName}`}</h4>
            <p className="text-muted mb-1">
              {/* Designation: {loginUser.designation || "N/A"} */}
            </p>
            <p className="text-muted">Employee ID: {loginUser.employeeId}</p>
          </div>
          <div className="col-md-2 text-md-end">
            <Link className="btn btn-primary btn-sm" onClick={handleOpen}>
              Edit Profile
            </Link>
          </div>
        </div>

        <hr className="my-4" />

        <div className="profile-details">
          <h5>Personal Details</h5>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Email ID:</strong>
            </div>
            <div className="col-sm-8">
              <span>{loginUser.email}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Joining Date:</strong>
            </div>
            <div className="col-sm-8">
              <span>{loginUser.dateOfJoining}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Mobile No:</strong>
            </div>
            <div className="col-sm-8">
              <span>{loginUser.mobileNo}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Skills:</strong>
            </div>
            <div className="col-sm-8">
              <span>{loginUser.skillSets || "N/A"}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-4">
              <strong>Manager:</strong>
            </div>
            <div className="col-sm-8">
              <span>{loginUser.projectManagerId || "N/A"}</span>
            </div>
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style }}>
            <p id="parent-modal-title" style={{ fontSize: "1.25rem" }}>
              Update Profile
            </p>
            <form className="formclass" onSubmit={formSubmit}>
              <div className="row m-0">
                <div className="col-6">
                  <label className="labless">FirstName</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={loginUser.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <label className="labless">LastName</label>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={loginUser.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row m-0 mt-2">
                <div className="col-6">
                  <label className="labless">Phone Number</label>
                  <div>
                    <input
                      type="text"
                      name="mobileNo"
                      className="form-control"
                      value={loginUser.mobileNo}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div>
                    <label className="labless">Skills</label>
                    <input
                      type="text"
                      className="form-control"
                      name="skillSets"
                      value={loginUser.skillSets}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row m-0">
                <div className="col-6"></div>
                <div className="col-4"></div>
                <div className="col-2"></div>
              </div>
              <div className="row m-0 mt-3">
                <div className="col-8"></div>
                <div className="col-2">
                  <button
                    onClick={handleClose}
                    className="form-control  btn btn-danger"
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-2">
                  <button className="form-control addbutton">Update</button>
                </div>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
}
