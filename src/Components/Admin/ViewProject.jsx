// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import "../../assets/Styles/ViewProject.css";
// import $ from "jquery";
// import "datatables.net";
// import { IoArrowBackCircle } from "react-icons/io5";
// import Modal from "react-bootstrap/Modal";
// import { IoMdAddCircle } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import AdminDashboardServices from "../../Service/AdminService/AdminDashboardServices";
// export function ViewProject() {
//   const [Projectresponse, setresponse] = useState({});
//   const [projectEmployess, setProjectEmployees] = useState([]);
//   const [show, setShow] = useState(false);
//   const [showw, setShoww] = useState(false);
//   const [activeRow, setActiveRow] = useState(null);

//   const [Employeeids, setIds] = useState([]);

//   const [ProjectValues, setProjectValues] = useState({});
//   const [clientvalues, setClientValues] = useState({});
//   const [dataReady, setDataReady] = useState(false);
//   const [employees, setEmployees] = useState([]);
//   const [selectedRowIds, setSelectedRowIds] = useState([]);

//   const navigate = useNavigate();
//   const percentage = 66;

//   const id = localStorage.getItem("projectId");
//   useEffect(() => {
//     async function FetchData() {
//       var response = await axios.get(
//         `https://localhost:44305/api/Projects/GetProject?id=${id}`
//       );
//       var result = response.data;
//       if (result.isSuccess === true) {
//         setProjectEmployees(result.item.employeeProject);
//         setresponse(result.item.project);
//         setClientValues(result.item.client);

//         setProjectValues(result.item.project);
//         setDataReady(true);
//       }
//     }

//     FetchData();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProjectValues({
//       ...ProjectValues,
//       [name]: value,
//     });
//   };
//   useEffect(() => {
//     async function GetEmployees() {
//       var response = await AdminDashboardServices.fcngetEmployees();
//       //  console.log(response.item, "getEmployees response");
//       setEmployees(response.item);
//     }
//     GetEmployees();
//   });
//   useEffect(() => {
//     if (dataReady) {
//       $("#example").DataTable({
//         destroy: true,
//       });
//     }
//   }, [dataReady]);
//   useEffect(() => {
//     if (showw) {
//       const table = $("#example1").DataTable({
//         paging: false,
//         searching: true,
//         ordering: false,
//         info: false,
//         destroy: true,
//       });
//     }
//   }, [showw]);

//   function backonclick(e) {
//     e.preventDefault();
//     navigate("/Dashboard/AllProjects");
//   }
//   async function AddEmployeeSubmit(e) {
//     e.preventDefault();
//     const requestBody = [
//       {
//         employeeids: Employeeids,
//         id: id,
//       },
//     ];
//     console.log(requestBody, "ids");
//     const response = await axios.post(
//       "https://localhost:44305/api/Projects/AssignEmployee",
//       requestBody
//     );

//     console.log(response, "response");
//   }
//   const toggleIcon = (e, index, id) => {
//     setSelectedRowIds((prevSelectedRowIds) => {
//       let newSelectedRowIds;
//       if (id) {
//         if (!prevSelectedRowIds.includes(id)) {
//           newSelectedRowIds = [...prevSelectedRowIds, id];
//           console.log("Selected IDs after adding:", newSelectedRowIds);
//           console.log(Employeeids, "all ids");
//         } else {
//           newSelectedRowIds = prevSelectedRowIds.filter(
//             (selectedId) => selectedId !== id
//           );
//           console.log("Selected IDs after removing:", newSelectedRowIds);
//         }
//       } else {
//         const rowId = obj[index].id;
//         newSelectedRowIds = prevSelectedRowIds.filter(
//           (selectedId) => selectedId !== rowId
//         );
//         console.log("Selected IDs after removing:", newSelectedRowIds);
//       }

//       setIds(
//         newSelectedRowIds.map((selectedId) => ({ employeeid: selectedId }))
//       );

//       return newSelectedRowIds;
//     });
//   };

//   //   e.preventDefault();

