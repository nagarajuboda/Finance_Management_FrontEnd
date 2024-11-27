import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../assets/Styles/ViewProject.css";
import $, { data } from "jquery";
import { ToastContainer, toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import withReactContent from "sweetalert2-react-content";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "datatables.net";
import { IoArrowBackCircle } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { IoMdAddCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import AdminDashboardServices from "../../Service/AdminService/AdminDashboardServices";
import { getSessionData } from "../../Service/SharedSessionData";
import ImportPopup from "../Employee/ImportPopup";
import userimage from "../../assets/Images/User.png";
import deleteImage from "../../assets/Images/deleteicon.png";

import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
export function ViewProject() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [Projectresponse, setresponse] = useState({});
  const [projectEmployess, setProjectEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);
  const handleClose = () => setShow(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [Employeeids, setIds] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [ProjectValues, setProjectValues] = useState({});
  const [clientvalues, setClientValues] = useState({});
  const [dataReady, setDataReady] = useState(false);
  const [GetAllemployees, setEmployees] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [projectManagerEmail, setProjectMangerEmail] = useState("");
  const [projectManagerName, setProjectMangerName] = useState("");
  const [sessiondata, setSessiondata] = useState(null);
  const [projectManagers, setProjectManagers] = useState([]);
  const [projectManagername, setProjectManagerName] = useState("");
  const navigate = useNavigate();
  const [sessionData, setSessionDataState] = useState(null);
  const [projectStartDate1, setprojectStartDate] = useState("");
  const [projectDeadline1, setprojectDeadline] = useState("");
  const [searchText, setSearchText] = useState("");
  const ProjectID = sessionStorage.getItem("id");
  const [isOpen, setisOpen] = useState(false);
  const [Projects, setProjects] = useState([]);
  const [status, setStatus] = useState("InActive");
  const [ProjectProgress, setProjectprogress] = useState(0);
  const [employeelist, setEmployeelist] = useState([]);
  const [ReportingManagerId, setReportingManagerId] = useState("");
  //const [status, setStatus] = useState(0);
  const [projectemp, setprojectemp] = useState([
    {
      employeeid: "IARC001",
      name: "Nagaraju",
      email: "nagaraju.boda@archents.com",
      mobile: "9515858174",
      role: "Project Manager",
      projectTask: "Planning",
      dateofjoining: "10/05/2023",
    },
    {
      employeeid: "IARC002",
      name: "Teja",
      email: "teja.kumar@archents.com",
      mobile: "9812345678",
      role: "Software Engineer",
      projectTask: "Development",
      dateofjoining: "15/06/2022",
    },
    {
      employeeid: "IARC003",
      name: "Mohasina",
      email: "mohasina.shaik@archents.com",
      mobile: "9876543210",
      role: "Team Lead",
      projectTask: "Team Coordination",
      dateofjoining: "20/03/2021",
    },
    {
      employeeid: "IARC004",
      name: "Ramesh",
      email: "ramesh.varma@archents.com",
      mobile: "9123456789",
      role: "QA Engineer",
      projectTask: "Testing",
      dateofjoining: "12/09/2023",
    },
    {
      employeeid: "IARC005",
      name: "Sita",
      email: "sita.das@archents.com",
      mobile: "9523451234",
      role: "UI/UX Designer",
      projectTask: "Design",
      dateofjoining: "01/01/2020",
    },
    {
      employeeid: "IARC006",
      name: "Rajesh",
      email: "rajesh.patel@archents.com",
      mobile: "9534567890",
      role: "Business Analyst",
      projectTask: "Requirement Gathering",
      dateofjoining: "10/10/2022",
    },
    {
      employeeid: "IARC007",
      name: "Anjali",
      email: "anjali.roy@archents.com",
      mobile: "9456789123",
      role: "Data Scientist",
      projectTask: "Data Analysis",
      dateofjoining: "20/07/2023",
    },
    {
      employeeid: "IARC008",
      name: "Arun",
      email: "arun.kumar@archents.com",
      mobile: "9123456780",
      role: "System Administrator",
      projectTask: "System Maintenance",
      dateofjoining: "15/05/2021",
    },
    {
      employeeid: "IARC009",
      name: "Kiran",
      email: "kiran.s@archents.com",
      mobile: "9345678901",
      role: "Network Engineer",
      projectTask: "Network Configuration",
      dateofjoining: "05/02/2022",
    },
    {
      employeeid: "IARC010",
      name: "Priya",
      email: "priya.nair@archents.com",
      mobile: "9456123789",
      role: "DevOps Engineer",
      projectTask: "CI/CD Pipeline",
      dateofjoining: "25/11/2022",
    },
  ]);

  useEffect(() => {
    FetchData();
  }, [ProjectID]);
  const [selectedManagerId, setSelectedManagerId] = useState("");
  async function FetchData() {
    const Projects = await axios.get(
      "https://localhost:44305/api/Projects/GetAllProjects"
    );
    const Projectsresult = Projects.data;
    setProjects(Projectsresult.item);
    var projectManagerResponse =
      await AdminDashboardServices.GetProjectManager();
    setProjectManagers(projectManagerResponse.item);

    const userDetails = JSON.parse(localStorage.getItem("sessionData"));
    setSessiondata(userDetails.employee.role.name);
    var response1 = await AdminDashboardServices.fcngetEmployees();
    setEmployees(response1.item);
    var response = await axios.get(
      `https://localhost:44305/api/Projects/GetProject?id=${ProjectID}`
    );
    var result = response.data;
    console.log(result, "result");
    if (result.isSuccess === true) {
      setClientValues(result.item.client);
      setProjectValues(result.item.project);
      setStatus(result.item.project.status);
      setProjectprogress(result.item.project.progress);
      setReportingManagerId(result.item.project.projectManager);

      setProjectManagerName(result.item.projectMangerName);
    }
    var response = await AdminDashboardServices.fcngetEmployees();
    setEmployeelist(response.item);
  }
  const handleManagerOnChange = (event) => {
    const selectedManagerId = event.target.value;
    setReportingManagerId(selectedManagerId);
  };
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
  };
  const handleProgressChange = (event) => {
    const selectedProgress = event.target.value;
    setProjectprogress(selectedProgress);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredEmployees = projectemp.filter((project) => {
    return (
      project.employeeid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const updateEmployee = () => {
    setisOpen(true);
  };
  const handleEditClose = () => {
    setisOpen(false);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProjectValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <div className="viewProject-Main-div">
      <div className="view-Project">Project Details</div>
      <div className="view-project-div" style={{ paddingTop: "0" }}>
        <div className="row update-button-row">
          <div className="col-10"></div>
          <div className="col-2 button-col">
            <button
              className="update-button"
              //onClick={updateEmployee(ProjectValues.id)}
              onClick={(e) => updateEmployee()}
            >
              Update
            </button>
          </div>
        </div>
        <div className="row m-0  project-view-row">
          <div className="col-4">
            <p style={{ fontSize: "12px", textTransform: "uppercase" }}>
              Porject outline
            </p>
          </div>
          <div className="col-2">
            <p style={{ fontSize: "12px", textTransform: "uppercase" }}>
              Start Date
            </p>
          </div>
          <div className="col-2">
            <p style={{ fontSize: "12px", textTransform: "uppercase" }}>
              end Date
            </p>
          </div>
          <div className="col-2">
            <p style={{ fontSize: "12px", textTransform: "uppercase" }}>
              Project Manager
            </p>
          </div>
          <div className="col-2">
            <p style={{ fontSize: "12px", textTransform: "uppercase" }}>
              Project Lead
            </p>
          </div>
        </div>
        <div
          className="row m-0 p-0"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="col-2 ">
            <div class="progress" style={{ height: "10px", width: "150px" }}>
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: "25%", fontSize: "10px" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                25%
              </div>
            </div>
          </div>
          <div
            className="col-2 projectPrpgress"
            style={{ fontSize: "12px", margin: "0" }}
          >
            <p className="view-more">View more</p>
          </div>
          <div
            className="col-2 projectPrpgress"
            style={{ fontSize: "12px", margin: "0" }}
          >
            {ProjectValues.startDate}
          </div>
          <div
            className="col-2 projectPrpgress"
            style={{ fontSize: "12px", margin: "0" }}
          >
            {ProjectValues.endDate}
          </div>
          <div
            className="col-2 projectPrpgress"
            style={{ fontSize: "12px", margin: "0" }}
          >
            {projectManagername}
          </div>
          <div
            className="col-2 projectPrpgress"
            style={{ fontSize: "12px", margin: "0" }}
          >
            {projectManagername}
          </div>
        </div>
        <div
          className="row m-0 project-view-row"
          style={{ paddingTop: "45px" }}
        >
          <div className="col-2">
            <p style={{ fontSize: "12px", textTransform: "uppercase" }}>
              Client
            </p>
          </div>
          <div className="col-2">
            <p style={{ fontSize: "12px", textTransform: "uppercase" }}>
              client Email
            </p>
          </div>
          <div className="col-2">
            <p style={{ fontSize: "12px", textTransform: "uppercase" }}>
              Project Name
            </p>
          </div>
          <div className="col-6">
            <p style={{ fontSize: "12px", textTransform: "uppercase" }}>
              Description
            </p>
          </div>
        </div>
        <div className="row m-0 pt-3">
          <div
            className="col-2 "
            style={{ fontWeight: "500", fontSize: "12px" }}
          >
            {clientvalues.clientName}
          </div>
          <div
            className="col-2 "
            style={{ fontWeight: "500", fontSize: "12px" }}
          >
            {clientvalues.clientEmailId}
          </div>
          <div
            className="col-2 "
            style={{ fontWeight: "500", fontSize: "12px" }}
          >
            {ProjectValues.projectName}
          </div>
          <div
            className="col-6 "
            style={{ fontWeight: "500", fontSize: "12px" }}
          >
            {ProjectValues.description}
          </div>
        </div>
        <div className="row underline-button-row"></div>
        <div className="row m-0" style={{ paddingTop: "15px" }}>
          <div className="col-2">
            <p className="projectPrpgress"> Project Team Members</p>
          </div>
          {/* <div className="col-3" style={{ position: "relative" }}>
            <input
              type="text"
              // onChange={handleSearchChange}
              // value={searchQuery}
              className="searchinput "
              placeholder="Search employee"
              style={{ padding: "5px", fontSize: "12px" }}
            />
            <i
              className="bi bi-search"
              style={{
                fontSize: "12px",
                position: "absolute",
                left: "235px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
                pointerEvents: "none",
              }}
            ></i>
          </div> */}
          <div className="col-3" style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                className="searchinput"
                placeholder="Search employee"
                onChange={handleSearchChange}
                value={searchQuery}
                style={{
                  width: "100%",
                  padding: "5px 30px 5px 5px", // Extra padding on the right for the icon
                  fontSize: "12px",
                  boxSizing: "border-box",
                }}
              />
              <i
                className="bi bi-search"
                style={{
                  fontSize: "12px", // Adjust size if necessary
                  position: "absolute",
                  right: "10px", // Place the icon 10px from the right edge
                  color: "#888",
                  pointerEvents: "none",
                }}
              ></i>
            </div>
          </div>
          <div className="col-3"></div>
          <div
            className="col-1"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <button
              style={{ fontSize: "12px", height: "30px" }}
              className="btn btn-primary"
              onClick={() => setIsPopupOpen(true)}
            >
              Import
            </button>
          </div>
          <div
            className="col-1"
            style={{
              display: "flex",

              justifyContent: "space-between",
            }}
          >
            <div className="importdropdown " style={{ width: "100px" }}>
              <a
                className="importdropwlist dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: "12px", height: "30px" }}
              >
                Export To
              </a>
              <ul className="dropdown-menu" aria-labelledby="">
                <li
                  className=" ms-3"
                  onClick={() => DownloadExcel("employees", "excel")}
                >
                  <p
                    className=""
                    style={{ fontSize: "12px", cursor: "pointer" }}
                  >
                    MS Excel
                  </p>
                </li>
                <li style={{ cursor: "pointer" }} className="ms-3">
                  <p
                    style={{ fontSize: "12px" }}
                    className=""
                    onClick={() => DownloadExcel("employees", "pdf")}
                  >
                    Adobe PDF
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-2"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                display: "flex",
                width: "auto",
                alignContent: "center",
                padding: "4px",
                height: "30px",
              }}
              className="add-new-project-button"
              //onClick={Addemployeefuncton}
            >
              <span>
                <img
                  src={userimage}
                  alt=""
                  height="16px"
                  width="16px"
                  className="mb-2"
                />
              </span>
              <span
                className=" ms-1"
                style={{
                  fontSize: "12px",
                  color: "#000000",
                  fontWeight: "bold",
                }}
              >
                Add Employee
              </span>
            </button>
          </div>
        </div>
        <div style={{ padding: "10px" }}>
          <table
            id="example"
            className="employeeTable m-0 p-0"
            style={{ width: "100%" }}
          >
            <thead>
              <tr className="tableheader">
                <th>
                  <input
                    type="checkbox"
                    //  onChange={handleSelectAll}
                    className="userCheckbox"
                  />
                </th>
                <th style={{ fontSize: "12px", fontWeight: "500" }}>
                  Employee ID
                </th>
                <th style={{ fontSize: "12px", fontWeight: "500" }}>Name</th>
                <th style={{ fontSize: "12px", fontWeight: "500" }}>Email</th>
                <th style={{ fontSize: "12px", fontWeight: "500" }}>
                  Mobile Number
                </th>
                <th style={{ fontSize: "12px", fontWeight: "500" }}>Role</th>
                <th style={{ fontSize: "12px", fontWeight: "500" }}>
                  Project Tasks
                </th>
                <th style={{ fontSize: "12px", fontWeight: "500" }}>
                  Date Of joining
                </th>
                <th style={{ fontSize: "12px", fontWeight: "500" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee, index) => (
                  <tr
                    key={index}
                    className="tablebody"
                    style={{
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                  >
                    <td style={{ textAlign: "start" }}>
                      <input type="checkbox" className="row-checkbox " />
                    </td>
                    <td style={{ fontSize: "12px" }}>{employee.employeeid}</td>
                    <td style={{ fontSize: "12px" }}>{employee.name}</td>
                    <td style={{ fontSize: "12px" }}>{employee.email}</td>
                    <td style={{ fontSize: "12px" }}>{employee.mobile}</td>
                    <td style={{ fontSize: "12px" }}>{employee.role}</td>
                    <td style={{ fontSize: "12px" }}>{employee.projectTask}</td>
                    <td style={{ fontSize: "12px" }}>
                      {employee.dateofjoining}
                    </td>
                    <td>
                      <img
                        src={deleteImage}
                        alt=""
                        style={{
                          width: "24px",
                          height: "24px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr style={{ width: "100%" }}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>No Records Found</td>
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
        <ImportPopup isOpen={isPopupOpen} handleClose={togglePopup} />
      </div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modalheader">
              <h2 className="employeeDetailsContent">Update Project Details</h2>
              <span className="cancelicon1">
                <i
                  className="bi bi-x-lg"
                  onClick={handleEditClose}
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
            </div>

            <div
              className="row  "
              style={{
                marginTop: "20px",
                marginLeft: "7px",
                marginRight: "12px",
              }}
            >
              <div className="col-4">
                <TextField
                  label="Project ID"
                  variant="outlined"
                  name="projectID"
                  onChange={handleOnChange}
                  value={ProjectValues.projectID || ""}
                  fullWidth
                  select
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1rem",
                      "& fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000000",
                      fontSize: "0.85rem",
                      fontWeight: "500",
                      transform: "translate(15px, 9px)",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "22px",
                      padding: "8px 12px",
                      fontSize: "1rem",
                    },
                    "& .MuiInputLabel-shrink": {
                      fontSize: "1rem",
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                    "& input::placeholder": {
                      fontSize: "12px",
                      color: "#AEAEAE",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Projects && Projects.length > 0 ? (
                    Projects.map((project, index) => (
                      <MenuItem key={index} value={project.project.projectID}>
                        <span style={{ fontSize: "12px" }}>
                          {project.project.projectID}
                        </span>
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Employees Found</MenuItem>
                  )}
                </TextField>
              </div>

              <div className="col-4">
                <TextField
                  label="Start Date"
                  variant="outlined"
                  type="date"
                  name="startDate"
                  value={
                    ProjectValues.startDate
                      ? new Date(ProjectValues.startDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  //value={ProjectValues.startDate}
                  onChange={handleOnChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "12px",
                      "& fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000000",

                      fontWeight: "500",
                      transform: "translate(15px, 9px)",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "22px",
                      padding: "8px 12px",
                    },
                    "& .MuiInputLabel-shrink": {
                      fontSize: "1rem",
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                    "& input::placeholder": {
                      fontSize: "12px",
                      color: "#AEAEAE",
                    },
                  }}
                />
              </div>
              <div className="col-4">
                <TextField
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={
                    ProjectValues.endDate
                      ? new Date(ProjectValues.endDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  //  value={employeeData.lastName || ""}
                  onChange={handleOnChange}
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "12px",
                      "& fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000000",

                      fontWeight: "500",
                      transform: "translate(15px, 9px)",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "22px",
                      padding: "8px 12px",
                    },
                    "& .MuiInputLabel-shrink": {
                      fontSize: "1rem",
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                    "& input::placeholder": {
                      fontSize: "12px",
                      color: "#AEAEAE",
                    },
                  }}
                />
              </div>
            </div>
            <div
              className="row  employeeUpdateSkills"
              style={{
                marginTop: "20px",
                marginLeft: "7px",
                marginRight: "12px",
              }}
            >
              <div className="col-4">
                <TextField
                  label="ProjectName"
                  value={ProjectValues.projectName || ""}
                  onChange={handleOnChange}
                  variant="outlined"
                  name="projectName"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "12px",
                      "& fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000000",

                      fontWeight: "500",
                      transform: "translate(15px, 9px)",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "22px",
                      padding: "8px 12px",
                    },
                    "& .MuiInputLabel-shrink": {
                      fontSize: "1rem",
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                    "& input::placeholder": {
                      fontSize: "12px",
                      color: "#AEAEAE",
                    },
                  }}
                />
              </div>
              <div className="col-4">
                <TextField
                  label="Project Referance ID"
                  variant="outlined"
                  name="projectRefId"
                  value={ProjectValues.projectRefId || ""}
                  onChange={handleOnChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "12px",
                      "& fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000000",

                      fontWeight: "500",
                      transform: "translate(15px, 9px)",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "22px",
                      padding: "8px 12px",
                    },
                    "& .MuiInputLabel-shrink": {
                      fontSize: "1rem",
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                    "& input::placeholder": {
                      fontSize: "12px",
                      color: "#AEAEAE",
                    },
                  }}
                />
              </div>
              <div className="col-4">
                <TextField
                  label="Client Email"
                  variant="outlined"
                  name="clientId"
                  value={clientvalues.clientEmailId || ""}
                  onChange={handleOnChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "12px",
                      "& fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000000",

                      fontWeight: "500",
                      transform: "translate(15px, 9px)",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "22px",
                      padding: "8px 12px",
                    },
                    "& .MuiInputLabel-shrink": {
                      fontSize: "1rem",
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                    "& input::placeholder": {
                      fontSize: "12px",
                      color: "#AEAEAE",
                    },
                  }}
                />
              </div>
            </div>
            <div
              className="row  employeeUpdateSkills"
              style={{
                marginTop: "20px",
                marginLeft: "7px",
                marginRight: "12px",
              }}
            >
              <div className="col-4">
                <TextField
                  label="Project Type"
                  variant="outlined"
                  // name="status"
                  // value={status}
                  className="row-checkbox "
                  // onChange={handleStatusChange}
                  fullWidth
                  select
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "12px",
                      "& fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000000",

                      fontWeight: "500",
                      transform: "translate(15px, 9px)",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "22px",
                      padding: "8px 12px",
                    },
                    "& .MuiInputLabel-shrink": {
                      fontSize: "1rem",
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                    "& input::placeholder": {
                      fontSize: "12px",
                      color: "#AEAEAE",
                    },
                  }}
                >
                  <MenuItem value={1} style={{ fontSize: "12px" }}>
                    Active
                  </MenuItem>
                  <MenuItem value={0} style={{ fontSize: "12px" }}>
                    InActive
                  </MenuItem>
                </TextField>
              </div>
              <div className="col-4">
                <TextField
                  label="Status"
                  variant="outlined"
                  name="status"
                  value={status}
                  onChange={handleStatusChange} // Trigger handleStatusChange on change
                  fullWidth
                  select
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "12px",
                      "& fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000000",
                      fontWeight: "500",
                      transform: "translate(15px, 9px)",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "22px",
                      padding: "8px 12px",
                    },
                    "& .MuiInputLabel-shrink": {
                      fontSize: "1rem",
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                    "& input::placeholder": {
                      fontSize: "12px",
                      color: "#AEAEAE",
                    },
                  }}
                >
                  <MenuItem value={1} style={{ fontSize: "12px" }}>
                    Active
                  </MenuItem>
                  <MenuItem value={0} style={{ fontSize: "12px" }}>
                    InActive
                  </MenuItem>
                </TextField>
              </div>
              <div className="col-4">
                <TextField
                  label="Progress"
                  variant="outlined"
                  name="progress"
                  value={ProjectProgress}
                  onChange={handleProgressChange} // Trigger handleStatusChange on change
                  fullWidth
                  select
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "12px",
                      "& fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000000",
                      fontWeight: "500",
                      transform: "translate(15px, 9px)",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "22px",
                      padding: "8px 12px",
                    },
                    "& .MuiInputLabel-shrink": {
                      fontSize: "1rem",
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                    "& input::placeholder": {
                      fontSize: "12px",
                      color: "#AEAEAE",
                    },
                  }}
                >
                  <MenuItem value={10} style={{ fontSize: "12px" }}>
                    10%
                  </MenuItem>
                  <MenuItem value={20} style={{ fontSize: "12px" }}>
                    20%
                  </MenuItem>
                  <MenuItem value={30} style={{ fontSize: "12px" }}>
                    30%
                  </MenuItem>
                  <MenuItem value={40} style={{ fontSize: "12px" }}>
                    40%
                  </MenuItem>
                  <MenuItem value={50} style={{ fontSize: "12px" }}>
                    50%
                  </MenuItem>
                  <MenuItem value={60} style={{ fontSize: "12px" }}>
                    60%
                  </MenuItem>
                  <MenuItem value={70} style={{ fontSize: "12px" }}>
                    70%
                  </MenuItem>
                  <MenuItem value={80} style={{ fontSize: "12px" }}>
                    80%
                  </MenuItem>
                  <MenuItem value={90} style={{ fontSize: "12px" }}>
                    90%
                  </MenuItem>
                  <MenuItem value={100} style={{ fontSize: "12px" }}>
                    100%
                  </MenuItem>
                </TextField>
              </div>
            </div>
            <div
              className="row  employeeUpdateSkills"
              style={{
                marginTop: "20px",
                marginLeft: "7px",
                marginRight: "12px",
              }}
            >
              <div
                className="col-4"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <TextField
                  label="Reporting Manager"
                  variant="outlined"
                  onChange={handleManagerOnChange}
                  value={ReportingManagerId || ""}
                  fullWidth
                  select
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "12px",
                      "& fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000000",

                      fontWeight: "500",
                      transform: "translate(15px, 9px)",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "22px",
                      padding: "8px 12px",
                    },
                    "& .MuiInputLabel-shrink": {
                      fontSize: "1rem",
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                    "& input::placeholder": {
                      fontSize: "12px",
                      color: "#AEAEAE",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {employeelist && employeelist.length > 0 ? (
                    employeelist.map((emp) => (
                      <MenuItem key={emp.employee.id} value={emp.employee.id}>
                        <span style={{ fontSize: "12px" }}>
                          {emp.employee.firstName} {emp.employee.lastName}
                        </span>
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Employees Found</MenuItem>
                  )}
                </TextField>
              </div>
              <div className="col-8">
                <TextField
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={ProjectValues.description || ""}
                  onChange={handleOnChange}
                  fullWidth
                  multiline // Enables textarea behavior
                  rows={2} // Adjusts the number of visible rows
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "12px",
                      "& fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #DCDCDC",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#000000",
                      fontWeight: "500",
                      transform: "translate(15px, 9px)",
                      "&.Mui-focused": {
                        color: "black",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      // padding: "10px", // Adjust padding for textarea content
                      boxSizing: "border-box",
                    },
                    "& .MuiInputLabel-shrink": {
                      fontSize: "1rem",
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                    "& textarea::placeholder": {
                      fontSize: "12px",
                      color: "#AEAEAE",
                    },
                  }}
                />
              </div>
            </div>
            <div
              className=" row"
              style={{
                marginTop: "20px",
                marginLeft: "7px",
                marginRight: "12px",
              }}
            >
              <div className="col-4">
                <button
                  className="EditformSubmit"
                  // onClick={UpdateEmployeeDetails}
                >
                  <span className="editformspan">Save</span>
                </button>
                <button
                  className="EditformCancel ms-2"
                  onClick={handleEditClose}
                >
                  <span className="editformcacelspan">Cancel</span>
                </button>
              </div>
              <div className="col-8"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
