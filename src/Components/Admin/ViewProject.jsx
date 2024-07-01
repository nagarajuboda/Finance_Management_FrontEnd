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

export function ViewProject() {
  //const { id } = useParams();
  const [Projectresponse, setresponse] = useState({});
  const [projectEmployess, setProjectEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [close, setclose] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();
  const [dataReady, setDataReady] = useState(false);
  const [projectmanager, setProjectmanager] = useState("");
  const { id } = location.state || {};
  var navigate = useNavigate();
  const percentage = 66;

  useEffect(() => {
    console.log(id, "id");
    async function FetchData() {
      var response = await axios.get(
        `https://localhost:44305/api/Projects/GetProject?id=${id}`
      );
      var result = response.data;
      if (result.isSuccess === true) {
        setProjectEmployees(result.item.employeeProject);
        setresponse(result.item.project);
        setProjectmanager(result.item.projectManager);
        setDataReady(true);
      }
    }

    FetchData();
  }, [id]);

  useEffect(() => {
    if (dataReady) {
      $("#example").DataTable();
    }
  }, [dataReady]);
  function backonclick(e) {
    e.preventDefault();

    navigate("/Dashboard/AllProjects");
  }
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
          <Link style={{ color: "#257a96" }} onClick={handleShow}>
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
          <div className="">
            <p
              style={{ color: "#196e8a", fontFamily: "Open Sans, sans-serif" }}
            >
              Project Manager
            </p>
          </div>
          <div className="ProjectMangerProfile d-flex">
            <div className="d-flex">
              {/* <img src={oneimage} alt="not found" className="Pimage" /> */}
              <div className="">
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
            {/* <img src={oneimage} alt="not found" className="Pimage" /> */}
            <div className="">
              <p style={{ marginBottom: "0px", fontWeight: "400" }}>
                {Projectresponse.projectManager}
              </p>
              <p style={{ marginBottom: "0px", fontWeight: "400" }}>
                {Projectresponse.clientEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card Projectdescription mt-4">
        <div className="">
          <p className="description">Project Details</p>
        </div>
        <div className="descriptioncontent mt-3">
          <p style={{ marginBottom: "0px", fontWeight: "400" }}>
            Bahubali is a grand epic set in the ancient kingdom of Mahishmati,
            revolving around two brothers, Amarendra Bahubali and Bhallaladeva,
            vying for the throne. Raised as orphans, both are trained as
            warriors, but while Bahubali is noble and compassionate,
            Bhallaladeva is power-hungry and ruthless. Bahubali wins the throne
            but renounces it for love, leading to his betrayal and murder by
            Bhallaladeva. Years later, Bahubali's son, Mahendra, rises to avenge
            his father's death and reclaim the kingdom. The story showcases
            themes of honor, sacrifice, and the triumph of good over evil.
          </p>
        </div>
      </div>
      <div className="card mt-4 employeeDetails">
        <div className="mb-4">
          <p
            style={{
              color: "#196e8a",
              fontFamily: "Open Sans, sans-serif",
              marginBottom: "0px",
            }}
          >
            Working Employees
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
              {projectEmployess.map((employees, index) => {
                <tr key={index}>
                  <td>{employees.projectId}</td>
                </tr>;
              })}
              {/* <tr>
                <td></td>
                <td>EmployeeId</td>
                <td>FirstName</td>
                <td>Client A</td>
                <td>2024-07-01</td>
                <td>50%</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Project Beta</td>
                <td>Type B</td>
                <td>Client B</td>
                <td>2024-08-15</td>
                <td>75%</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>Project Gamma</td>
                <td>Type C</td>
                <td>Client C</td>
                <td>2024-09-30</td>
                <td>90%</td>
                <td></td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
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
                  value={Projectresponse.projectID}
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <span className="ms-1">projectName</span>
                <input
                  type="text"
                  value={Projectresponse.projectName}
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <span className="ms-1">StartDate</span>
                <input
                  type="text"
                  value={Projectresponse.startDate}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row" style={{ margin: "0", width: "100%" }}>
              <div className="col-4">
                <span className="ms-1">EndDate</span>
                <input
                  type="text"
                  value={Projectresponse.endDate}
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <span className="ms-1">ProjectRefId</span>
                <input
                  type="text"
                  value={Projectresponse.projectRefId}
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <span className="ms-1">ClientEmail</span>
                <input
                  type="text"
                  value={Projectresponse.clientEmail}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row " style={{ margin: "0", width: "100%" }}>
              <div className="col-4">
                <span className="ms-1">ProjectType</span>
                <input
                  type="text"
                  value={Projectresponse.projectType}
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <span className="ms-1">Status</span>
                <input
                  type="text"
                  value={Projectresponse.status}
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <span className="ms-1">Progress</span>
                <input
                  type="text"
                  value={Projectresponse.progress}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="col-4">
                <span>teamSize</span>
                <input
                  type="text"
                  value={Projectresponse.teamSize}
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <span>teamSize</span>
                <input
                  type="text"
                  value={Projectresponse.projectManager}
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <span>CreatedDate</span>
                <input
                  type="date"
                  className="form-control"
                  value={Projectresponse.createdDate}
                />
              </div>
            </div>
            <div className="row m-0">
              <div className="col-4">
                <span>UpdatedDate</span>
                <input
                  type="date"
                  value={Projectresponse.updatedDate}
                  className="form-control"
                />
              </div>
              <div className="col-4">
                <span>Project Description</span>
                <textarea
                  className="form-control"
                  name="Description"
                  value={Projectresponse.description}
                ></textarea>
              </div>
              <div className="col-4"></div>
            </div>
            <div className="row mt-2" style={{ margin: "0", width: "100%" }}>
              <div className="col-8"></div>
              <div className="col-2">
                <button
                  type="submit"
                  className="form-control closebutton"
                  onClick={handleClose}
                  style={{
                    borderRadius: "8px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  close
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
    </div>
  );
}
