import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import "../../assets/Styles/SuccessPopup.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ellips from "../../assets/Images/Ellipse.png";
import checkimage from "../../assets/Images/check.png";
const SuccessPopup = ({ open, onClose, actionType }) => {
  console.log(actionType, "========>");
  if (!open) return null;
  return (
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
        <button className="unique-popup-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
