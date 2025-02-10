import { useState, useEffect } from "react";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllProjects() {
  const navigate = useNavigate();
  const [Projects, setProjects] = useState([]);
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
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
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const ViewProject = (projectid) => {
    sessionStorage.setItem("id", projectid);

    navigate("/dashboard/USFinance/AddRevenue");
  };

  return (
    <div>
      <div className="">
        <p className="listofProjectContents" style={{ fontSize: "16px" }}>
          List of Projects
        </p>
        <div className="AllProject-maindiv">
          <div
            className=""
            style={{
              paddingTop: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className=" ms-3">
              <p className="Project-list-content" style={{ fontSize: "14px" }}>
                Project list
              </p>
            </div>

            <div
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
                style={{
                  width: "280px",
                  padding: "5px",
                  fontSize: "14px",
                  height: "36px",
                }}
              />
              <i
                className="bi bi-search"
                style={{
                  fontSize: "18px",
                  position: "absolute",
                  left: "255px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#888",
                  pointerEvents: "none",
                }}
              ></i>
            </div>
            <div className=" me-2">
              <select
                className="numberpagenation me-2"
                style={{ cursor: "pointer", height: "36px" }}
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
          </div>
          <div style={{ padding: "10px" }}>
            <table
              id="example"
              className="employeeTable"
              style={{ width: "100%" }}
            >
              <thead>
                <tr className="tableheader">
                  <th style={{ fontSize: "14px" }}>Project ID</th>
                  <th style={{ fontSize: "14px" }}>Project Name</th>
                  <th style={{ fontSize: "14px" }}>Clients</th>
                  <th style={{ fontSize: "14px" }}>Project Manager</th>
                  <th style={{ fontSize: "14px" }}>Start Date</th>
                  <th style={{ fontSize: "14px" }}>End Date</th>
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
                          style={{
                            backgroundColor: "white",
                            cursor: "pointer",
                          }}
                          onClick={(e) => ViewProject(project.project.id)}
                        >
                          <td style={{ fontSize: "14px" }}>
                            {project.project.projectID}
                          </td>
                          <td style={{ fontSize: "14px" }}>
                            {project.project.projectName}
                          </td>
                          <td style={{ fontSize: "14px" }}>
                            {project.client.clientName}
                          </td>
                          <td style={{ fontSize: "14px" }}>
                            {project.employee.firstName}{" "}
                            {project.employee.lastName}
                          </td>
                          <td style={{ fontSize: "14px" }}>
                            {project.project.startDate}
                          </td>
                          <td style={{ fontSize: "14px" }}>
                            {project.project.endDate}
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
