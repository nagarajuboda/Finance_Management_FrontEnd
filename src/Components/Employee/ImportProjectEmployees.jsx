import React, { useState, useRef, useEffect } from "react";
import { LiaFileUploadSolid } from "react-icons/lia";
import fileupload from "../../assets/Images/FileUpload.png";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const ImportProjectEmployees = ({ IsProjectOpen1, handleClose1 }) => {
  const [AllEmployees, setAllEmployees] = useState([]);
  const [inactiveEmployees, setInactiveEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  //   if (!isOpen) return null;
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  useEffect(() => {
    if (!IsProjectOpen1) {
      removefile();
    }
  }, [IsProjectOpen1]);
  const removefile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input field
    }
  };
  const InsertbulkData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await axios.post(
      "https://localhost:44305/api/Projects/AddBulkEmployees",
      formData
    );
    var result = response.data;

    if (!selectedFile) {
      alert("Please select an Excel sheet.");
      return;
    }
    if (result.isSuccess) {
      if (result.item.item2 == false) {
        // setAllEmployees(result.item.item1);
        // setEmployees(
        //   result.item.item1.filter((emp) => emp.employeeStatus === 1)
        // );
        // setInactiveEmployees(
        //   result.item.item1.filter((emp) => emp.employeeStatus === 0)
        // );
        //  fetchEmployees();
        Swal.fire({
          title: "Good job!",
          text: "Data inserted successfully done ...",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          handleClose1(); // Call the parent component's close handler
        });
        setSelectedFile(null);
        fileInputRef.current.value = "";
        if (!IsProjectOpen1) return null;
      } else {
        var emails = result.item.item1
          .map((obj) => obj.employeeId)
          .filter(
            (employeeId) => employeeId !== null && employeeId !== undefined
          );
        console.log(emails, "=========>");
        let formattedEmails = `<span style:"color:"black">Employees Already exsit:</span><br>${emails.join(
          "<br>"
        )}`;

        Swal.fire({
          title: "Error!",
          html: `<div style="width: auto; max-height: 80px; overflow-y: auto; overflow-x: hidden;">
          <span style="font-weight: 600; color: black;">${formattedEmails.replace(
            /,/g,
            "<br>"
          )}</span>
        </div>`,
          icon: "error",
          confirmButtonText: "Cancel",
          //footer:
          //'<a href="#" style="color: red;">This value already exists</a>',
        });
      }
    } else {
      var errorresponse = result.item.map((obj) => obj);
      let formattedErrors = errorresponse.join(", ");
      console.log(formattedErrors);
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
  if (!IsProjectOpen1) return null;

  return (
    <div className="popup-overlay">
      <form onSubmit={InsertbulkData}>
        <div className="popup-content">
          <div className="popuheader">
            <h2 className="headercontent">Import Records</h2>
            <sapn className="cancelicon1">
              <i
                class="bi bi-x-lg"
                onClick={handleClose1}
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
              {/* <label htmlFor="file">
                <img
                  src={fileupload}
                  alt="Upload"
                  className="uploadfileimage"
                />

                <p className="choosefile">
                  <span className="choosefilespan">Choose File</span>
                </p>
                <span className="cancelicon">No file chosen</span>
              </label> */}
            </div>
          </div>
          <div className="popup-actions">
            <button className="submit-btn">Submit</button>
            <button className="cancel-btn" onClick={handleClose1}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
};

export default ImportProjectEmployees;
