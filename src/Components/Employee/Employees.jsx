import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/Styles/Employee.css";
import editicon from "../../assets/Images/Editicon.png";
import deleteicon from "../../assets/Images/deleteicon.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import images from "../../assets/Images/User.png";
import axios from "axios";
import EditEmployeePopup from "./EditEmployeePopup";
import ImportPopup from "./ImportPopup";
import ellips from "../../assets/Images/Ellipse.png";
import checkimage from "../../assets/Images/check.png";
export default function Employees() {
  const navigate = useNavigate();
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditIsPopupOpen] = useState(false);
  const [disiblebuttons, setDisiblebuttons] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setid] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  useEffect(() => {
    FetchData();
  }, []);

  const EdittogglePopup = (e, index, employeeid) => {
    sessionStorage.setItem("EmployeeID", employeeid);
    navigate("/dashboard/EditEmployee");
    // setid(employeeid);
    // setEditIsPopupOpen(!isEditPopupOpen);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const FetchData = async () => {
    const response = await axios.get(
      "https://localhost:44305/api/Employees/GetAllEmployees"
    );
    var result = response.data.item;
    setEmployees(result);
  };

  const handleOpenPopup = async (e, index, id) => {
    var response = await axios.put(
      `https://localhost:44305/api/Employees/DeleteEmployee?id=${id}`
    );
    var result = response.data;
    if (result.isSuccess === true) {
      FetchData();
      setOpen(true);
    }
  };

  const closeDeletePopup = () => {
    setOpen(false);
  };
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const allEmployeeIds = currentItems.map(
        (employee) => employee.employeeDetails.id
      );
      setSelectedEmployeeIds(allEmployeeIds);
      setDisiblebuttons(false);
    } else {
      setSelectedEmployeeIds([]);
      setDisiblebuttons(true); // Disable buttons if none are selected
    }
    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };

  const Addemployeefuncton = () => {
    navigate("/dashboard/AddEmployee");
  };
  const DeleteSelectedRecords = async () => {
    const response = await axios.put(
      "https://localhost:44305/api/Employees/DeleteSelectedEmployees",
      selectedEmployeeIds
    );
    const result = response.data;

    if (result.isSuccess) {
      setOpen(true);
      FetchData();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.employeeDetails.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      employee.employeeDetails.lastName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      employee.employeeDetails.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      employee.employeeDetails.employeeId
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleCheckboxChange = (employeeId, isChecked) => {
    setSelectedEmployeeIds((prevSelected) => {
      if (isChecked) {
        setDisiblebuttons(false);
        return [...prevSelected, employeeId];
      } else {
        setDisiblebuttons(true);
        return prevSelected.filter((id) => id !== employeeId);
      }
    });
  };
  const DownloadExcel = async (listtype, filetype) => {
    try {
      const response = await axios.get(
        `https://localhost:44305/DownloadFile?listType=${listtype}&fileType=${filetype}`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);

      const fileName = `${listtype}_data.${
        filetype === "pdf" ? "pdf" : "xlsx"
      }`;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="Employeemaindiv">
      <div className="employeeheader">Employees</div>
      <div className="Employeelist">
        <div
          className="d-flex justify-content-between"
          style={{
            paddingTop: "25px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <p className="employeecontent">Employee list</p>
          </div>
          <div className="row">
            <div className="col-3">
              <input
                type="text"
                className="searchinput form-control"
                placeholder="Search employees"
                onChange={handleSearchChange}
                value={searchQuery}
              />
            </div>
            <div className="col-2" style={{ cursor: "pointer" }}>
              <select
                style={{ cursor: "pointer", fontSize: "12px" }}
                className="numberpagenation"
                onChange={handleItemsPerPageChange}
                value={itemsPerPage}
              >
                <option value="10" style={{ fontSize: "12px" }}>
                  Show 10 Entities
                </option>
                <option value="25" style={{ fontSize: "12px" }}>
                  Show 25 Entities
                </option>
                <option value="50" style={{ fontSize: "12px" }}>
                  Show 50 Entities
                </option>
                <option value="-1" style={{ fontSize: "12px" }}>
                  Show All
                </option>
              </select>
            </div>
            <div className="col-auto ms-2">
              <button
                style={{ fontSize: "12px", height: "30px" }}
                className="btn btn-primary"
                onClick={() => setIsPopupOpen(true)}
              >
                Import
              </button>
            </div>
            <div className="col-auto">
              <div className="importdropdown px-2">
                <a
                  className="importdropwlist dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontSize: "12px", height: "30px" }}
                >
                  Export to
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li
                    className="dropdonwli"
                    onClick={() => DownloadExcel("employees", "excel")}
                  >
                    <p className="dropdown-item" style={{ fontSize: "12px" }}>
                      MS Excel
                    </p>
                  </li>

                  <li>
                    <p
                      style={{ fontSize: "12px" }}
                      className="dropdown-item"
                      onClick={() => DownloadExcel("employees", "pdf")} // Pass parameters correctly
                    >
                      Adobe PDF
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-2">
              <button
                // className="DeleteRecordbutton deleteSelectedSpan"
                className="btn btn-danger"
                disabled={disiblebuttons}
                onClick={DeleteSelectedRecords}
                style={{ fontSize: "12px", height: "30px" }}
              >
                Delete Selected
              </button>
            </div>
            <div className="col-auto">
              <button
                style={{
                  display: "flex",
                  width: "auto",
                  justifyContent: "center",
                  alignContent: "center",
                  padding: "5px",
                  height: "30px",
                }}
                className="add-new-project-button"
                onClick={Addemployeefuncton}
              >
                <span>
                  <img
                    src={images}
                    alt=""
                    height="15px"
                    width="15px"
                    className="mb-3"
                  />
                </span>
                <span
                  className=" ms-1"
                  style={{
                    fontSize: "12px",
                    color: "#000000",
                    fontWeight: "bold",
                  }}
                >
                  Add Employee
                </span>
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: "10px" }}>
          <table
            id="example"
            className="employeeTable"
            style={{ width: "100%" }}
            // style={{ width: "100%" }}
          >
            <thead>
              <tr className="tableheader">
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    className="userCheckbox"
                  />
                </th>
                <th style={{ fontSize: "12px" }}>Employee ID</th>
                <th style={{ fontSize: "12px" }}>First Name</th>
                <th style={{ fontSize: "12px" }}>Last Name</th>
                <th style={{ fontSize: "12px" }}>Email</th>
                <th style={{ fontSize: "12px" }}>Mobile Number</th>
                <th style={{ fontSize: "12px" }}>Date of Joining</th>
                <th style={{ fontSize: "12px" }}>Status</th>
                <th style={{ fontSize: "12px" }}>Role</th>
                <th style={{ fontSize: "12px" }}>Manager</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((employee, index) => (
                  <tr
                    key={employee.employeeDetails.id}
                    className="tablebody"
                    style={{ backgroundColor: "white" }}
                  >
                    <td style={{ textAlign: "start" }}>
                      <input
                        type="checkbox"
                        className="row-checkbox "
                        onChange={(e) =>
                          handleCheckboxChange(
                            employee.employeeDetails.id,
                            e.target.checked
                          )
                        }
                      />
                    </td>
                    <td style={{ fontSize: "12px" }}>
                      {employee.employeeDetails.employeeId}
                    </td>
                    <td style={{ fontSize: "12px" }}>
                      {employee.employeeDetails.firstName}
                    </td>
                    <td style={{ fontSize: "12px" }}>
                      {employee.employeeDetails.lastName}
                    </td>
                    <td style={{ fontSize: "12px" }}>
                      {employee.employeeDetails.email}
                    </td>
                    <td style={{ fontSize: "12px" }}>
                      {employee.employeeDetails.mobileNo}
                    </td>
                    <td style={{ fontSize: "12px" }}>
                      {new Date(
                        employee.employeeDetails.dateOfJoining
                      ).toLocaleDateString("en-GB")}
                    </td>
                    <td style={{ fontSize: "12px" }}>
                      {employee.employeeDetails.employeeStatus}
                    </td>
                    <td style={{ fontSize: "12px" }}>
                      {employee.roleDetails.roleName}
                    </td>
                    <td style={{ fontSize: "12px" }}>
                      {employee.reportingManagerDetails !== "N/A"
                        ? `${employee.reportingManagerDetails.firstName} ${employee.reportingManagerDetails.lastName}`
                        : "N/A"}
                    </td>
                    <td>
                      <img
                        src={editicon}
                        onClick={(e) =>
                          EdittogglePopup(e, index, employee.employeeDetails.id)
                        }
                        alt=""
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                    <td>
                      <img
                        src={deleteicon}
                        onClick={(e) =>
                          handleOpenPopup(e, index, employee.employeeDetails.id)
                        }
                        alt=""
                        style={{
                          width: "24px",
                          height: "24px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                // <tr
                //   className="tablebody"
                //   style={{
                //     backgroundColor: "white",
                //     display: "flex",
                //     alignItems: "center",
                //     justifyContent: "center",
                //   }}
                // >
                //   <td></td>
                //   <td></td>
                //   <td></td>
                //   <td></td>
                //   <td> No recordson the tablesss</td>
                //   <td></td>
                //   <td></td>
                //   <td></td>
                //   <td></td>
                // </tr>
                <tr style={{ width: "100%" }}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>No Records Found</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {open && (
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
              <p className="unique-popup-message">
                Click OK to see the results
              </p>
              <button
                className="unique-popup-button"
                onClick={closeDeletePopup}
              >
                OK
              </button>
            </div>
          </div>
        )}
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            style={{ fontSize: "10px" }}
          >
            <span> Prev</span>
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                style={{ fontSize: "10px", color: "black", fontWeight: "600" }}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "active-page" : ""}
              >
                {page}
              </button>
            )
          )}

          <button
            style={{ fontSize: "10px", color: "black", fontWeight: "600" }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <ImportPopup isOpen={isPopupOpen} handleClose={togglePopup} />
      </div>
    </div>
  );
}
