import "../../assets/Styles/EditEmployeepopup.css";
import { TextField } from "@mui/material";
import { useState } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import pulsimage from "../../assets/Images/plus.png";
const EditEmployeePopup = ({ isEditOpen, handleEditClose }) => {
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
          style={{ marginTop: "20px", marginLeft: "0", marginRight: "0" }}
        >
          <div className="col-4">
            <TextField
              style={{ border: "#DCDCDC" }}
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              placeholder="IARCXXXX"
              InputLabelProps={{
                className: "custom-label",
              }}
              InputProps={{
                sx: {
                  height: "36px",
                  width: "291px",
                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
          <div className="col-4">
            <TextField
              style={{ border: "#DCDCDC" }}
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              placeholder="IARCXXXX"
              InputLabelProps={{
                className: "custom-label",
              }}
              InputProps={{
                sx: {
                  height: "36px",
                  width: "291px",
                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
          <div className="col-4">
            <TextField
              style={{ border: "#DCDCDC" }}
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              placeholder="IARCXXXX"
              InputLabelProps={{
                className: "custom-label",
              }}
              InputProps={{
                sx: {
                  height: "36px",
                  width: "291px",
                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="row m-0 employeeUpdateSkills">
          <div className="col-4">
            <TextField
              style={{ border: "#DCDCDC" }}
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              placeholder="IARCXXXX"
              InputLabelProps={{
                className: "custom-label",
              }}
              InputProps={{
                sx: {
                  height: "36px",
                  width: "291px",
                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
          <div className="col-4">
            <TextField
              style={{ border: "#DCDCDC" }}
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              placeholder="IARCXXXX"
              InputLabelProps={{
                className: "custom-label",
              }}
              InputProps={{
                sx: {
                  height: "36px",
                  width: "291px",
                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
          <div className="col-4">
            <TextField
              style={{ border: "#DCDCDC" }}
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              placeholder="IARCXXXX"
              InputLabelProps={{
                className: "custom-label",
              }}
              InputProps={{
                sx: {
                  height: "36px",
                  width: "291px",
                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="row m-0   employeeUpdateSkills">
          <div className="col-4">
            <TextField
              style={{ border: "#DCDCDC" }}
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              placeholder="IARCXXXX"
              InputLabelProps={{
                className: "custom-label",
              }}
              InputProps={{
                sx: {
                  height: "36px",
                  width: "291px",
                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
          <div className="col-4">
            <TextField
              style={{ border: "#DCDCDC" }}
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              placeholder="IARCXXXX"
              InputLabelProps={{
                className: "custom-label",
              }}
              InputProps={{
                sx: {
                  height: "36px",
                  width: "291px",
                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
          <div className="col-4">
            <TextField
              style={{ border: "#DCDCDC" }}
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              placeholder="IARCXXXX"
              InputLabelProps={{
                className: "custom-label",
              }}
              InputProps={{
                sx: {
                  height: "36px",
                  width: "291px",
                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="row m-0 employeeUpdateSkills">
          <div
            className="col-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <TextField
                id="outlined-basic"
                label="Add Skills"
                variant="outlined"
                placeholder="Add Skills"
                InputLabelProps={{
                  className: "custom-label",
                }}
                InputProps={{
                  sx: {
                    height: "36px",
                    width: "250px",
                    "& input::placeholder": {
                      fontSize: "12px",
                      opacity: 1,
                      height: "16px",
                      textAlign: "left",
                      fontWeight: "600",
                      lineHeight: "12px",
                      color: "#AEAEAE",
                    },
                  },
                }}
              />
            </div>
            <div className="" style={{ marginRight: "39px" }}>
              <img src={pulsimage} alt="" width="35px" height="36px" />
            </div>
          </div>
          <div className="col-8">
            <TextField
              id="outlined-basic"
              label="Add Skills"
              variant="outlined"
              placeholder="Add Skills"
              multiline
              rows={4}
              InputLabelProps={
                {
                  //className: "custom-label",
                }
              }
              InputProps={{
                sx: {
                  height: "85px",

                  "& input::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                    backgroundColor: "#FFFFFF",
                    backgroundPosition: "0% 0%",
                    backgroundRepeat: "no-repeat",
                    border: " 1px solid #DCDCDC",
                    borderRadius: "5px",
                  },
                  "& textarea::placeholder": {
                    fontSize: "12px",
                    opacity: 1,
                    height: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                    lineHeight: "12px",
                    color: "#AEAEAE",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn-submit">Submit</button>
          <button className="btn-cancel" onClick={handleEditClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeePopup;
