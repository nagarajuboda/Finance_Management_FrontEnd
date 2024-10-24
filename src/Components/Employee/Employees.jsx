import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/Styles/Employee.css";
import editicon from "../../assets/Images/Editicon.png";
import deleteicon from "../../assets/Images/deleteicon.png";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import ImportPopup from "./ImportPopup";
import EditEmployeePopup from "./EditEmployeePopup";
import SuccessPopup from "./SuccessPopup";
export default function Employees() {
  const navigate = useNavigate();
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isopen, setisopen] = useState(false);
  const tableRef = useRef(null);
  const searchInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsSuccessPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsSuccessPopupOpen(false);
  };
  useEffect(() => {
    if ($.fn.dataTable.isDataTable("#example")) {
      $("#example").DataTable().destroy();
    }
    const dataTable = $("#example").DataTable({
      ordering: false,
      lengthMenu: [
        [10, 25, 50, -1],
        [
          `Show 10 Entities`,
          `Show 25 Entities`,
          `Show 50 Entities`,
          `Show All`,
        ],
      ],
      language: {
        lengthMenu: "_MENU_",
      },
      columnDefs: [{ orderable: false, targets: 0 }],
    });

    //Manual search functionality
    searchInputRef.current.addEventListener("keyup", function () {
      dataTable.search(this.value).draw();
    });

    return () => {
      dataTable.destroy();
    };
  }, []);

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
  const [isEditPopupOpen, setEditIsPopupOpen] = useState(false);

  const EdittogglePopup = () => {
    setEditIsPopupOpen(!isEditPopupOpen);
  };
  const employees = [
    {
      employeeId: "E001",
      firstName: "Tiger",
      lastName: "Nixon",
      email: "tiger.nixon@example.com",
      mobileNumber: "123-456-7890",
      dateOfJoining: "2011-04-25",
      status: "Active",
      role: "System Architect",
      projectManager: "John Smith",
    },
    {
      employeeId: "E002",
      firstName: "Colleen",
      lastName: "Hurst",
      email: "colleen.hurst@example.com",
      mobileNumber: "234-567-8901",
      dateOfJoining: "2009-09-15",
      status: "Active",
      role: "Javascript Developer",
      projectManager: "Jane Doe",
    },
    {
      employeeId: "E003",
      firstName: "Charde",
      lastName: "Marshall",
      email: "charde.marshall@example.com",
      mobileNumber: "345-678-9012",
      dateOfJoining: "2008-10-16",
      status: "Inactive",
      role: "Regional Director",
      projectManager: "Alice Johnson",
    },
    {
      employeeId: "E004",
      firstName: "Angelica",
      lastName: "Ramos",
      email: "angelica.ramos@example.com",
      mobileNumber: "456-789-0123",
      dateOfJoining: "2009-10-09",
      status: "Active",
      role: "Chief Executive Officer (CEO)",
      projectManager: "Bob Brown",
    },
    {
      employeeId: "E005",
      firstName: "Gavin",
      lastName: "Joyce",
      email: "gavin.joyce@example.com",
      mobileNumber: "567-890-1234",
      dateOfJoining: "2010-12-22",
      status: "Active",
      role: "Developer",
      projectManager: "Charlie White",
    },
    {
      employeeId: "E006",
      firstName: "Quinn",
      lastName: "Flynn",
      email: "quinn.flynn@example.com",
      mobileNumber: "678-901-2345",
      dateOfJoining: "2013-03-03",
      status: "Inactive",
      role: "Support Lead",
      projectManager: "Diana Green",
    },
    {
      employeeId: "E007",
      firstName: "Raju",
      lastName: "Singh",
      email: "raju.singh@example.com",
      mobileNumber: "789-012-3456",
      dateOfJoining: "2013-03-03",
      status: "Active",
      role: "Support Lead",
      projectManager: "Emily Blue",
    },
    {
      employeeId: "E008",
      firstName: "Katherine",
      lastName: "Johnson",
      email: "katherine.johnson@example.com",
      mobileNumber: "890-123-4567",
      dateOfJoining: "2014-06-15",
      status: "Active",
      role: "HR Manager",
      projectManager: "Frank Yellow",
    },
    {
      employeeId: "E009",
      firstName: "Michael",
      lastName: "Williams",
      email: "michael.williams@example.com",
      mobileNumber: "901-234-5678",
      dateOfJoining: "2015-08-23",
      status: "Inactive",
      role: "Data Analyst",
      projectManager: "Grace Black",
    },
    {
      employeeId: "E010",
      firstName: "Laura",
      lastName: "Davis",
      email: "laura.davis@example.com",
      mobileNumber: "012-345-6789",
      dateOfJoining: "2016-11-02",
      status: "Active",
      role: "Marketing Specialist",
      projectManager: "Hannah Pink",
    },
    {
      employeeId: "E011",
      firstName: "James",
      lastName: "Brown",
      email: "james.brown@example.com",
      mobileNumber: "123-456-7890",
      dateOfJoining: "2017-01-15",
      status: "Active",
      role: "Product Manager",
      projectManager: "Ian Grey",
    },
    {
      employeeId: "E012",
      firstName: "Emma",
      lastName: "Jones",
      email: "emma.jones@example.com",
      mobileNumber: "234-567-8901",
      dateOfJoining: "2018-02-18",
      status: "Inactive",
      role: "UX Designer",
      projectManager: "Jack White",
    },
    {
      employeeId: "E013",
      firstName: "Noah",
      lastName: "Garcia",
      email: "noah.garcia@example.com",
      mobileNumber: "345-678-9012",
      dateOfJoining: "2019-03-30",
      status: "Active",
      role: "Software Engineer",
      projectManager: "Kelly Red",
    },
    {
      employeeId: "E014",
      firstName: "Olivia",
      lastName: "Martinez",
      email: "olivia.martinez@example.com",
      mobileNumber: "456-789-0123",
      dateOfJoining: "2020-04-12",
      status: "Active",
      role: "Sales Executive",
      projectManager: "Liam Purple",
    },
    {
      employeeId: "E015",
      firstName: "Ava",
      lastName: "Hernandez",
      email: "ava.hernandez@example.com",
      mobileNumber: "567-890-1234",
      dateOfJoining: "2021-05-19",
      status: "Inactive",
      role: "Content Writer",
      projectManager: "Mia Green",
    },
    {
      employeeId: "E016",
      firstName: "Sophia",
      lastName: "Lopez",
      email: "sophia.lopez@example.com",
      mobileNumber: "678-901-2345",
      dateOfJoining: "2022-06-05",
      status: "Active",
      role: "DevOps Engineer",
      projectManager: "Noah Brown",
    },
    {
      employeeId: "E017",
      firstName: "Isabella",
      lastName: "Wilson",
      email: "isabella.wilson@example.com",
      mobileNumber: "789-012-3456",
      dateOfJoining: "2023-07-22",
      status: "Active",
      role: "Business Analyst",
      projectManager: "Oliver Grey",
    },
    {
      employeeId: "E018",
      firstName: "Mia",
      lastName: "Anderson",
      email: "mia.anderson@example.com",
      mobileNumber: "890-123-4567",
      dateOfJoining: "2024-08-11",
      status: "Inactive",
      role: "Graphic Designer",
      projectManager: "Penny Gold",
    },
    {
      employeeId: "E019",
      firstName: "Charlotte",
      lastName: "Thomas",
      email: "charlotte.thomas@example.com",
      mobileNumber: "901-234-5678",
      dateOfJoining: "2024-09-18",
      status: "Active",
      role: "Network Engineer",
      projectManager: "Quincy Blue",
    },
    {
      employeeId: "E020",
      firstName: "Amelia",
      lastName: "Taylor",
      email: "amelia.taylor@example.com",
      mobileNumber: "012-345-6789",
      dateOfJoining: "2024-10-01",
      status: "Active",
      role: "IT Support",
      projectManager: "Rachel Black",
    },
  ];

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
            <p className="employeecontent ">Employee list</p>
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

            {/* <i
              class="bi bi-search"
              style={{
                position: "relative",
                left: "287px",
                top: "11px",
                color: "#7F7F7F",
              }}
            ></i> */}
          </div>

          <div className="col-6 row">
            <div className="col-3">
              <select
                className="numberpagenation"
                onChange={(e) => {
                  const length = e.target.value;
                  const dataTable = $(tableRef.current).DataTable();
                  dataTable.page.len(length).draw();
                }}
              >
                <option value="10" className="paginationoptions">
                  Show 10 Entities
                </option>
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
                <th className="">
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
                <th>Date f Joining</th>
                <th>Status</th>
                <th>Role</th>
                <th>Project Manager</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
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
                  <td style={{ marginLeft: "5px" }}>{employee.employeeId}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobileNumber}</td>
                  <td>{employee.dateOfJoining}</td>
                  <td>{employee.status}</td>
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
                      onClick={handleOpenPopup}
                      alt=""
                      style={{
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SuccessPopup open={isSuccessPopupOpen} onClose={handleClosePopup} />
        <EditEmployeePopup
          isEditOpen={isEditPopupOpen}
          handleEditClose={EdittogglePopup}
        />
        <ImportPopup isOpen={isPopupOpen} handleClose={togglePopup} />
      </div>
    </div>
  );
}
