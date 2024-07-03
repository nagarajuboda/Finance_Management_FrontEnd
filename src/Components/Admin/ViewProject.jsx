import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../assets/Styles/ViewProject.css";
import $ from "jquery";
import "datatables.net";
import { IoArrowBackCircle } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { IoMdAddCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import AdminDashboardServices from "../../Service/AdminService/AdminDashboardServices";
export function ViewProject() {
  const [Projectresponse, setresponse] = useState({});
  const [projectEmployess, setProjectEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const [ProjectValues, setProjectValues] = useState({});
  const [clientvalues, setClientValues] = useState({});
  const [dataReady, setDataReady] = useState(false);

  const [showAddState, setShowAddState] = useState([]); // State to track each row's Add icon
  const [showCrossState, setShowCrossState] = useState([]); // State to track each row's Cross icon

  const { id } = useLocation().state || {};
  const navigate = useNavigate();
  const percentage = 66;
  var obj = [
    {
      Name: "nagaraju",
      id: "0282",
    },
    {
      Name: "raju",
      id: "0282",
    },
  ];
  useEffect(() => {
    async function FetchData() {
      sessionStorage.setItem("id", id);
      console.log(id, "dfjsldkjlfdsk");
      var response = await axios.get(
        `https://localhost:44305/api/Projects/GetProject?id=${id}`
      );
      var result = response.data;
      console.log(result, "result");
      if (result.isSuccess === true) {
        setProjectEmployees(result.item.employeeProject);
        setresponse(result.item.project);
        setClientValues(result.item.client);
        console.log(clientvalues, "clientValues");
        setProjectValues(result.item.project);
        setDataReady(true);
      }
    }

    FetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectValues({
      ...ProjectValues,
      [name]: value,
    });
  };
  useEffect(() => {
    async function GetEmployees() {
      var response = await AdminDashboardServices.fcngetEmployees();
      console.log(response, "getEmployees response");
    }
    GetEmployees();
  });
  useEffect(() => {
    if (dataReady) {
      $("#example").DataTable();
    }
  }, [dataReady]);
  useEffect(() => {
    if (showw) {
      const table = $("#example1").DataTable({
        paging: false,
        searching: true,
        ordering: false,
        info: false,
      });
    }
  }, [showw]);

  function backonclick(e) {
    e.preventDefault();
    navigate("/Dashboard/AllProjects");
  }

  const toggleIcon = (e, index, id) => {
    setShowAddState((prevState) => {
      console.log(id, "id");
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
    setShowCrossState((prevState) => {
      console.log(id, "sjdkskj");
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  return (
    <div>
      <div className=" d-flex" style={{ justifyContent: "space-between" }}>
        <div className="d-flex">
          <IoArrowBackCircle
            style={{ cursor: "pointer", fontSize: "28px", color: "block" }}
            onClick={backonclick}
          />

          <p style={{ fontSize: "20px" }} className="ms-1 ">
            Back
          </p>
        </div>
        <div>
          <Link style={{ color: "#257a96" }} onClick={() => setShow(true)}>
            Update
          </Link>
        </div>
      </div>
      <div className="headerCards">
        <div className="card ProjectProgress">
          <div className="ProjectProgress">
            <p
              style={{ color: "#196e8a", fontFamily: "Open Sans, sans-serif" }}
            >
              Project Progress
            </p>
            <p
              style={{ color: "#196e8a", fontFamily: "Open Sans, sans-serif" }}
            >
              In Progress
            </p>
          </div>
          <div className="progressbaranddates">
            <div className="circularProgressbar">
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div className="startdatediv">
              <p style={{ marginBottom: "0px", color: "#BFBFBF" }}>
                Start Date
              </p>
              <p style={{ marginBottom: "0px", fontWeight: "600" }}>
                {Projectresponse.startDate}
              </p>
            </div>
            <div>
              <p style={{ marginBottom: "0px", color: "#BFBFBF" }}>Dealine</p>
              <p
                style={{
                  marginBottom: "0px",
                  fontWeight: "600",
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                {Projectresponse.endDate}
              </p>
            </div>
          </div>
        </div>
        <div className="card ms-3">
          <div>
            <p
              style={{ color: "#196e8a", fontFamily: "Open Sans, sans-serif" }}
            >
              Project Manager
            </p>
          </div>
          <div className="ProjectMangerProfile d-flex">
            <div className="d-flex">
              <div>
                <p style={{ marginBottom: "0px", fontWeight: "400" }}>
                  {Projectresponse.projectManager}
                </p>
                <p style={{ marginBottom: "0px", fontWeight: "400" }}>
                  {Projectresponse.clientEmail}
                </p>
              </div>
            </div>
            <div className="addlead">
              <Link>Change Manager</Link>
            </div>
          </div>
        </div>
        <div className="card ms-3">
          <div>
            <p
              style={{ color: "#196e8a", fontFamily: "Open Sans, sans-serif" }}
            >
              Client
            </p>
          </div>
          <div className="d-flex">
            <div>
              <p style={{ marginBottom: "0px", fontWeight: "400" }}>
                {clientvalues.clientName}
              </p>
              <p style={{ marginBottom: "0px", fontWeight: "400" }}>
                {clientvalues.clientEmailId}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card Projectdescription mt-4">
        <div>
          <p className="description">Project Details</p>
        </div>
        <div className="descriptioncontent mt-3">
          <p style={{ marginBottom: "0px", fontWeight: "400" }}>
            {Projectresponse.description}
          </p>
        </div>
      </div>
      <div className="card mt-4 employeeDetails">
        <div className="mb-4 workingemployee">
          <p
            style={{
              color: "#196e8a",
              fontFamily: "Open Sans, sans-serif",
              marginBottom: "0px",
            }}
          >
            Working Employees
          </p>
          <p>
            <Link onClick={() => setShoww(true)}>Assign</Link>
          </p>
        </div>
        <div>
          <table
            id="example"
            className="tableclasss table table-borderless w-0"
          >
            <thead>
              <tr className="headerth">
                <th></th>
                <th>EmployeeId</th>
                <th>Name</th>
                <th>Email</th>
                <th>ProjectId</th>
                <th>DateOfJoining</th>
              </tr>
            </thead>
            <tbody>
              {projectEmployess.map((employees, index) => (
                <tr key={index}>
                  <td>{employees.projectId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={false}
        className="firstmodel"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modelbody">
          <form>
            <div className="row" style={{ margin: "0", width: "100%" }}>
              <div className="col-4">
                <span className="ms-1">ProjectID</span>
                <input
                  type="text"
                  name="projectID"
                  value={ProjectValues.projectID}
                  className="form-control"
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="col-4">
                <span className="ms-1">Project Name</span>
                <input
                  type="text"
                  name="projectName"
                  value={ProjectValues.projectName}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-4">
                <span className="ms-1">Start Date</span>
                <input
                  type="text"
                  name="startDate"
                  value={ProjectValues.startDate}
                  className="form-control"
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>
            <div className="row" style={{ margin: "0", width: "100%" }}>
              <div className="col-4">
                <span className="ms-1">End Date</span>
                <input
                  type="text"
                  name="endDate"
                  value={ProjectValues.endDate}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-4">
                <span className="ms-1">Project Ref ID</span>
                <input
                  type="text"
                  name="projectRefId"
                  value={ProjectValues.projectRefId}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-4">
                <span className="ms-1">Client Email</span>
                <input
                  type="text"
                  name="clientEmail"
                  value={clientvalues.clientEmailId}
                  className="form-control"
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>
            <div className="row" style={{ margin: "0", width: "100%" }}>
              <div className="col-4">
                <span className="ms-1">Project Type</span>
                <input
                  type="text"
                  name="projectType"
                  value={ProjectValues.projectType}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-4">
                <span className="ms-1">Status</span>
                <input
                  type="text"
                  name="status"
                  value={ProjectValues.status}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-4">
                <span className="ms-1">Progress</span>
                <input
                  type="text"
                  name="progress"
                  value={ProjectValues.progress}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row" style={{ margin: "0", width: "100%" }}>
              <div className="col-4">
                <span>Team Size</span>
                <input
                  type="text"
                  name="teamSize"
                  value={ProjectValues.teamSize}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-4">
                <span>Project Manager</span>
                <input
                  type="text"
                  name="projectManager"
                  value={ProjectValues.projectManager}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-4">
                <span>Created Date</span>
                <input
                  type="date"
                  name="createdDate"
                  value={ProjectValues.createdDate}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mt-2" style={{ margin: "0", width: "100%" }}>
              <div className="col-4">
                <span>Updated Date</span>
                <input
                  type="date"
                  name="updatedDate"
                  value={ProjectValues.updatedDate}
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-8">
                <span>Project Description</span>
                <textarea
                  className="form-control textareas"
                  name="description"
                  value={ProjectValues.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              {/* <div className="col-4"></div> */}
            </div>
            <div className="row mt-2" style={{ margin: "0", width: "100%" }}>
              <div className="col-8"></div>
              <div className="col-2">
                <button
                  type="button"
                  className="form-control closebutton"
                  onClick={() => setShow(false)}
                  style={{
                    borderRadius: "8px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  Close
                </button>
              </div>
              <div className="col-2">
                <button
                  type="submit"
                  className="form-control updatebtn"
                  style={{
                    borderRadius: "8px",
                    backgroundColor: "rgb(25, 110, 138)",
                    color: "white",
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showw}
        onHide={() => setShoww(false)}
        animation={false}
        className="firstmodel1"
      >
        <Modal.Header closeButton className="header">
          <Modal.Title>Employees</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" econdmodel1">
          <table
            id="example1"
            className="tableclasss table table-borderless w-0 secondDataTable"
          >
            <thead>
              <tr className="headerth">
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Assign</th>
              </tr>
            </thead>
            <tbody>
              {obj.map((obj, index) => (
                <tr>
                  <td style={{ textAlign: "center" }}>{obj.Name}</td>
                  <td style={{ textAlign: "center" }}>{obj.Name}</td>
                  <td style={{ textAlign: "center" }}>
                    {showAddState[index] ? (
                      <RxCross2
                        onClick={(e) => toggleIcon(e, index, null)}
                        className="cancleemployee"
                      />
                    ) : (
                      <IoMdAddCircle
                        onClick={(e) => toggleIcon(e, index, obj.id)}
                        className="addemployeecircle"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </div>
  );
}
