import React, { useState, useRef, useEffect } from "react";
import { LiaFileUploadSolid } from "react-icons/lia";
import fileupload from "../../assets/Images/FileUpload.png";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const ImportPopup = ({ isOpen, handleClose }) => {
  const [AllEmployees, setAllEmployees] = useState([]);
  const [inactiveEmployees, setInactiveEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile();
    }
  };
  useEffect(() => {
    if (!isOpen) {
      removefile();
    }
  }, [isOpen]);
  const removefile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const InsertbulkData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await axios.post(
      "https://localhost:44305/api/Employees/BulkInsert",
      formData
    );
    var result = response.data;

    if (!selectedFile) {
      alert("Please select an Excel sheet.");
      return;
    }
    if (result.isSuccess) {
      if (result.item.item2 == false) {
        setAllEmployees(result.item.item1);
        setEmployees(
          result.item.item1.filter((emp) => emp.employeeStatus === 1)
        );
        setInactiveEmployees(
          result.item.item1.filter((emp) => emp.employeeStatus === 0)
        );
        fetchEmployees();
        Swal.fire({
          title: "Good job!",
          text: "Data inserted successfully done ...",
          icon: "success",
          confirmButtonText: "OK",
        });
        setSelectedFile(null);
        fileInputRef.current.value = "";
      } else {
        let vlauesss = [];
        var emails = result.item.item1
          .map((obj) => obj.email)
          .filter((email) => email !== null && email !== undefined);
        var ids = result.item.item1
          .map((obj) => obj.employeeId)
          .filter((id) => id !== null && id !== undefined);
        var empnumbers = result.item.item1
          .map((obj) => obj.mobileNo)
          .filter((mobileNo) => mobileNo !== null && mobileNo !== undefined);

        let formattedEmails = `<span style:"color:"black">EmailIDs:</span><br>${emails.join(
          "<br>"
        )}`;
        let formattedIds = `EmployeeIds:<br>${ids.join("<br>")}`;
        let formattedNumbers = `PhoneNumbers:<br>${empnumbers.join("<br>")}`;

        let formattedText = `${formattedEmails}<br><br>${formattedIds}<br><br>${formattedNumbers}`;
        Swal.fire({
          title: "Error!",
          html: `<div style="width: auto; max-height: 80px; overflow-y: auto; overflow-x: hidden;">
          <span style="font-weight: 600; color: black;">${formattedText.replace(
            /,/g,
            "<br>"
          )}</span>
        </div>`,
          icon: "error",
          confirmButtonText: "Cancel",
        });
      }
    } else {
      var errorresponse = result.item.map((obj) => obj);
      let formattedErrors = errorresponse.join(", ");
      Swal.fire({
        title: "Error!",
        html: `<div style="width: auto; max-height: 80px; overflow-y: auto; overflow-x: hidden;">
            <span style="font-weight: 600; font-size:0.90rem;color: red;">${formattedErrors.replace(
              /,/g,
              "<br>"
            )}</span>
          </div>`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  if (!isOpen) return null;
  return (
    <div className="popup-overlay">
      <form onSubmit={InsertbulkData}>
        <div className="popup-content">
          <div className="popuheader">
            <h2 className="headercontent">Import Records</h2>
            <sapn className="cancelicon1">
              <i
                class="bi bi-x-lg"
                onClick={handleClose}
                style={{ cursor: "pointer" }}
              ></i>
            </sapn>
          </div>

          <div className="file-upload-section">
            <div className="file-input">
              {/* <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                ref={fileInputRef}
              /> */}
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <label htmlFor="file">
                <img
                  src={fileupload}
                  alt="Upload"
                  className="upload-file-image uploadfileimage"
                />
                <p className="choose-file">
                  <span className="choose-file-span">Choose File</span>
                </p>
                <span className="cancel-icon">
                  {selectedFile ? selectedFile.name : "No file chosen"}
                </span>
              </label>
            </div>
          </div>
          <div className="popup-actions">
            <button
              className="submit-btn"
              style={{ height: "36px", fontSize: "14px" }}
            >
              <span style={{ fontSize: "14px" }}> Submit</span>
            </button>
            <button
              className="cancel-btn"
              onClick={handleClose}
              style={{ height: "36px" }}
            >
              <span style={{ fontSize: "14px" }}>Cancel</span>
            </button>
          </div>
        </div>
      </form>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
};

export default ImportPopup;
