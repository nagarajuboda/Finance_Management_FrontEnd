import { useState, useEffect } from "react";
import ManagerService from "../../Service/ManagerService/ManagerService";
import "../../../src/assets/Styles/UnderManagerEmployees.css";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UnderManagerEmployees() {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
  const [employees, setEmployees] = useState([]);
  const [project, Setallprojects] = useState([]);
  useEffect(() => {
    fetchData1();
  }, []);
  async function fetchData1() {
    try {
      const response = await axios.get(
        "https://localhost:44305/api/Projects/GetAllProjects"
      );
      const result = response.data;
      Setallprojects(result.item);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function employeeDetaails(id) {
    localStorage.setItem("empId", id);
    navigate("/USFinance/AddRevenue");
  }

  return (
    <div>
      <div className="card" style={{ borderRadius: "0px" }}>
        <div className="employeecontent">Projects</div>
        <div>
          <table className="table table-striped table-hover mt-4">
            <thead>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Project ID
              </th>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Project Name
              </th>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Client Name
              </th>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Start Date
              </th>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                DeadLine
              </th>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Status
              </th>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Progress
              </th>
              <th style={{ backgroundColor: "#196e8a", color: "white" }}>
                Currency Type
              </th>
            </thead>
            <tbody>
              {project.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No records in the table
                  </td>
                </tr>
              ) : (
                project.map((obj, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => employeeDetaails(obj.project.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <td className="">
                        <Link>
                          <p style={{ color: "blue", cursor: "pointer" }}>
                            {obj.project.projectID}
                          </p>
                        </Link>
                      </td>
                      <td className="">{obj.project.projectName} </td>
                      <td>{obj.client.clientName}</td>
                      <td className="">{obj.project.startDate}</td>
                      <td>{obj.project.endDate}</td>
                      <td>
                        {project.status == 0 ? <p>Active</p> : <p>InActive</p>}
                      </td>
                      <td>{obj.project.progress}</td>
                      <td>{obj.project.currencyType}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
