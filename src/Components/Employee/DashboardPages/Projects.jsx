import { useEffect, useState } from "react";
import EmployeeService from "../../../Service/EmployeeService/EmployeeService";
import { Link } from "react-router-dom";
import { data } from "jquery";
import { useNavigate } from "react-router-dom";
export default function Projects() {
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState([]);
  useEffect(() => {
    FetchData();
  }, []);
  async function FetchData() {
    var response = await EmployeeService.FcnGetProjectMangerProjects(
      userDetails.employee.id
    );
    setProjectDetails(response.item);
  }
  function ProjectNameclick(e, index, id) {
    e.preventDefault();

    localStorage.setItem("projectId", id);

    navigate("/Dashboard/ViewProject");
  }
  return (
    <div className="maindivv">
      <div className="card" style={{ borderRadius: "0px" }}>
        <p
          className="allprojectcontent"
          style={{
            fontSize: "1.25rem",
            color: "#196e8a",
            fontFamily: " sans-serif;",
            fontWeight: "700",
          }}
        >
          All Projects
        </p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Project Name
              </th>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Project Type
              </th>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Start Date
              </th>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Deadline
              </th>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Progress{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {projectDetails.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No projects available.
                </td>
              </tr>
            ) : (
              projectDetails.map((user, index) => (
                <tr key={index}>
                  <td>
                    <Link
                      onClick={(e) => ProjectNameclick(e, index, user.id)}
                      style={{ color: "blue" }}
                    >
                      {user.projectName}
                    </Link>
                  </td>
                  <td>{user.projectType}</td>
                  <td>{user.startDate}</td>
                  <td>{user.endDate}</td>
                  <td>{`${user.progress}${"%"}`}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
