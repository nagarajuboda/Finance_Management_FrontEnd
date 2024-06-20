import { useState, useEffect } from "react";
import "../../../assets/Styles/AddProject.css";
import { Link } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import { AddClientValidation } from "./AddClientValidation";
import AdminDashboardServices from "../../../Service/AdminService/AdminDashboardServices";

export default function AddProject() {
  const [clients, setClients] = useState([]);
  const [clientName, setClientName] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [values, setValues] = useState({
    ClientName: "",
    ClientEmailId: "",
    ClientProfile: "",
    ClientLocation: "",
    ReferenceName: "",
  });
  const [errors, setErrors] = useState({
    ClientName: "",
    ClientEmailId: "",
    ClientProfile: "",
    ClientLocation: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://localhost:44377/api/Project/getall"
        );
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
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
      ClientProfile: AddClientValidation("ClientProfile", values.ClientProfile),
      ClientLocation: AddClientValidation(
        "ClientLocation",
        values.ClientLocation
      ),
    };
    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => error === "");
    if (isValid) {
      var clientData = {
        ClientName: values.ClientName,
        ClientEmailId: values.ClientEmailId,
        ClientProfile: values.ClientProfile,
        ClientLocation: values.ClientLocation,
        ReferenceName: values.ReferenceName,
      };
      var response = await AdminDashboardServices.fcnAddClientAsync(clientData);
      if (response !== null) {
        toast.success("Successfully done. ", {
          position: "top-right",
          autoClose: "4000",
        });
        handleClose();
        setValues({
          ClientName: "",
          ClientEmailId: "",
          ClientProfile: "",
          ClientLocation: "",
          ReferenceName: "",
        });
        setClientName("");
      }
      console.log(response, "in component");
    }
  }

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(clientName, "name");
    console.log("btn clicked");
  };

  return (
    <div className="maindiv1">
      <div className="maindiv card">
        <div className="addproject">Add New Project</div>
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
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
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
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div>
                  <span className="labless">Assign ProjectManager</span>
                </div>
                <div className="dropdown">
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
                </div>
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
                ></textarea>
              </div>
              <div className="col-4"></div>
            </div>
            <div className="row">
              <div className="col-8"></div>
              <div className="col-2">
                <button className="form-control addbtn">Add</button>
              </div>
              <div className="col-2">
                <Link
                  to="/analytics/AllProjects"
                  className="form-control backbtn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Back
                </Link>
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
                      value={values.ClientName}
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
                  <div className="col-6">
                    <label className="labless">
                      ClientProfile
                      <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                    </label>
                    <div>
                      <input
                        type="file"
                        name="ClientProfile"
                        className="form-control"
                        value={values.ClientProfile}
                        onChange={handleChange}
                      />
                      {errors.ClientProfile && (
                        <span className="error">{errors.ClientProfile}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-4"></div>
                  <div className="col-2"></div>
                </div>
                <div className="row">
                  <div className="col-8"></div>
                  <div className="col-2"></div>
                  <div className="col-2">
                    <button className="form-control clientAddbtn">Add</button>
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
