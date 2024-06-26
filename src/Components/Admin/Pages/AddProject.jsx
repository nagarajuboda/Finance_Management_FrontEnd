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

export default function AddProject() {
  var navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState("");
  const [selectedProjectManager, setSelectedProjectManager] = useState("");
  const [show, setShow] = useState(false);
  const [close, setclose] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [values, setValues] = useState({
    ClientName: "",
    ClientEmailId: "",
    // file: "",
    ClientLocation: "",
    ReferenceName: "",
    ProjectID: "",
    ProjectName: "",
    StartDate: "",
    ClientEmail: "",
    Description: "",

    EndDate: "",
    ProjectRefId: "",
    ProjectType: "",
    Progress: "",
    TeamSize: "",
    ProjectManager: "",
  });

  const [errors, setErrors] = useState({
    ClientName: "",
    ClientEmailId: "",
    // file: "",
    ClientLocation: "",
  });
  function backonclick(e) {
    navigate("/analytics/AllProjects");
    console.log("btn clickes");
    e.preventDefault();
  }
  useEffect(() => {
    async function fetchData() {
      try {
        var response = await AdminDashboardServices.FcnGetAllClients();
        var result = response.item;
        setClients(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    $(".select2").select2();
    $(".select2").on("change", function (e) {
      setSelectedProjectManager($(this).val());
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: AddClientValidation(name, value),
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
      console.log(response, "klfdslk");
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
      } else {
        toast.error(response.error.message, {
          position: "top-right",
          autoClose: "4000",
        });
      }
      console.log(response, "in component");
    }
  }

  async function formSubmit(e) {
    e.preventDefault();
    console.log(selectedProjectManager, "selected Project manager");
    var obj = {
      ProjectID: values.ProjectID,
      ProjectName: values.ProjectName,

      ClientEmail: values.ClientEmail,
      Description: values.Description,
      StartDate: values.StartDate,
      EndDate: values.EndDate,
      ProjectRefId: values.ProjectRefId,
      ProjectType: values.ProjectType,
      Progress: values.Progress,
      TeamSize: values.TeamSize,
      ProjectManager: selectedProjectManager,
    };

    var response = await AdminDashboardServices.fcnAddProject(obj);
    console.log(response, "response");
    if (response.isSuccess === true) {
      Swal.fire({
        title: "Good job!",
        text: " New project added successfully done",
        icon: "success",
      });
      navigate("/analytics/AllProjects");
    } else {
      console.log(response.error.message);
      toast.error(response.error.message, {
        position: "top-right",
        autoClose: "4000",
      });
    }
    console.log(response, "final response");
  }

  return (
    <div className="maindiv1">
      <div className="maindiv card  addproductcard">
        <div className="addproject d-flex">
          {/* <Link
            to="/analytics/AllProjects"
            className="btn  backbuttom"
            onClick={backonclick}
          >
            <FaArrowLeft />
          </Link> */}
          <FaArrowLeft onClick={backonclick} style={{ cursor: "pointer" }} />
          <p style={{ fontSize: "20px" }}>Add New Project</p>
          {/* <Link
            to="/analytics/AllProjects"
            className="btn btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaArrowLeft />
          </Link> */}
        </div>
        <div>
          <form onSubmit={formSubmit}>
            <div className="row">
              <div className="col-4">
                <div>
                  <label className="labless">
                    ProjectID
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
              </div>
              <div className="col-4">
                <div>
                  <label className="labless">
                    ProjectName
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
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div>
                  <span className="labless">EndDate</span>
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
              </div>
              <div className="col-4">
                <label className="labless">
                  Select Client
                  <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                </label>
                <div className="dropdown d-flex">
                  <select
                    id="myList"
                    className="form-control w-100"
                    // value={clientName}
                    // onChange={(e) => setClientName(e.target.value)}
                    name="ClientEmail"
                    value={values.ClientEmail}
                    onChange={handleChange}
                  >
                    <option value="">Select client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.clientName}>
                        {client.clientName}
                      </option>
                    ))}
                  </select>
                  <span>
                    <IoAddCircle className="addicon" onClick={handleShow} />
                  </span>
                </div>
              </div>
              <div className="col-4">
                <div>
                  <span className="labless">TeamSize</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter TeamSize"
                  className="form-control"
                  name="TeamSize"
                  value={values.TeamSize}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div>
                  <span className="labless">ProjectRefId</span>
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
                    ProjectType
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
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <span className="labless">Assign ProjectManager</span>
                <select
                  style={{ width: "100%" }}
                  className="form-control select2"
                  name="ProjectManager"
                  value={selectedProjectManager}
                  onChange={(e) => setSelectedProjectManager(e.target.value)}
                >
                  <option>Select</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.clientName}>
                      {client.clientName}
                    </option>
                  ))}
                </select>

                {/* <div className="dropdown">
                  <button
                    className="form-control dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select Project Manager
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {clients.map((client) => (
                      <li key={client.id}>
                        <a className="dropdown-item" href="#">
                          {client.clientName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
              <div className="col-4">
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
              </div>
              <div className="col-4"></div>
            </div>
            <div className="row">
              <div className="col-8"></div>
              <div className="col-2">
                {/* <button className="form-control addbutton">Add</button> */}
              </div>
              <div className="col-2">
                {/* <Link
                  to="/analytics/AllProjects"
                  className="form-control  btn btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Back
                </Link> */}
                <button className="form-control addbutton">Add</button>
              </div>
            </div>
          </form>
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>New Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={AddClientFormSubmit} className="formclass">
                <div className="row">
                  <div className="col-6">
                    <label className="labless">
                      ClientName
                      <span style={{ color: "red", marginLeft: "5px" }}>*</span>
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
                      <span className="error">{errors.ClientName}</span>
                    )}
                  </div>
                  <div className="col-6">
                    <label className="labless">
                      Client EmailId
                      <span style={{ color: "red", marginLeft: "5px" }}>*</span>
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
                      <span className="error">{errors.ClientEmailId}</span>
                    )}
                  </div>
                </div>
                <div className="row">
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
                      <span style={{ color: "red", marginLeft: "5px" }}>*</span>
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
                      <span className="error">{errors.ClientLocation}</span>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6"></div>
                  <div className="col-4"></div>
                  <div className="col-2"></div>
                </div>
                <div className="row">
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
        <ToastContainer position="top-end" autoClose={5000} />
      </div>
    </div>
  );
}
