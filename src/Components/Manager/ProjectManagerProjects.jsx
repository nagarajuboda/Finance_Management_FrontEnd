import "../../../src/assets/Styles/Projects.css";
import { useEffect } from "react";
import "../../../src/assets/Styles/Employee.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerService from "../../Service/ManagerService/ManagerService";
export default function ProjectManagerProjects() {
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
  var id = userDetails.employee.id;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [Projects, setProjects] = useState([]);
  const [selectedProjectIds, setSelectedProjectIds] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    FetchData();
  }, [selectedProjectIds]);
  const FetchData = async () => {
    const response = await ManagerService.FcnGetprojectByManager(id);
    const result = response.data;
    setProjects(result.item);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredEmployees = Projects.filter((project) => {
    return (
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectID.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
  const ViewProject = (projectid) => {
    sessionStorage.setItem("id", projectid);
    navigate("/dashboard/ViewProject");
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
            paddingTop: "15px",
          }}
        >
          <div className="col-2">
            <p
              className="Project-list-content ms-3"
              style={{ fontSize: "14px" }}
            >
              Project list
            </p>
          </div>
          <div className="col-4"></div>
          <div className="col-2">
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
          <div className="col-4">
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
                    project.status == 1 && (
                      <tr
                        key={index}
                        className="tablebody"
                        style={{ backgroundColor: "white", cursor: "pointer" }}
                      >
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.id)}
                        >
                          {project.projectID}
                        </td>
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.id)}
                        >
                          {project.projectName}
                        </td>
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.id)}
                        >
                          {project.projectClient.clientName}
                        </td>
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.id)}
                        >
                          {project.manager.firstName} {project.manager.lastName}
                        </td>
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.id)}
                        >
                          {project.startDate}
                        </td>
                        <td
                          style={{ fontSize: "14px" }}
                          onClick={(e) => ViewProject(project.id)}
                        >
                          {project.endDate}
                        </td>
                      </tr>
                    )
                )
              ) : (
                <tr style={{ width: "100%" }}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: "left" }}>No Records Found</td>
                  <td></td>
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