//   //   setSelectedRowIds((prevSelectedRowIds) => {
//   //     if (id) {
//   //       if (!prevSelectedRowIds.includes(id)) {
//   //         console.log("Selected IDs after adding:", [
//   //           ...prevSelectedRowIds,
//   //           id,
//   //         ]);

//   //         console.log(ids, "all ids");
//   //         return [...prevSelectedRowIds, id];
//   //       } else {
//   //         console.log(
//   //           "Selected IDs after removing:",
//   //           prevSelectedRowIds.filter((selectedId) => selectedId !== id)
//   //         );
//   //         return prevSelectedRowIds.filter((selectedId) => selectedId !== id);
//   //       }
//   //     } else {
//   //       const rowId = obj[index].id;
//   //       console.log(
//   //         "Selected IDs after removing:",
//   //         prevSelectedRowIds.filter((selectedId) => selectedId !== rowId)
//   //       );
//   //       setIds(newSelectedRowIds);

//   //       return prevSelectedRowIds.filter((selectedId) => selectedId !== rowId);
//   //     }
//   //   });
//   // };
//   return (
//     <div>
//       <div className=" d-flex" style={{ justifyContent: "space-between" }}>
//         <div className="d-flex">
//           <IoArrowBackCircle
//             style={{ cursor: "pointer", fontSize: "28px", color: "block" }}
//             onClick={backonclick}
//           />

