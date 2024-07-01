import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "../../../assets/Styles/AllProduct.css";
import one from "../../../assets/Images/1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

export default function AllProjects() {
  const navigate = useNavigate();
  const [dataReady, setDataReady] = useState(false);
  const [getAll, setAllProjects] = useState([]);

  function viewClickfunction(e, index, id) {
    e.preventDefault();
    navigate("/Dashboard/ViewProject", { state: { id } });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://localhost:44305/api/Projects/GetAllProjects"
        );
        const result = response.data;
        setAllProjects(result.item);
        setDataReady(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (dataReady) {
      // Destroy existing DataTable before re-initializing
      if ($.fn.dataTable.isDataTable("#example")) {
        $("#example").DataTable().destroy();
      }
      // Initialize DataTable
      $("#example").DataTable();
    }
  }, [dataReady, getAll]);

  return (
    <div className="AllProductmaindiv">
      <div className="card">
        <div className="AddProjects">
          <p className="contentallproject">All Projects</p>
          <Link to="/Dashboard/AddProject" className="addprojectlink">
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
              <tr
                key={index}
                className="trclass"
                onClick={(e) => viewClickfunction(e, index, project.id)}
              >
                <td></td>
                <td className="namefiend">{project.projectName}</td>
                <td className="namefiend">{project.projectType}</td>
                <td className="namefiend">
                  <div className="clientimaeanem">
                    <div>
                      <p className="ms-2">Samantha William</p>
                    </div>
                  </div>
                </td>
                <td className="namefiend">{project.endDate}</td>
                <td className="namefiend">
                  <ProgressBar
                    completed={project.progress}
                    bgColor="green"
                    animateOnRender={true}
                    style={{ width: "20px" }}
                  />
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
