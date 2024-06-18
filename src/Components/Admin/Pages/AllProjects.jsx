import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "../../../assets/Styles/AllProduct.css";
import one from "../../../assets/Images/1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { ProgressBar } from "react-bootstrap";

export default function AllProjects() {
  const [dataReady, setDataReady] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [getAll, setAllProjects] = useState([]);

  function viewClickfunction(e, index) {
    e.preventDefault();
    setActiveProjectIndex(index === activeProjectIndex ? null : index);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://localhost:44377/api/Project/GetAllProjects"
        );
        setAllProjects(response.data);
        setDataReady(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (dataReady) {
      $("#example").DataTable();
    }
  }, [dataReady]);

  return (
    <div className="AllProductmaindiv">
      <div className="card">
        <div className="AddProjects">
          <p className="contentallproject">All Projects</p>
          <Link to="/analytics/AddProject" className="addprojectlink">
            Add New Project
          </Link>
        </div>
        <table id="example" className="tableclasss table table-borderless w-0">
          <thead>
            <tr className="headerth">
              <th></th>
              <th>Project Name</th>
              <th className="heradercontenth">Project Type</th>
              <th>Clients</th>
              <th>Due Date</th>
              <th>Progress</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="tboddycal">
            {getAll.map((project, index) => (
              <tr key={index} className="trclass">
                <td>
                  <input type="checkbox" />
                </td>
                <td className="namefiend">{project.projectName}</td>
                <td className="namefiend">{project.projectType}</td>
                <td className="namefiend">
                  <div className="clientimaeanem">
                    <div>
                      <img
                        src={one}
                        alt=""
                        width="40px"
                        className="clientimage"
                      />
                    </div>
                    <div>
                      <p className="ms-2">Samantha William</p>
                    </div>
                  </div>
                </td>
                <td className="namefiend">{project.endDate}</td>
                <td className="namefiend">{project.progress}</td>
                <td>
                  <div style={{ cursor: "pointer" }}>
                    <svg
                      onClick={(e) => viewClickfunction(e, index)}
                      xmlns="http://www.w3.org/2000/svg"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    </svg>
                  </div>
                  {activeProjectIndex === index && (
                    <div className="Project-view">
                      <div className="card viewProjectCard">
                        <div className="project-items">
                          <Link to="/Login" className="viewlink">
                            View
                          </Link>
                        </div>
                        <div className="project-items">
                          <Link to="/Login" className="editlink">
                            Edit
                          </Link>
                        </div>
                        <div className="project-items">
                          <Link to="/Login" className="deletelink">
                            Delete
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
