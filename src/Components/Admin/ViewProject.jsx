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
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "datatables.net";
import { IoArrowBackCircle } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import { IoMdAddCircle } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import AdminDashboardServices from "../../Service/AdminService/AdminDashboardServices";
import { getSessionData } from "../../Service/SharedSessionData";
export function ViewProject() {
  const [Projectresponse, setresponse] = useState({});
  const [projectEmployess, setProjectEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);
  const handleClose = () => setShow(false);

  const [Employeeids, setIds] = useState([]);

  const [ProjectValues, setProjectValues] = useState({});
  const [clientvalues, setClientValues] = useState({});
  const [dataReady, setDataReady] = useState(false);
  const [GetAllemployees, setEmployees] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [projectManagerEmail, setProjectMangerEmail] = useState("");
  const [projectManagerName, setProjectMangerName] = useState("");
  const [sessiondata, setSessiondata] = useState(null);
  const [projectManagers, setProjectManagers] = useState([]);
  const navigate = useNavigate();
  const [sessionData, setSessionDataState] = useState(null);
  const [status, setStatus] = useState("InActive");
  const id = localStorage.getItem("projectId");
  useEffect(() => {
    FetchData();
  }, [id]);
  useEffect(() => {}, []);
  const [selectedManagerId, setSelectedManagerId] = useState("");

  const handleManagerChange = (event) => {
    setSelectedManagerId(event.target.value);
  };
  async function FetchData() {
    var projectManagerResponse =
      await AdminDashboardServices.GetProjectManager();
    setProjectManagers(projectManagerResponse.item);

    const userDetails = JSON.parse(localStorage.getItem("sessionData"));
    setSessiondata(userDetails.employee.role.name);
    var response1 = await AdminDashboardServices.fcngetEmployees();
    setEmployees(response1.item);
    var response = await axios.get(
      `https://localhost:44305/api/Projects/GetProject?id=${id}`
    );
    var result = response.data;
    if (result.isSuccess === true) {
      setProjectEmployees(result.item.employeeProject);
      setresponse(result.item.project);
      setClientValues(result.item.client);
      setProjectValues(result.item.project);
      setProjectMangerEmail(result.item.projectMangerEmail);
      //setSelectedManagerId(result.item.projectMangerName);
      setStatus(result.item.project.status);
      setSelectedManagerId(result.item.projectMangerEmail);
      setDataReady(true);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectValues({
      ...ProjectValues,
      [name]: value,
    });
  };

  const handleChange = (event) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
  };
  useEffect(() => {
    if (dataReady && projectEmployess.length > 0) {
      const table = $("#example11").DataTable({
        destroy: true,
      });
      return () => {
        table.destroy();
      };
    }
  }, [dataReady]);

  useEffect(() => {
    if (showw) {
      const table = $("#example1").DataTable({
        paging: false,
        searching: true,
        ordering: false,
        info: false,
        destroy: true,
      });
    }
  }, [showw]);

  function backonclick(e) {
    e.preventDefault();
    navigate("/Dashboard/AllProjects");
  }

  function backtoprojects(e) {
    FetchData();
    e.preventDefault();
    navigate("/Employee/Projects");
  }
  function backtofinance(e) {
    e.preventDefault();
    navigate("/Dashboard/AllProjects");
  }
  async function updateformsubmit(e) {
    e.preventDefault();

    const selectedManageridd = projectManagers.find(
      (el) => el.email === selectedManagerId
    );
    ProjectValues.status = status;
    ProjectValues.projectManager = selectedManageridd.id;
    var response = await AdminDashboardServices.fcnUpdateProject(ProjectValues);
    if (response.isSuccess) {
      toast.success("Update Successfully done. ", {
        position: "top-right",
        autoClose: "4000",
      });
      handleClose();
      FetchData();
    }
  }
  async function AddEmployeeSubmit(e) {
    e.preventDefault();
    const requestBody = [
      {
        employeeids: Employeeids,
        id: id,
      },
    ];
    var response = await AdminDashboardServices.fcnAssignEmployee(requestBody);
    if (response.isSuccess) {
      setShoww(false);
      setTimeout(() => {
        toast.success("Successfully done.", {
          position: "top-right",
          autoClose: 6000,
        });
        FetchData();
      }, 300);

      FetchData();
    }
  }

  const handleClick = () => {
    setShoww(true);
    GetAllemployees.map((el) => {
      if (
        projectEmployess.filter((proj) => proj.employee.id === el.employee.id)
          .length > 0
      ) {
        el.employee.isAlreadyAdded = true;
      } else {
        el.employee.isAlreadyAdded = false;
      }
    });
  };

  const toggleIcon = (e, index, id) => {
    setSelectedRowIds((prevSelectedRowIds) => {
      let newSelectedRowIds;
      if (id) {
        if (!prevSelectedRowIds.includes(id)) {
          newSelectedRowIds = [...prevSelectedRowIds, id];
        } else {
          newSelectedRowIds = prevSelectedRowIds.filter(
            (selectedId) => selectedId !== id
          );
        }
      } else {
        const rowId = obj[index].id;
        newSelectedRowIds = prevSelectedRowIds.filter(
          (selectedId) => selectedId !== rowId
        );
      }

      setIds(
        newSelectedRowIds.map((selectedId) => ({ employeeid: selectedId }))
      );

      return newSelectedRowIds;
    });
  };
  async function handleDelete(id, projectid) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      var response = await AdminDashboardServices.DeleteEmployeefcn(
        id,
        projectid
      );
      if (response.item.isAssinged == false) {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Employee has been successfully deleted.",
            icon: "success",
          }).then(async () => {
            await FetchData();
          });
        }
      }
    });
  }

  return (
    <div>
      <div>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div className="d-flex">
            {/* {sessiondata != "Admin" && sessionData != "Indian finace" ? (
              <IoArrowBackCircle
                style={{
                  cursor: "pointer",
                  fontSize: "28px",
                  color: "block",
                }}
                onClick={backtoprojects}
              />
            ) : (
              <IoArrowBackCircle
                style={{
                  cursor: "pointer",
                  fontSize: "28px",
                  color: "block",
                }}
                onClick={backonclick}
              />
            )} */}
            {console.log(sessiondata, "=============>")}
            {sessiondata !== "Admin" && sessiondata !== "Indian finace" ? (
              <IoArrowBackCircle
                style={{ cursor: "pointer", fontSize: "28px", color: "block" }}
                onClick={backtoprojects}
              />
            ) : sessiondata === "Indian finace" ? (
              <IoArrowBackCircle
                style={{ cursor: "pointer", fontSize: "28px", color: "block" }}
                onClick={backtofinance}
              />
            ) : (
              <IoArrowBackCircle
                style={{ cursor: "pointer", fontSize: "28px", color: "block" }}
                onClick={backonclick}
              />
            )}
            <p style={{ fontSize: "20px" }} className="ms-1 ">
              Back
            </p>
          </div>
          <div>
            <Link
              onClick={() => setShow(true)}
              className="btn "
              style={{
                padding: "3px 7px",
                backgroundColor: "#008CBA",
                color: "white",
              }}
            >
              Update
            </Link>
          </div>
        </div>
        <div className="headerCards">
          <div className="card ProjectProgress" style={{ borderRadius: "0px" }}>
            <div className="ProjectProgress">
              <p
                style={{
                  color: "#196e8a",
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                Project Progress
              </p>
              <p
                style={{
                  color: "#196e8a",
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                In Progress
              </p>
            </div>
            <div className="progressbaranddates">
              <div className="circularProgressbar">
                <CircularProgressbar
                  value={Projectresponse.progress}
                  text={`${Projectresponse.progress}%`}
                />
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
                <p style={{ marginBottom: "0px", color: "#BFBFBF" }}>
                  Deadline
                </p>
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
          <div className="card ms-3" style={{ borderRadius: "0px" }}>
            <div>
              <p
                style={{
                  color: "#196e8a",
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                Project Manager
              </p>
            </div>
            <div className="ProjectMangerProfile d-flex">
              <div className="d-flex">
                <div>
                  <p style={{ marginBottom: "0px", fontWeight: "400" }}>
                    {projectManagerName}
                  </p>
                  <p style={{ marginBottom: "0px", fontWeight: "400" }}>
                    {projectManagerEmail}
                  </p>
                </div>
              </div>
              {/* <div className="addlead">
                <Link>Change Manager</Link>
              </div> */}
            </div>
          </div>
          <div className="card ms-3" style={{ borderRadius: "0px" }}>
            <div>
              <p
                style={{
                  color: "#196e8a",
                  fontFamily: "Open Sans, sans-serif",
                }}
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
        <div
          className="card Projectdescription mt-4"
          style={{ borderRadius: "0px" }}
        >
          <div>
            <p className="description">Project Details</p>
          </div>
          <div className="descriptioncontent mt-3">
            <p style={{ marginBottom: "0px", fontWeight: "400" }}>
              {Projectresponse.description}
            </p>
          </div>
        </div>

        <div
          className="card my-3 mt-4 employeeDetails d-flex justify-content-between"
          style={{ borderRadius: "0px" }}
        >
          <div className="mb-4 workingemployee">
            <p
              className="projectTeam"
              style={{
                color: "#196e8a",
                fontFamily: "Open Sans, sans-serif",
                marginBottom: "0px",
              }}
            >
              Project Team
            </p>
            <Link onClick={handleClick}>
              <p> Add Employee</p>
            </Link>
          </div>
          <div>
            <table
              id="example11"
              className="table table-striped projectemployeetable"
              style={{ width: "100%" }}
            >
              <thead className="theadbackgroundcolor">
                <tr>
                  <th
                    className="tbh"
                    style={{ backgroundColor: "#196e8a", color: "white" }}
                  >
                    Employee ID
                  </th>
                  <th
                    className="tbh"
                    style={{ backgroundColor: "#196e8a", color: "white" }}
                  >
                    Name
                  </th>
                  <th
                    className="tbh"
                    style={{ backgroundColor: "#196e8a", color: "white" }}
                  >
                    Email
                  </th>
                  <th
                    className="tbh"
                    style={{ backgroundColor: "#196e8a", color: "white" }}
                  >
                    Project Name
                  </th>
                  <th
                    className="tbh"
                    style={{ backgroundColor: "#196e8a", color: "white" }}
                  >
                    Date Of Joining
                  </th>
                  <th
                    className="tbh"
                    style={{ backgroundColor: "#196e8a", color: "white" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectEmployess.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No records in the table
                    </td>
                  </tr>
                ) : (
                  projectEmployess.map((obj, index) => {
                    return (
                      <tr key={index}>
                        <td className="data">
                          <Link>{obj.employee.employeeId}</Link>
                        </td>
                        <td className="data">{`${obj.employee.firstName}   ${obj.employee.lastName}`}</td>
                        <td className="data">{obj.employee.email}</td>
                        <td className="data">{obj.project.projectName}</td>
                        <td className="data">{obj.employee.dateOfJoining}</td>
                        <td className="data">
                          <div className="deleteicontd">
                            <RiDeleteBin6Line
                              className="deleteicon"
                              onClick={() =>
                                handleDelete(obj.employee.id, obj.project.id)
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          size="lg"
          show={show}
          onHide={() => setShow(false)}
          animation={false}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#196e8a", color: "white" }}
          >
            <Modal.Title id="example-modal-sizes-title-lg">
              Update Project
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modelbody">
            <form onSubmit={updateformsubmit}>
              <div className="row" style={{ margin: "0", width: "100%" }}>
                <div className="col-4">
                  <span
                    className="ms-1"
                    style={{ color: "black", fontWeight: "600" }}
                  >
                    ProjectID
                  </span>
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
                  <span
                    className="ms-1"
                    style={{ color: "black", fontWeight: "600" }}
                  >
                    Project Name
                  </span>
                  <input
                    type="text"
                    name="projectName"
                    value={ProjectValues.projectName}
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-4">
                  <span
                    className="ms-1"
                    style={{ color: "black", fontWeight: "600" }}
                  >
                    Start Date
                  </span>
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
                  <span
                    className="ms-1"
                    style={{ color: "black", fontWeight: "600" }}
                  >
                    Deadline
                  </span>
                  <input
                    type="date"
                    name="endDate"
                    value={ProjectValues.endDate}
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-4">
                  <span
                    className="ms-1"
                    style={{ color: "black", fontWeight: "600" }}
                  >
                    Project Ref ID
                  </span>
                  <input
                    type="text"
                    name="projectRefId"
                    value={ProjectValues.projectRefId}
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-4">
                  <span
                    className="ms-1"
                    style={{ color: "black", fontWeight: "600" }}
                  >
                    Client Email
                  </span>
                  <input
                    type="text"
                    name="clientEmail"
                    value={clientvalues.clientEmailId}
                    className="form-control"
                    onChange={(e) =>
                      setClientValues({ clientEmailId: e.target.value })
                    }
                    readOnly
                  />
                </div>
              </div>
              <div className="row" style={{ margin: "0", width: "100%" }}>
                <div className="col-4">
                  <span
                    className="ms-1"
                    style={{ color: "black", fontWeight: "600" }}
                  >
                    Project Type
                  </span>
                  <input
                    type="text"
                    name="projectType"
                    value={ProjectValues.projectType}
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-4">
                  <span
                    className="ms-1"
                    style={{ color: "black", fontWeight: "600" }}
                  >
                    Status
                  </span>
                  <select
                    name="status"
                    value={status}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="0">Active</option>
                    <option value="1">InActive</option>
                  </select>
                </div>
                <div className="col-4">
                  <span
                    className="ms-1"
                    style={{ color: "black", fontWeight: "600" }}
                  >
                    Progress
                  </span>
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
                  <span style={{ color: "black", fontWeight: "600" }}>
                    Project Manager
                  </span>
                  <select
                    id="manager"
                    value={selectedManagerId} // Bound to selected manager email
                    onChange={handleManagerChange} // Handle change
                    className="form-control"
                  >
                    <option value="">--Select a Manager--</option>
                    {projectManagers.map((manager) => (
                      <option key={manager.id} value={manager.email}>
                        {manager.firstName} {manager.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-8">
                  <span style={{ color: "black", fontWeight: "600" }}>
                    Project Description
                  </span>
                  <textarea
                    className="form-control textareas"
                    name="description"
                    value={ProjectValues.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
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
          size="lg"
          show={showw}
          animation={false}
          onHide={() => setShoww(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#196e8a", color: "white" }}
          >
            <Modal.Title id="example-modal-sizes-title-lg">
              Add Employees
            </Modal.Title>
          </Modal.Header>

          <form onSubmit={AddEmployeeSubmit}>
            <Modal.Body className=" econdmodel1 modelbodyyyy">
              <table
                id="example1"
                className="table  tableclassss table table-borderless"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Add</th>
                  </tr>
                </thead>
                <tbody className="getallEmployee">
                  {GetAllemployees.map((obj, index) =>
                    !obj.employee.isAlreadyAdded ? (
                      <tr
                        key={obj.employee.id}
                        className={
                          selectedRowIds.includes(obj.employee.id)
                            ? "selected-row"
                            : ""
                        }
                        style={{ margin: "0px" }}
                      >
                        <td className="data">{obj.employee.employeeId}</td>
                        <td className="data">{`${obj.employee.firstName}   ${obj.employee.lastName}`}</td>
                        <td className="data">{obj.role.name}</td>
                        <td style={{ width: "20px" }} className="data">
                          {selectedRowIds.includes(obj.employee.id) ? (
                            <RxCross2
                              onClick={(e) =>
                                toggleIcon(e, index, obj.employee.id)
                              }
                              className="cancleemployee"
                              style={{
                                cursor: "pointer",
                                color: "red",
                              }}
                            />
                          ) : (
                            <IoMdAddCircle
                              onClick={(e) =>
                                toggleIcon(e, index, obj.employee.id)
                              }
                              className="addemployeecircle "
                              style={{ cursor: "pointer", margin: "0px 15px" }}
                            />
                          )}
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="form-control "
                style={{
                  borderRadius: "10px",
                  width: "80px",
                  backgroundColor: "#196e8a",
                  color: "white",
                }}
              >
                Save
              </button>
            </Modal.Footer>
          </form>
          {/* <button
            onClick={() => setShow(false)}
            className="form-control  btn btn-dengerr "
            style={{ borderRadius: "10px", width: "80px" }}
          >
            Close
          </button> */}
        </Modal>
      </div>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
}
