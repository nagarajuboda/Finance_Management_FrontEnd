import axios from "axios";
import "../../../assets/Styles/Projects.css";
import { useEffect } from "react";

import { useState } from "react";
import { isPast } from "date-fns";
import image from "../../../assets/Images/Editicon.png";
import deleteimage from "../../../assets/Images/deleteicon.png";
import userimage from "../../../assets/Images/User.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import elipisimage from "../../../assets/Images/Ellipse.png";
import checkimage from "../../../assets/Images/check.png";
// import imagees from "../../assets/Images/Ellipse.png";
// import userimaeg from "../../assets/Images/check.png";
export default function Projectss() {
  const navigate = useNavigate();
  const [Projects, setProjects] = useState([]);
  const [tableInitialized, setTableInitialized] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const tableRef = useRef(null);
  const searchInputRef = useRef(null);
  useEffect(() => {
    FetchData();
  }, []);
  const FetchData = async () => {
    const response = await axios.get(
      "https://localhost:44305/api/Projects/GetAllProjects"
    );
    const result = response.data;
    setProjects(result.item);
  };
  //   const handleOpenPopup = async (e, index, id) => {
  //     debugger;
  //     var response = await axios.put(
  //       `https://localhost:44305/api/Employees/DeleteEmployee?id=${id}`
  //     );
  //     var result = response.data;
  //     if (result.isSuccess == true) {
  //       console.log(result);
  //       setOpen(true);
  //     }
  //   };

  useEffect(() => {
    if (Projects.length > 0 && !tableInitialized) {
      const dataTable = $(tableRef.current).DataTable({
        ordering: false,
        lengthMenu: [
          [10, 25, 50, -1],
          [
            "Show 10 Entities",
            "Show 25 Entities",
            "Show 50 Entities",
            "Show All",
          ],
        ],
        language: {
          lengthMenu: "_MENU_",
        },
        columnDefs: [{ orderable: false, targets: 0 }],
        pagingType: "simple_numbers",
        info: false,
      });

      searchInputRef.current.addEventListener("keyup", function () {
        dataTable.search(this.value).draw();
      });

      setTableInitialized(true);
    }

    return () => {
      if (tableInitialized) {
        $(tableRef.current).DataTable().destroy();
        setTableInitialized(false);
      }
    };
  }, [Projects, tableInitialized]);
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  };
  const AddNewProject = () => {
    navigate("/Dashboard/AddProject");
  };
  const DeleteProject = async (e, index, projectid) => {
    debugger;
    var response = await axios.put(
      `https://localhost:44305/api/Projects/DeleteProject?id=${projectid}`
    );
    var result = response.data;
    if (result.isSuccess) {
      debugger;
      const updatedProjects = Projects.filter((pro) => {
        pro.project.id !== projectid;
      });
      console.log(updatedProjects, "=======.");
      await FetchData();
      setOpen(true);
    }
  };
  const DeleteMessageClose = async () => {
    setOpen(false);
  };
  return (
    <div className="">
      <p className="project-list-content">Projects</p>
      <div className="AllProject-maindiv">
        <div
          className="row"
          style={{
            paddingTop: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="col-2">
            <p className="employeecontent">Project list</p>
          </div>
          <div
            className="col-4"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <input
              type="text"
              className="searchinput"
              ref={searchInputRef}
              placeholder="Search Projects"
              style={{ width: "300px", padding: "5px" }}
            />
          </div>
          <div className="col-6 row">
            <div className="col-4">
              <select
                className="numberpagenation"
                onChange={(e) => {
                  const length = e.target.value;
                  $(tableRef.current).DataTable().page.len(length).draw();
                }}
              >
                <option value="10">Show 10 Entities</option>
                <option value="25">Show 25 Entities</option>
                <option value="50">Show 50 Entities</option>
                <option value="-1">Show All</option>
              </select>
            </div>

            <div className="col-3">
              <button className="DeleteRecordbutton">
                <span
                  className="deleteSelectedSpan"
                  style={{ fontSize: "13px" }}
                >
                  Delete Selected
                </span>
              </button>
            </div>
            <div
              className="col-4"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <button
                style={{ display: "flex" }}
                className="add-new-project-button"
                onClick={AddNewProject}
              >
                <span>
                  <img
                    src={userimage}
                    alt=""
                    height="18px"
                    width="18px"
                    className="ms-2"
                  />
                </span>
                <span className="add-new-project-span ms-1 ">
                  Add New Project
                </span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <table
            id="example"
            className="employeeTable"
            ref={tableRef}
            style={{ width: "98.5%" }}
          >
            <thead>
              <tr className="tableheader">
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    className="userCheckbox"
                  />
                </th>
                <th style={{ textAlign: "start" }}>Project ID</th>
                <th>Project Name</th>
                <th>Clients</th>
                <th>Project Manager</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Projects.length > 0 ? (
                Projects.map(
                  (project, index) =>
                    project.project.status === 1 && (
                      <tr
                        key={index}
                        className="tablebody"
                        style={{ backgroundColor: "white" }}
                      >
                        <td style={{ textAlign: "start" }}>
                          <input
                            type="checkbox"
                            className="row-checkbox userCheckbox"
                          />
                        </td>
                        <td style={{ textAlign: "start", fontSize: "12px" }}>
                          {project.project.projectID}
                        </td>
                        <td style={{ fontSize: "12px" }}>
                          {project.project.projectName}
                        </td>
                        <td style={{ fontSize: "12px" }}>
                          {project.client.clientName}
                        </td>
                        <td style={{ fontSize: "12px" }}>
                          {project.employee.firstName}{" "}
                          {project.employee.lastName}
                        </td>
                        <td style={{ fontSize: "12px" }}>
                          {project.project.startDate}
                        </td>
                        <td style={{ fontSize: "12px" }}>
                          {project.project.endDate}
                        </td>
                        <td>
                          <img
                            src={image}
                            // onClick={EdittogglePopup}
                            onClick={(e) =>
                              EdittogglePopup(e, index, employee.id)
                            }
                            alt=""
                            style={{
                              width: "18px",
                              height: "18px",
                              cursor: "pointer",
                            }}
                          />
                          <img
                            className="ms-3"
                            src={deleteimage}
                            onClick={(e) =>
                              DeleteProject(e, index, project.project.id)
                            }
                            alt=""
                            style={{
                              width: "24px",
                              height: "24px",
                              cursor: "pointer",
                            }}
                          />
                        </td>
                      </tr>
                    )
                )
              ) : (
                <tr className="tablebody" style={{ backgroundColor: "white" }}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>No recordson the table</td>
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
      </div>
    </div>
  );
}
