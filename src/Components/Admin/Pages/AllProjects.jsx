import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "../../../assets/Styles/AllProduct.css";
import one from "../../../assets/Images/1.jpg";
import { Link } from "react-router-dom";

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [isVisibleProfile, setIsVisibleProfile] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);

  function viewClickfunction(e, index) {
    e.preventDefault();
    setActiveProjectIndex(index === activeProjectIndex ? null : index);
  }

  useEffect(() => {
    const sampleData = [
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Raju",
        type: "App Design",
        client: "Profile",
        dueDate: "2011-04-25",
        progress: "61",
      },
      {
        name: "Tiger Nixon",
        type: "System Architect",
        client: "Edinburgh",
        dueDate: "2011-04-25",
        progress: "61",
      },
    ];
    setProjects(sampleData);
    setDataReady(true);
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
          <Link to="" className="addprojectlink">
            Add New Project
          </Link>
        </div>
        <table
          id="example"
          className="tableclasss table  table-borderless w-0 "
        >
          <thead>
            <tr className="headerth">
              <th></th> {/* This empty th is for the checkbox */}
              <th>Project Name</th>
              <th className="heradercontenth">Project Type</th>
              <th>Clients</th>
              <th>Due Date</th>
              <th>Progress</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="tboddycal">
            {projects.map((project, index) => (
              <tr key={index} className="trclass">
                {/* Render data for each project */}
                <td>
                  <input type="checkbox" />
                </td>
                <td className="namefiend">{project.name}</td>
                <td className="namefiend">{project.type}</td>
                <td className="namefiend">
                  <div className="clientimaeanem ">
                    <div className="">
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
                <td className="namefiend">{project.dueDate}</td>
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
