import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/Styles/Employee.css";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { apiurl } from "../../Service/createAxiosInstance";
import EmployeeService from "../../Service/EmployeeService/EmployeeService";
export default function ListOfEmployees() {
  const navigate = useNavigate();

  const [disiblebuttons, setDisiblebuttons] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
  useEffect(() => {
    FetchData();
  }, [selectedEmployeeIds, isDivVisible]);

  const FetchData = async () => {
    const response = await EmployeeService.GetEmployees();
    var result = response.item;
    setEmployees(result);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
      let updatedSelected;
      if (isChecked) {
        updatedSelected = [...prevSelected, employeeId];
      } else {
        updatedSelected = prevSelected.filter((id) => id !== employeeId);
      }

      if (updatedSelected.length === 0) {
        setDisiblebuttons(true);
      } else {
        setDisiblebuttons(false);
      }

      return updatedSelected;
    });
  };
  const DownloadExcel = async (listtype, filetype) => {
    let response;
    try {
      if (isDivVisible == false) {
        response = await EmployeeService.fcnExportEmployees(
          listtype,
          filetype,
          "Active"
        );
      } else {
        response = await EmployeeService.fcnExportEmployees(
          listtype,
          filetype,
          "Inactive"
        );
      }

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
  const ViewDetails = (employeeid) => {
    sessionStorage.setItem("id", employeeid);
    navigate("/dashboard/EmployeeDetails");
  };
  const [deleteEmployeebuttondisible, setDeleteEmployeebuttonDisibled] =
    useState(true);

  const handleCheckboxChange1 = (e) => {
    setIsDivVisible(e.target.checked);
    setDeleteEmployeebuttonDisibled(false);
  };
  return (
    <div className="Employeemaindiv">
      <div className="employeeheader">Employees</div>
      <div className="Employeelist">
        <div className="row" style={{ paddingTop: "15px" }}>
          {isDivVisible ? (
            <div
              className="col-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p className="employeecontent" style={{ fontSize: "14px" }}>
                Employee's Deactivated
              </p>
            </div>
          ) : (
            <div
              className="col-2 "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p className="employeecontent me-5" style={{ fontSize: "14px" }}>
                Employee list
              </p>
            </div>
          )}
          <div className="col-3"></div>

          <div
            className="col-3"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <input
              type="text"
              className="searchinput"
              placeholder="Search employees"
              onChange={handleSearchChange}
              value={searchQuery}
              style={{
                fontSize: "14px",
                padding: "0px 8px",
                width: "100%",
                height: "36px",
                paddingRight: "30px",
                boxSizing: "border-box",
              }}
            />
            <i
              className="bi bi-search"
              style={{
                fontSize: "18px",
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
                pointerEvents: "none",
              }}
            ></i>
          </div>

          <div
            className="col-2"
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              onChange={handleCheckboxChange1}
              className="DeleteCheckbox"
              style={{ height: "16px", width: "16px" }}
            />
            {!isDivVisible ? (
              <button
                disabled
                style={{
                  fontSize: "13px",

                  color: "black",
                }}
                className="Show-Deleted-employee-button ms-1"
              >
                Show Deleted Employees
              </button>
            ) : (
              <button
                disabled={deleteEmployeebuttondisible}
                style={{
                  fontSize: "12px",
                }}
                className="Show-Deleted-employee-button ms-1"
              >
                <span className="deleteSelectedd"> Deleted Employees</span>
              </button>
            )}
          </div>
          <div className="col-1" style={{ padding: "0px" }}>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                className="importdropdown btn btn-primary"
                style={{ fontSize: "14px", height: "36px" }}
              >
                Export To
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ paddingTop: "10px" }}>
                <Dropdown.Item
                  onClick={() => DownloadExcel("employees", "excel")}
                >
                  <p
                    className=""
                    style={{ fontSize: "14px", cursor: "pointer" }}
                  >
                    MS Excel
                  </p>
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ marginTop: "5px" }}
                  onClick={() => DownloadExcel("employees", "pdf")}
                >
                  Adobe PDF
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div style={{ padding: "10px" }}>
          <table
            id="example"
            className="employeeTable"
            style={{ width: "100%" }}
          >
            <thead>
              <tr className="tableheader">
                <th style={{ fontSize: "14px" }}>Employee ID</th>
                <th style={{ fontSize: "14px" }}>First Name</th>
                <th style={{ fontSize: "14px" }}>Last Name</th>
                <th style={{ fontSize: "14px" }}>Email</th>
                <th style={{ fontSize: "14px" }}>Mobile Number</th>
                <th style={{ fontSize: "14px" }}>Date of Joining</th>
                {!isDivVisible && <th style={{ fontSize: "14px" }}>Status</th>}

                <th style={{ fontSize: "14px" }}>Role</th>
                <th style={{ fontSize: "14px" }}>Reporting Manager</th>
                {isDivVisible && (
                  <th style={{ fontSize: "14px" }}>Date of Relieving</th>
                )}
                {!isDivVisible && <th></th>}
                {!isDivVisible && <th></th>}
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((employee, index) =>
                  !isDivVisible
                    ? employee.employeeDetails.employeeStatus === 1 && (
                        <tr
                          key={employee.employeeDetails.id}
                          className="tablebody"
                          style={{
                            backgroundColor: "white",
                            cursor: "pointer",
                          }}
                        >
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            <span className="ms-2">
                              {employee.employeeDetails.employeeId}
                            </span>
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {employee.employeeDetails.firstName}
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {employee.employeeDetails.lastName}
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {employee.employeeDetails.email}
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {employee.employeeDetails.mobileNo}
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {new Date(
                              employee.employeeDetails.dateOfJoining
                            ).toLocaleDateString("en-GB")}
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            Active
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {employee.roleDetails.roleName}
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {employee.reportingManagerDetails !== "N/A"
                              ? `${employee.reportingManagerDetails.firstName} ${employee.reportingManagerDetails.lastName}`
                              : "N/A"}
                          </td>
                        </tr>
                      )
                    : employee.employeeDetails.employeeStatus === 0 && (
                        <tr
                          key={employee.employeeDetails.id}
                          className="tablebody"
                          style={{
                            backgroundColor: "white",
                            cursor: "pointer",
                          }}
                        >
                          <td
                            style={{ fontSize: "14px ms-2" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {employee.employeeDetails.employeeId}
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {employee.employeeDetails.firstName}
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {employee.employeeDetails.lastName}
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {employee.employeeDetails.email}
                          </td>
                          <td
                            style={{ fontSize: "14px" }}
                            onClick={(e) =>
                              ViewDetails(employee.employeeDetails.id)
                            }
                          >
                            {employee.employeeDetails.mobileNo}
                          </td>
                          <td style={{ fontSize: "14px" }}>
                            {new Date(
                              employee.employeeDetails.dateOfJoining
                            ).toLocaleDateString("en-GB")}
                          </td>

                          <td style={{ fontSize: "14px" }}>
                            {employee.roleDetails.roleName}
                          </td>
                          <td style={{ fontSize: "14px" }}>
                            {employee.reportingManagerDetails !== "N/A"
                              ? `${employee.reportingManagerDetails.firstName} ${employee.reportingManagerDetails.lastName}`
                              : "N/A"}
                          </td>
                          <td
                            style={{
                              fontSize: "14px",
                            }}
                          >
                            {employee.employeeDetails.dateOfReliving}
                          </td>
                        </tr>
                      )
                )
              ) : (
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <select
            style={{ cursor: "pointer", fontSize: "14px" }}
            className="numberpagenation ms-2"
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
          >
            <option value="10" style={{ fontSize: "14px" }}>
              Show 10 Entities
            </option>
            <option value="25" style={{ fontSize: "14px" }}>
              Show 25 Entities
            </option>
            <option value="50" style={{ fontSize: "14px" }}>
              Show 50 Entities
            </option>
            <option value="-1" style={{ fontSize: "14px" }}>
              Show All
            </option>
          </select>
          <div className="pagination">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              style={{ fontSize: "14px" }}
            >
              <span> Prev</span>
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  style={{
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "600",
                  }}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "active-page" : ""}
                >
                  {page}
                </button>
              )
            )}

            <button
              style={{ fontSize: "14px", color: "black", fontWeight: "600" }}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
