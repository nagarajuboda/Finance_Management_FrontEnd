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
    console.log(id, "id");
    localStorage.setItem("projectId", id);
    // navigate("/Employee/ViewProject");
    navigate("/Dashboard/ViewProject");
  }
  console.log(projectDetails, "details");
  return (
    <div className="maindivv">
      <div className="card">
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
              <th>Project Name</th>
              <th>Project Type</th>
              <th>Start Date</th>
              <th>Deadline</th>
              <th>Progress </th>
            </tr>
          </thead>
          {projectDetails.length == 0 ? (
            <p
              style={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No Projects{" "}
            </p>
          ) : (
            <tbody>
              {projectDetails.map((user, index) => (
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
                  <td>{user.progress}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
