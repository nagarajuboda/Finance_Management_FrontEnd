import axios from "axios";
import "../../../assets/Styles/Projects.css";
import { useEffect } from "react";
import "../../../assets/Styles/Employee.css";
import { useState } from "react";
import { isPast } from "date-fns";
import image from "../../../assets/Images/Editicon.png";
import deleteimage from "../../../assets/Images/deleteicon.png";
import userimage from "../../../assets/Images/User.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import elipisimage from "../../../assets/Images/Ellipse.png";
import checkimage from "../../../assets/Images/check.png";
import { CoPresentOutlined } from "@mui/icons-material";

export default function Projectss() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [Projects, setProjects] = useState([]);
  const [disiblebuttons, setDisiblebuttons] = useState(true);
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    FetchData();
  }, [selectedProjectIds]);
  const FetchData = async () => {
    const response = await axios.get(
      "https://localhost:44305/api/Projects/GetAllProjects"
    );
    const result = response.data;
    setProjects(result.item);
  };

  const AddNewProject = () => {
    navigate("/Dashboard/AddProject");
  };
  const DeleteProject = async (e, index, projectid) => {
    var response = await axios.put(
      `https://localhost:44305/api/Projects/DeleteProject?id=${projectid}`
    );
    var result = response.data;

    if (result.isSuccess) {
      FetchData();
      setOpen(true);
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredEmployees = Projects.filter((project) => {
    return (
      project.project.projectName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      project.project.projectID
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const DeleteMessageClose = async () => {
    setOpen(false);
  };
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
  const ViewProject = (projectid) => {
    sessionStorage.setItem("id", projectid);
    navigate("/dashboard/ViewProject");
  };

  const handleCheckboxChange = (projectid, isChecked) => {
    setSelectedProjectIds((prevSelected) => {
      let updatedSelected;
      if (isChecked) {
        updatedSelected = [...prevSelected, projectid];
      } else {
        updatedSelected = prevSelected.filter((id) => id !== projectid);
      }

      if (updatedSelected.length === 0) {
        setDisiblebuttons(true);
      } else {
        setDisiblebuttons(false);
      }

      return updatedSelected;
    });
  };

  const DeleteSelectedRecords = async () => {
    const response = await axios.put(
      "https://localhost:44305/api/Projects/DeleteSelectedProjects",
      selectedProjectIds
    );
    const result = response.data;

    if (result.isSuccess) {
      setOpen(true);
      FetchData();
    }
  };
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const allProjectIds = currentItems.map((project) => project.project.id);
      setSelectedProjectIds(allProjectIds);
      setDisiblebuttons(false);
    } else {
      setSelectedProjectIds([]);
      setDisiblebuttons(true);
    }
    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };

  return (
    <div className="">
      <p className="project-list-content" style={{ fontSize: "16px" }}>
        Projects
      </p>
      <div className="AllProject-maindiv">
        <div
          className="row"
          style={{
            paddingTop: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="col-2">
            <p className="Project-list-content" style={{ fontSize: "14px" }}>
              Project list
            </p>
          </div>
          <div className="col-1"></div>
          <div
            className="col-3"
            style={{
              position: "relative",
            }}
          >
            <input
              type="text"
              onChange={handleSearchChange}
              value={searchQuery}
              className="searchinput "
              placeholder="Search Projects"
              style={{ width: "280px", padding: "5px", fontSize: "14px" }}
            />
            <i
              className="bi bi-search"
              style={{
                fontSize: "18px",
                position: "absolute",
                left: "270px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
                pointerEvents: "none",
              }}
            ></i>
          </div>
          <div className="col-6 row">
            <div className="col-1"></div>
            <div className="col-4 ">
              <select
                className="numberpagenation"
                style={{ cursor: "pointer", height: "36px" }}
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
            </div>

            <div
              className="col-3 "
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <button
                className="btn btn-danger"
                disabled={disiblebuttons}
                onClick={DeleteSelectedRecords}
                style={{ fontSize: "14px", height: "36px" }}
              >
                Delete Selected
              </button>
            </div>
            <div
              className="col-4"
              style={{ display: "flex", justifyContent: "start" }}
            >
              <button
                style={{
                  display: "flex",
                  width: "auto",
                  justifyContent: "center",
                  alignContent: "center",
                  padding: "5px",
                  height: "36px",
                }}
                className="add-new-project-button"
                onClick={AddNewProject}
              >
                <span>
                  <img
                    src={userimage}
                    alt=""
                    height="18px"
                    width="18px"
                    className="mb-2"
                  />
                </span>
                <span
                  className=" ms-1"
                  style={{
                    fontSize: "14px",
                    color: "#000000",
                    fontWeight: "bold",
                  }}
                >
                  Add New Project
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
          >
            <thead>
              <tr className="tableheader">
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    style={{ height: "15px", width: "15px" }}
                    className="userCheckbox row-checkbox"
                  />
                </th>
                <th style={{ fontSize: "14px" }}>Project ID</th>
                <th style={{ fontSize: "14px" }}>Project Name</th>
                <th style={{ fontSize: "14px" }}>Clients</th>
                <th style={{ fontSize: "14px" }}>Project Manager</th>
                <th style={{ fontSize: "14px" }}>Start Date</th>
                <th style={{ fontSize: "14px" }}>End Date</th>
                <th style={{ fontSize: "14px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map(
                  (project, index) =>
                    project.project.status == 1 && (
                      <tr
                        key={index}
                        className="tablebody"
                        style={{ backgroundColor: "white", cursor: "pointer" }}
                      >
                        <td style={{ textAlign: "start" }}>
                          <input
                            type="checkbox"
                            className="row-checkbox "
                            onChange={(e) =>
                              handleCheckboxChange(
                                project.project.id,
                                e.target.checked
                              )
                            }
                          />
                        </td>
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.project.id)}
                        >
                          {project.project.projectID}
                        </td>
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.project.id)}
                        >
                          {project.project.projectName}
                        </td>
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.project.id)}
                        >
                          {project.client.clientName}
                        </td>
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.project.id)}
                        >
                          {project.employee.firstName}{" "}
                          {project.employee.lastName}
                        </td>
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.project.id)}
                        >
                          {project.project.startDate}
                        </td>
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.project.id)}
                        >
                          {project.project.endDate}
                        </td>
                        <td>
                          <img
                            className="ms-3"
                            src={deleteimage}
                            onClick={(e) =>
                              DeleteProject(e, index, project.project.id)
                            }
                            alt=""
                            style={{
                              width: "28px",
                              height: "28px",
                              cursor: "pointer",
                            }}
                          />
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
                  <td>No Records Found</td>
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
                    src={elipisimage}
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
                onClick={DeleteMessageClose}
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
            style={{ fontSize: "14px" }}
          >
            <span> Prev</span>
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                style={{ fontSize: "14px", color: "black", fontWeight: "600" }}
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
  );
}
