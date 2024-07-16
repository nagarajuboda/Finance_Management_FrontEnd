import { useState, useEffect } from "react";
import "../../../assets/Styles/AddProject.css";
import { Link, useNavigate } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import { AddClientValidation } from "./AddClientValidation";
import AdminDashboardServices from "../../../Service/AdminService/AdminDashboardServices";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import withReactContent from "sweetalert2-react-content";
import { IoArrowBackCircle } from "react-icons/io5";
import { AddProjectFormValidation } from "./AddProjectFormValidation";
import { Description } from "@mui/icons-material";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.full.min.js";
export default function AddProject() {
  var navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState([]);
  const [GetAllemployees, setEmployees] = useState([]);
  const [clientName, setClientName] = useState("");
  const [selectedProjectManager, setSelectedProjectManager] = useState("");
  const [show, setShow] = useState(false);
  const [close, setclose] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [AllCurrency, SetAllCurrency] = useState([]);
  const [AllDepartments, SetAllDepartments] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [projectManagerEmail, setProjectManagerEmail] = useState("");

  const [values, setValues] = useState({
    ClientName: "",
    ClientEmailId: "",
    ClientLocation: "",
    ReferenceName: "",
    ProjectID: "",
    ProjectName: "",
    currencyType: "",
    StartDate: "",
    ClientEmail: "",
    id: "",
    Description: "",
    EndDate: "",
    ProjectRefId: "",
    ProjectType: "",
    Progress: 0,
    departmentTeam: "",
    ProjectManager: "",
  });
  console.log(values.ProjectManager, "stsrtdata");
  const [errors, setErrors] = useState({
    ClientName: "",
    ClientEmailId: "",
    ClientLocation: "",
  });
  const [errorss, setErrorss] = useState({
    ProjectID: "",
    ProjectName: "",
    Department: "",
    currencyType: "",
    ProjectType: "",
    departmentTeam: "",
    ProjectManager: "",
    Description: "",
    ClientEmail: "",
    EndDate: "",
    StartDate: "",
  });
  // console.log(selectedProjectManager, "sele email");
  console.log(errorss, "errrofileds");
  function backonclick(e) {
    navigate("/Dashboard/AllProjects");
    e.preventDefault();
  }
  useEffect(() => {
    fetchData();
    FetchCurrency();
    debugger;
    // $(".select2").select2();

    // $(".select2").on("change", function (e) {
    //   setSelectedProjectManager($(this).val());
    // });
  }, []);
  console.log(selectedProjectManager, "selectedprojectmanegrr");
  async function FetchCurrency() {
    var CurrencyResponse = await AdminDashboardServices.GetAllCurrency();
    SetAllCurrency(CurrencyResponse.item);

    var getallDepartments = await AdminDashboardServices.GetAllDepartments();
    SetAllDepartments(getallDepartments.item);
  }
  async function fetchData() {
    try {
      var response1 = await AdminDashboardServices.fcngetEmployees();

      setEmployees(response1.item);
      var response = await AdminDashboardServices.FcnGetAllClients();
      var result = response.item;
      setClients(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleChange = async (e) => {
    const { name, value } = e.target;
    //console.log(values.cli, "projectmanager changes");
    console.log(values.ProjectManager, "selected project manager");
    if (name === "Department") {
      if (value === "") {
        setFilteredTeams([]);
      } else {
        const selectedDepartment = AllDepartments.find(
          (dept) => dept.deptName === value
        );

        const response = await axios.get(
          `https://localhost:44305/api/Projects/DepartmentTeams?deptid=${selectedDepartment.id}`
        );

        setFilteredTeams(response.data.item);
      }
    }

    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: AddClientValidation(name, value),
    });

    setErrorss({
      ...errorss,
      [name]: AddProjectFormValidation(name, value),
    });
  };

  async function AddClientFormSubmit(e) {
    e.preventDefault();
    const newErrors = {
      ClientName: AddClientValidation("ClientName", values.ClientName),
      ClientEmailId: AddClientValidation("ClientEmailId", values.ClientEmailId),

      ClientLocation: AddClientValidation(
        "ClientLocation",
        values.ClientLocation
      ),
    };
    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      const obj = {
        ClientName: values.ClientName,
        ClientEmailId: values.ClientEmailId,
        ClientLocation: values.ClientLocation,
        ReferenceName: values.ReferenceName,
      };

      var response = await AdminDashboardServices.fcnAddClientAsync(obj);

      if (response.isSuccess === true) {
        toast.success("Successfully done. ", {
          position: "top-right",
          autoClose: "4000",
        });
        handleClose();
        setValues({
          ClientName: "",
          ClientEmailId: "",
          file: "",
          ClientLocation: "",
          ReferenceName: "",
        });
        setClientName("");
        fetchData();
      } else {
        toast.error(response.error.message, {
          position: "top-right",
          autoClose: "4000",
        });
      }
    }
  }

  async function formSubmit(e) {
    setProjectManagerEmail(selectedProjectManager);
    e.preventDefault();
    const newErrors = {
      ProjectID: AddProjectFormValidation("ProjectID", values.ProjectID),
      ProjectName: AddProjectFormValidation("ProjectName", values.ProjectName),
      currencyType: AddProjectFormValidation(
        "currencyType",
        values.currencyType
      ),
      ProjectType: AddProjectFormValidation("ProjectType", values.ProjectType),
      Description: AddProjectFormValidation("Description", values.Description),
      Department: AddProjectFormValidation("Department", values.Department),
      departmentTeam: AddProjectFormValidation(
        "departmentTeam",
        values.departmentTeam
      ),
      ClientEmail: AddProjectFormValidation("ClientEmail", values.ClientEmail),
      ProjectManager: AddProjectFormValidation(
        "ProjectManager",
        values.ProjectManager
      ),
      StartDate: AddProjectFormValidation("StartDate", values.StartDate),
      EndDate: AddProjectFormValidation("EndDate", values.EndDate),
    };
    setErrorss(newErrors);

    debugger;
    const isValid = Object.values(newErrors).every((error) => error === "");
    console.log(isValid, "isvalid");

    if (isValid) {
      var obj = {
        project: {
          ProjectID: values.ProjectID,
          ProjectName: values.ProjectName,
          currencyType: values.currencyType,
          Description: values.Description,
          clientId: null,
          departmentTeam: null,
          StartDate: values.StartDate,
          EndDate: values.EndDate,
          ProjectRefId: values.ProjectRefId,
          ProjectType: values.ProjectType,
          Progress: values.Progress,
        },
        clientemail: values.ClientEmail,
        // ProjectManager: selectedProjectManager,
        ProjectManager: values.ProjectManager,
        DepartmentTeam: values.departmentTeam,
        Department: values.Department,
      };

      var response = await AdminDashboardServices.fcnAddProject(obj);

      if (response.isSuccess === true) {
        Swal.fire({
          title: "Good job!",
          text: " New project added successfully done",
          icon: "success",
        });
        navigate("/Dashboard/AllProjects");
      } else {
        toast.error(response.error.message, {
          position: "top-right",
          autoClose: "4000",
        });
      }
    }
  }

  return (
    <div className="maindiv1">
      <div className="maindiv card  addproductcard">
        <div className="addproject ">
          <div className="d-flex">
            <IoArrowBackCircle
              onClick={backonclick}
              style={{ cursor: "pointer", fontSize: "28px" }}
            />
            <p style={{ fontSize: "20px" }} className="ms-1 ">
              Back
            </p>
          </div>
          <p
            style={{ fontSize: "20px", textDecoration: "underline" }}
            className="ms-3 backiconbutton"
          >
            Add New Project
          </p>
        </div>
        <div>
          <form onSubmit={formSubmit}>
            <div className="row m-0 mt-2">
              <div className="col-4">
                <div>
                  <label className="labless">
                    Project ID
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Enter ProjectID"
                  className="form-control"
                  name="ProjectID"
                  value={values.ProjectID}
                  onChange={handleChange}
                />
                {errorss.ProjectID && (
                  <span className="error ms-1">{errorss.ProjectID}</span>
                )}
              </div>
              <div className="col-4">
                <div>
                  <label className="labless">
                    Project Name
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Enter ProjectName"
                  className="form-control"
                  name="ProjectName"
                  value={values.ProjectName}
                  onChange={handleChange}
                />
                {errorss.ProjectName && (
                  <span className="error ms-1">{errorss.ProjectName}</span>
                )}
              </div>
              <div className="col-4">
                <div>
                  <label className="labless">
                    StartDate
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                </div>
                <input
                  type="date"
                  placeholder="Enter StartDate"
                  className="form-control"
                  style={{ cursor: "pointer" }}
                  name="StartDate"
                  value={values.StartDate}
                  onChange={handleChange}
                />
                {errorss.StartDate && (
                  <span className="error ms-1">{errorss.StartDate}</span>
                )}
              </div>
            </div>
            <div className="row m-0 mt-2">
              <div className="col-4">
                <div>
                  <label className="labless d-flex">
                    Deadline
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                </div>
                <input
                  type="date"
                  placeholder="Enter EndDate"
                  className="form-control"
                  style={{ cursor: "pointer" }}
                  name="EndDate"
                  value={values.EndDate}
                  onChange={handleChange}
                />
                {errorss.EndDate && (
                  <span className="error ms-1">{errorss.EndDate}</span>
                )}
              </div>
              <div className="col-4">
                <label className="labless d-flex">
                  Select Client
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <div className="dropdown d-flex">
                  <select
                    id="myList"
                    className="form-control w-100"
                    name="ClientEmail"
                    value={values.clientEmailId}
                    onChange={handleChange}
                  >
                    <option value="">Select client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.clientEmailId}>
                        <div>
                          <span className="clientname">
                            {client.clientName}
                          </span>
                          <span style={{ marginLeft: "8px" }}>
                            - {client.clientEmailId}
                          </span>
                        </div>
                      </option>
                    ))}
                  </select>

                  <span>
                    <IoAddCircle className="addicon" onClick={handleShow} />
                  </span>
                </div>
                {errorss.ClientEmail && (
                  <span className="error ms-1">{errorss.ClientEmail}</span>
                )}
              </div>
              <div className="col-4">
                <div>
                  <label className="labless">
                    Currency
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                </div>
                <select
                  id="myList"
                  className="form-control w-100"
                  name="currencyType"
                  value={values.currencyType}
                  onChange={handleChange}
                >
                  <option value="">Select Currency</option>
                  {AllCurrency.map((currency) => (
                    <option key={currency.id} value={currency.type}>
                      <div>
                        <span className="clientname">{currency.type}</span>
                      </div>
                    </option>
                  ))}
                </select>
                {errorss.currencyType && (
                  <span className="error ms-1">{errorss.currencyType}</span>
                )}
              </div>
            </div>
            <div className="row m-0 mt-2">
              <div className="col-4">
                <div>
                  <span className="labless">ProjectRef ID</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter ProjectRefId"
                  className="form-control"
                  name="ProjectRefId"
                  value={values.ProjectRefId}
                  onChange={handleChange}
                />
              </div>
              <div className="col-4">
                <div>
                  <label className="labless">
                    Project Type
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Enter ProjectType"
                  className="form-control"
                  name="ProjectType"
                  value={values.ProjectType}
                  onChange={handleChange}
                />
                {errorss.ProjectType && (
                  <span className="error ms-1">{errorss.ProjectType}</span>
                )}
              </div>
              <div className="col-4">
                <div>
                  <label className="labless">Progress</label>
                </div>
                <input
                  type="text"
                  placeholder="Enter Progress"
                  className="form-control"
                  name="Progress"
                  value={values.Progress}
                  readOnly
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row m-0 mt-2">
              <div className="col-4">
                <label className="labless">
                  Project Manager
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <select
                  style={{ width: "100%" }}
                  className="form-control select2"
                  name="ProjectManager"
                  value={values.ProjectManager}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  {GetAllemployees.map((client) => (
                    <option
                      key={client.employee.id}
                      value={client.employee.email}
                    >
                      {`${client.employee.firstName} ${client.employee.lastName}`}
                    </option>
                  ))}
                </select>
                {errorss.ProjectManager && (
                  <span className="error ms-1">{errorss.ProjectManager}</span>
                )}
              </div>

              {/* <div className="col-4">
                <div>
                  <span className="labless">Department</span>
                </div>

                <select
                  id="departmentList"
                  className="form-control w-100"
                  name="Department"
                  value={values.Department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {AllDepartments.map((dept) => (
                    <option key={dept.id} value={dept.deptName}>
                      {dept.deptName}
                    </option>
                  ))}
                </select>
                {errorss.Department && (
                  <span className="error ms-1">{errorss.Department}</span>
                )}
              </div> */}
              <div className="col-4">
                <div>
                  <label className="labless">
                    Department
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                </div>
                <select
                  id="departmentList"
                  className="form-control w-100"
                  name="Department"
                  value={values.Department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {AllDepartments.map((dept) => (
                    <option key={dept.id} value={dept.deptName}>
                      {dept.deptName}
                    </option>
                  ))}
                </select>
                {errorss.Department && (
                  <span className="error ms-1">{errorss.Department}</span>
                )}
              </div>

              <div className="col-4">
                <div>
                  <label className="labless">
                    Team
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                </div>
                <select
                  id="teamList"
                  className="form-control w-100"
                  name="departmentTeam"
                  value={values.Team}
                  onChange={handleChange}
                >
                  <option value="">Select Team</option>
                  {filteredTeams.map((team) => (
                    <option key={team.id} value={team.teamName}>
                      {team.teamName}
                    </option>
                  ))}
                </select>
                {errorss.departmentTeam && (
                  <span className="error ms-1">{errorss.departmentTeam}</span>
                )}
              </div>
            </div>
            <div className="row m-0 mt-2">
              <div className="col-8">
                <div>
                  <label className="labless">
                    Description
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  </label>
                </div>
                <textarea
                  className="form-control"
                  placeholder="Enter Description"
                  name="Description"
                  value={values.Description}
                  onChange={handleChange}
                ></textarea>
                {errorss.Description && (
                  <span className="error ms-1">{errorss.Description}</span>
                )}
              </div>
              <div className="col-4"></div>
            </div>
            <div className="row m-0 mt-2">
              <div className="col-8"></div>
              <div className="col-2"></div>
              <div className="col-2">
                <button
                  className="form-control addbutton"
                  style={{ borderRadius: "10px" }}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <div style={{ width: "1000px" }} className="modeldiv">
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header
                closeButton
                style={{ backgroundColor: "rgb(25, 110, 138)", color: "white" }}
              >
                <Modal.Title>New Client</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={AddClientFormSubmit} className="formclass">
                  <div className="row m-0">
                    <div className="col-6">
                      <label className="labless">
                        ClientName
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter ClientName"
                        className="form-control"
                        name="ClientName"
                        value={values.clientName}
                        onChange={handleChange}
                      />
                      {errors.ClientName && (
                        <span className="error ms-1">{errors.ClientName}</span>
                      )}
                    </div>
                    <div className="col-6">
                      <label className="labless">
                        Client EmailId
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </label>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Email"
                          name="ClientEmailId"
                          className="form-control"
                          value={values.ClientEmailId}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.ClientEmailId && (
                        <span className="error ms-1">
                          {errors.ClientEmailId}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row m-0 mt-2">
                    <div className="col-6">
                      <div>
                        <label className="labless">ReferenceName</label>
                        <input
                          type="text"
                          placeholder="Enter ReferenceName"
                          className="form-control"
                          name="ReferenceName"
                          value={values.ReferenceName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <label className="labless">
                        Client Location
                        <span style={{ color: "red", marginLeft: "5px" }}>
                          *
                        </span>
                      </label>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Location"
                          name="ClientLocation"
                          value={values.ClientLocation}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                      {errors.ClientLocation && (
                        <span className="error ms-1">
                          {errors.ClientLocation}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-6"></div>
                    <div className="col-4"></div>
                    <div className="col-2"></div>
                  </div>
                  <div className="row m-0 mt-3">
                    <div className="col-8"></div>
                    <div className="col-2">
                      <button
                        onClick={handleClose}
                        className="form-control  btn btn-danger"
                      >
                        Close
                      </button>
                    </div>
                    <div className="col-2">
                      <button className="form-control addbutton">Add</button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
        <ToastContainer position="top-end" autoClose={5000} />
      </div>
    </div>
  );
}