//           <p style={{ fontSize: "20px" }} className="ms-1 ">
//             Back
//           </p>
//         </div>
//         <div>
//           <Link style={{ color: "#257a96" }} onClick={() => setShow(true)}>
//             Update
//           </Link>
//         </div>
//       </div>
//       <div className="headerCards">
//         <div className="card ProjectProgress">
//           <div className="ProjectProgress">
//             <p
//               style={{ color: "#196e8a", fontFamily: "Open Sans, sans-serif" }}
//             >
//               Project Progress
//             </p>
//             <p
//               style={{ color: "#196e8a", fontFamily: "Open Sans, sans-serif" }}
//             >
//               In Progress
//             </p>
//           </div>
//           <div className="progressbaranddates">
//             <div className="circularProgressbar">
//               <CircularProgressbar value={percentage} text={`${percentage}%`} />
//             </div>
//             <div className="startdatediv">
//               <p style={{ marginBottom: "0px", color: "#BFBFBF" }}>
//                 Start Date
//               </p>
//               <p style={{ marginBottom: "0px", fontWeight: "600" }}>
//                 {Projectresponse.startDate}
//               </p>
//             </div>
//             <div>
//               <p style={{ marginBottom: "0px", color: "#BFBFBF" }}>Dealine</p>
//               <p
//                 style={{
//                   marginBottom: "0px",
//                   fontWeight: "600",
//                   fontFamily: "Open Sans, sans-serif",
//                 }}
//               >
//                 {Projectresponse.endDate}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="card ms-3">
//           <div>
//             <p
//               style={{ color: "#196e8a", fontFamily: "Open Sans, sans-serif" }}
//             >
//               Project Manager
//             </p>
//           </div>
//           <div className="ProjectMangerProfile d-flex">
//             <div className="d-flex">
//               <div>
//                 <p style={{ marginBottom: "0px", fontWeight: "400" }}>
//                   {Projectresponse.projectManager}
//                 </p>
//                 <p style={{ marginBottom: "0px", fontWeight: "400" }}>
//                   {Projectresponse.clientEmail}
//                 </p>
//               </div>
//             </div>
//             <div className="addlead">
//               <Link>Change Manager</Link>
//             </div>
//           </div>
//         </div>
//         <div className="card ms-3">
//           <div>
//             <p
//               style={{ color: "#196e8a", fontFamily: "Open Sans, sans-serif" }}
//             >
//               Client
//             </p>
//           </div>
//           <div className="d-flex">
//             <div>
//               <p style={{ marginBottom: "0px", fontWeight: "400" }}>
//                 {clientvalues.clientName}
//               </p>
//               <p style={{ marginBottom: "0px", fontWeight: "400" }}>
//                 {clientvalues.clientEmailId}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="card Projectdescription mt-4">
//         <div>
//           <p className="description">Project Details</p>
//         </div>
//         <div className="descriptioncontent mt-3">
//           <p style={{ marginBottom: "0px", fontWeight: "400" }}>
//             {Projectresponse.description}
//           </p>
//         </div>
//       </div>
//       <div className="card mt-4 employeeDetails">
//         <div className="mb-4 workingemployee">
//           <p
//             style={{
//               color: "#196e8a",
//               fontFamily: "Open Sans, sans-serif",
//               marginBottom: "0px",
//             }}
//           >
//             Working Employees
//           </p>
//           <p>
//             <Link onClick={() => setShoww(true)}>Assign</Link>
//           </p>
//         </div>
//         <div>
//           <table
//             id="example"
//             className="tableclasss table table-borderless w-0"
//           >
//             <thead>
//               <tr className="headerth">
//                 <th></th>
//                 <th>EmployeeId</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>ProjectId</th>
//                 <th>DateOfJoining</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projectEmployess.map((employees, index) => (
//                 <tr key={index}>
//                   <td>{employees.projectId}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <Modal
//         show={show}
//         onHide={() => setShow(false)}
//         animation={false}
//         className="firstmodel"
//       >
//         <Modal.Header closeButton className="header">
//           <Modal.Title>Project Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="modelbody">
//           <form>
//             <div className="row" style={{ margin: "0", width: "100%" }}>
//               <div className="col-4">
//                 <span className="ms-1">ProjectID</span>
//                 <input
//                   type="text"
//                   name="projectID"
//                   value={ProjectValues.projectID}
//                   className="form-control"
//                   onChange={handleInputChange}
//                   readOnly
//                 />
//               </div>
//               <div className="col-4">
//                 <span className="ms-1">Project Name</span>
//                 <input
//                   type="text"
//                   name="projectName"
//                   value={ProjectValues.projectName}
//                   className="form-control"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-4">
//                 <span className="ms-1">Start Date</span>
//                 <input
//                   type="text"
//                   name="startDate"
//                   value={ProjectValues.startDate}
//                   className="form-control"
//                   onChange={handleInputChange}
//                   readOnly
//                 />
//               </div>
//             </div>
//             <div className="row" style={{ margin: "0", width: "100%" }}>
//               <div className="col-4">
//                 <span className="ms-1">End Date</span>
//                 <input
//                   type="text"
//                   name="endDate"
//                   value={ProjectValues.endDate}
//                   className="form-control"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-4">
//                 <span className="ms-1">Project Ref ID</span>
//                 <input
//                   type="text"
//                   name="projectRefId"
//                   value={ProjectValues.projectRefId}
//                   className="form-control"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-4">
//                 <span className="ms-1">Client Email</span>
//                 <input
//                   type="text"
//                   name="clientEmail"
//                   value={clientvalues.clientEmailId}
//                   className="form-control"
//                   onChange={handleInputChange}
//                   readOnly
//                 />
//               </div>
//             </div>
//             <div className="row" style={{ margin: "0", width: "100%" }}>
//               <div className="col-4">
//                 <span className="ms-1">Project Type</span>
//                 <input
//                   type="text"
//                   name="projectType"
//                   value={ProjectValues.projectType}
//                   className="form-control"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-4">
//                 <span className="ms-1">Status</span>
//                 <input
//                   type="text"
//                   name="status"
//                   value={ProjectValues.status}
//                   className="form-control"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-4">
//                 <span className="ms-1">Progress</span>
//                 <input
//                   type="text"
//                   name="progress"
//                   value={ProjectValues.progress}
//                   className="form-control"
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div className="row" style={{ margin: "0", width: "100%" }}>
//               <div className="col-4">
//                 <span>Team Size</span>
//                 <input
//                   type="text"
//                   name="teamSize"
//                   value={ProjectValues.teamSize}
//                   className="form-control"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-4">
//                 <span>Project Manager</span>
//                 <input
//                   type="text"
//                   name="projectManager"
//                   value={ProjectValues.projectManager}
//                   className="form-control"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-4">
//                 <span>Created Date</span>
//                 <input
//                   type="date"
//                   name="createdDate"
//                   value={ProjectValues.createdDate}
//                   className="form-control"
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div className="row mt-2" style={{ margin: "0", width: "100%" }}>
//               <div className="col-4">
//                 <span>Updated Date</span>
//                 <input
//                   type="date"
//                   name="updatedDate"
//                   value={ProjectValues.updatedDate}
//                   className="form-control"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="col-8">
//                 <span>Project Description</span>
//                 <textarea
//                   className="form-control textareas"
//                   name="description"
//                   value={ProjectValues.description}
//                   onChange={handleInputChange}
//                 ></textarea>
//               </div>
//               {/* <div className="col-4"></div> */}
//             </div>
//             <div className="row mt-2" style={{ margin: "0", width: "100%" }}>
//               <div className="col-8"></div>
//               <div className="col-2">
//                 <button
//                   type="button"
//                   className="form-control closebutton"
//                   onClick={() => setShow(false)}
//                   style={{
//                     borderRadius: "8px",
//                     backgroundColor: "red",
//                     color: "white",
//                   }}
//                 >
//                   Close
//                 </button>
//               </div>
//               <div className="col-2">
//                 <button
//                   type="submit"
//                   className="form-control updatebtn"
//                   style={{
//                     borderRadius: "8px",
//                     backgroundColor: "rgb(25, 110, 138)",
//                     color: "white",
//                   }}
//                 >
//                   Update
//                 </button>
//               </div>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>
//       <Modal
//         show={showw}
//         onHide={() => setShoww(false)}
//         animation={false}
//         className="firstmodel1"
//       >
//         <Modal.Header closeButton className="header">
//           <Modal.Title>Employees</Modal.Title>
//         </Modal.Header>
//         <form onSubmit={AddEmployeeSubmit}>
//           <Modal.Body className=" econdmodel1 modelbodyyyy">
//             <table
//               id="example1"
//               className="tableclassss table table-borderless "
//             >
//               <thead>
//                 <tr className="headerth">
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Add</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {employees.map((obj, index) => (
//                   <tr
//                     key={obj.id}
//                     className={
//                       selectedRowIds.includes(obj.id) ? "selected-row" : ""
//                     }
//                     style={{ margin: "0px" }}
//                   >
//                     <td>{obj.employeeId}</td>
//                     <td>{`${obj.firstName}   ${obj.lastName}`}</td>
//                     <td>
//                       {selectedRowIds.includes(obj.id) ? (
//                         <RxCross2
//                           onClick={(e) => toggleIcon(e, index, obj.id)}
//                           className="cancleemployee"
//                           style={{
//                             cursor: "pointer",
//                             color: "red",
//                             textAlign: "left",
//                           }}
//                         />
//                       ) : (
//                         <IoMdAddCircle
//                           onClick={(e) => toggleIcon(e, index, obj.id)}
//                           className="addemployeecircle"
//                           style={{ cursor: "pointer" }}
//                         />
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Modal.Body>
//           <Modal.Footer>
//             <button
//               className="form-control w-25 btn btn-success "
//               style={{ borderRadius: "10px" }}
//             >
//               Save
//             </button>
//           </Modal.Footer>
//         </form>
//       </Modal>
//     </div>
//   );
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../assets/Styles/ViewProject.css";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const [Employeeids, setIds] = useState([]);

  const [ProjectValues, setProjectValues] = useState({});
  const [clientvalues, setClientValues] = useState({});
  const [dataReady, setDataReady] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const navigate = useNavigate();
  const percentage = 66;

  const id = localStorage.getItem("projectId");
  useEffect(() => {
    async function FetchData() {
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
    if (dataReady) {
      $("#example").DataTable({
        destroy: true,
        data: projectEmployess,
        columns: [
          { data: "employee.employeeId" },
          { data: "employee.firstName" },
          { data: "employee.email" },
          { data: "projectId" },
          { data: "employee.dateOfJoining" },
        ],
      });
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
      console.log("success");
      toast.success("Successfully done. ", {
        position: "top-right",
        autoClose: "3000",
      });
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  }

  const toggleIcon = (e, index, id) => {
    setSelectedRowIds((prevSelectedRowIds) => {
      let newSelectedRowIds;
      if (id) {
        if (!prevSelectedRowIds.includes(id)) {
          newSelectedRowIds = [...prevSelectedRowIds, id];
          console.log("Selected IDs after adding:", newSelectedRowIds);
          console.log(Employeeids, "all ids");
        } else {
          newSelectedRowIds = prevSelectedRowIds.filter(
            (selectedId) => selectedId !== id
          );
          console.log("Selected IDs after removing:", newSelectedRowIds);
        }
      } else {
        const rowId = obj[index].id;
        newSelectedRowIds = prevSelectedRowIds.filter(
          (selectedId) => selectedId !== rowId
        );
        console.log("Selected IDs after removing:", newSelectedRowIds);
      }

      setIds(
        newSelectedRowIds.map((selectedId) => ({ employeeid: selectedId }))
      );

      return newSelectedRowIds;
    });
  };

  return (
    <div>
      <div>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
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
                  value={percentage}
                  text={`${percentage}%`}
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
          <div className="card ms-3">
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

        <div className="card my-3 mt-4 employeeDetails d-flex justify-content-between">
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
            <Link
              onClick={() => {
                setShoww(true);
                console.log("link clicked");
              }}
            >
              <p> Add Employee</p>
            </Link>
          </div>
          <div>
            <table
              id="example"
              className="table table-striped"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Project Id</th>
                  <th>Date Of Joining</th>
                </tr>
              </thead>
              <tbody>
                {projectEmployess.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <td>{obj.employee.employeeId}</td>
                      <td>{obj.employee.firstName}</td>
                      <td>{obj.employee.email}</td>
                      <td>{obj.projectId}</td>
                      <td>{obj.employee.dateOfJoining}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          size="lg"
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Update Project
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Project Name</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    name="projectName"
                    value={ProjectValues.projectName}
                    onChange={handleInputChange}
                    placeholder="Project Name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Description"
                    name="description"
                    value={ProjectValues.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Start Date"
                    name="startDate"
                    value={ProjectValues.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="End Date"
                    name="endDate"
                    value={ProjectValues.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Project Status</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="status"
                  value={ProjectValues.status}
                  onChange={handleInputChange}
                >
                  <option value="Initiated">Initiated</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </Modal.Body>
        </Modal>
        <Modal
          size="lg"
          show={showw}
          onHide={() => setShoww(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "rgb(25, 110, 138)", color: "white" }}
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
                <tbody>
                  {employees.map((obj, index) => (
                    <tr
                      key={obj.employee.id}
                      className={
                        selectedRowIds.includes(obj.employee.id)
                          ? "selected-row"
                          : ""
                      }
                      style={{ margin: "0px" }}
                    >
                      <td>{obj.employee.employeeId}</td>
                      <td>{`${obj.employee.firstName}   ${obj.employee.lastName}`}</td>
                      <td>{obj.role.name}</td>
                      <td>
                        {selectedRowIds.includes(obj.employee.id) ? (
                          <RxCross2
                            onClick={(e) =>
                              toggleIcon(e, index, obj.employee.id)
                            }
                            className="cancleemployee"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              textAlign: "left",
                            }}
                          />
                        ) : (
                          <IoMdAddCircle
                            onClick={(e) =>
                              toggleIcon(e, index, obj.employee.id)
                            }
                            className="addemployeecircle"
                            style={{ cursor: "pointer", textAlign: "left" }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="form-control w-25 btn btn-success "
                style={{ borderRadius: "10px" }}
              >
                Save
              </button>{" "}
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
}
