import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/Styles/Employee.css";
import editicon from "../../assets/Images/Editicon.png";
import deleteicon from "../../assets/Images/deleteicon.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ellips from "../../assets/Images/Ellipse.png";
import checkimage from "../../assets/Images/check.png";

import ImportPopup from "./ImportPopup";
import EditEmployeePopup from "./EditEmployeePopup";
import SuccessPopup from "./SuccessPopup";
import axios from "axios";

export default function Employees() {
  const navigate = useNavigate();
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isopen, setisopen] = useState(false);
  const [tableInitialized, setTableInitialized] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const tableRef = useRef(null);
  const searchInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    FetchData();
  }, []);
  const FetchData = async () => {
    const response = await axios.get(
      "https://localhost:44305/api/Employees/AllEmployees"
    );
    setEmployees(response.data);
  };
  const handleOpenPopup = async (e, index, id) => {
    setActionType("employeeDelete");

    var response = await axios.put(
      `https://localhost:44305/api/Employees/DeleteEmployee?id=${id}`
    );
    var result = response.data;
    if (result.isSuccess == true) {
      setOpen(true);
    }
  };
  const closeDeletePopup = () => {
    FetchData();
    setOpen(false);
  };

  useEffect(() => {
    if (employees.length > 0 && !tableInitialized) {
      const dataTable = $(tableRef.current).DataTable({
        ordering: false,
        lengthMenu: [
          [10, 25, 50, -1],
          [
            "Show 10 Entities",
            "Show 25 Entities",
            "Show 50 Entities",
            "Show All",
          ],
        ],
        language: {
          lengthMenu: "_MENU_",
        },
        columnDefs: [{ orderable: false, targets: 0 }],
      });

      // Manual search functionality
      searchInputRef.current.addEventListener("keyup", function () {
        dataTable.search(this.value).draw();
      });

      setTableInitialized(true);
    }

    return () => {
      if (tableInitialized) {
        $(tableRef.current).DataTable().destroy();
        setTableInitialized(false);
      }
    };
  }, [employees, tableInitialized]);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };

  const Addemployeefuncton = async () => {
    navigate("/dashboard/AddEmployee");
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  // const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const [isEditPopupOpen, setEditIsPopupOpen] = useState(false);
  const EdittogglePopup = () => setEditIsPopupOpen(!isEditPopupOpen);

  return (
    <div className="Employeemaindiv">
      <div className="employeeheader">Employees</div>
      <div className="Employeelist">
        <div
          className="row"
          style={{
            paddingTop: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="col-2">
            <p className="employeecontent">Employee list</p>
          </div>
          <div
            className="col-4"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <input
              type="text"
              className="searchinput"
              ref={searchInputRef}
              placeholder="Search employees"
              style={{ width: "300px", padding: "5px" }}
            />
          </div>
          <div className="col-6 row">
            <div className="col-3">
              <select
                className="numberpagenation"
                onChange={(e) => {
                  const length = e.target.value;
                  $(tableRef.current).DataTable().page.len(length).draw();
                }}
              >
                <option value="10">Show 10 Entities</option>
                <option value="25">Show 25 Entities</option>
                <option value="50">Show 50 Entities</option>
                <option value="-1">Show All</option>
              </select>
            </div>
            <div className="col-2">
              <button className="importbutton import-btn" onClick={togglePopup}>
                Import
              </button>
            </div>
            <div className="col-2">
              <div className="dropdown">
                <a
                  className="importdropwlist dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Export to
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li className="dropdonwli">
                    <a className="dropdown-item" href="#">
                      MS Excel XLX
                    </a>
                  </li>
                  <li className="dropdonwli">
                    <a className="dropdown-item" href="#">
                      MS Excel CSV
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Adobe PDF
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-2">
              <button className="DeleteRecordbutton">Delete Selected</button>
            </div>
            <div
              className="col-3"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <button
                className="addemployeebutton"
                onClick={Addemployeefuncton}
              >
                <span>
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: "17px" }}
                  ></i>
                </span>
                Add Employee
              </button>
            </div>
          </div>
        </div>
        <div>
          <table
            id="example"
            className="employeeTable"
            ref={tableRef}
            style={{ width: "98.5%" }}
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
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Date of Joining</th>
                <th>Status</th>
                <th>Role</th>
                <th>Manager</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <tr
                    key={index}
                    className="tablebody"
                    style={{ backgroundColor: "white" }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        className="row-checkbox userCheckbox"
                      />
                    </td>
                    <td>{employee.employeeId}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobileNo}</td>
                    <td>
                      {new Date(employee.dateOfJoining).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td>
                      {employee.employeeStatus === 1 ? "Active" : "Inactive"}
                    </td>
                    <td>{employee.role}</td>
                    <td>{employee.projectManager}</td>
                    <td>
                      <img
                        src={editicon}
                        onClick={EdittogglePopup}
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
                        onClick={(e) => handleOpenPopup(e, index, employee.id)}
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
                <tr className="tablebody" style={{ backgroundColor: "white" }}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>No recordson the table</td>
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
        <EditEmployeePopup
          isEditOpen={isEditPopupOpen}
          handleEditClose={EdittogglePopup}
        />
        <ImportPopup isOpen={isPopupOpen} handleClose={togglePopup} />
      </div>
    </div>
  );
}
