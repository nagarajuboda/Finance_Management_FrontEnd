// // import { useEffect, useState, forwardRef } from "react";
// // import EmployeeService from "../../../Service/EmployeeService/EmployeeService";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import "../../../assets/Styles/TimeSheet.css";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// // import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import "react-tabs/style/react-tabs.css";
// // import { Link } from "react-router-dom"; // Ensure Link is imported if you're using react-router
// // import { format } from "date-fns"; // Import format from date-fns
// // import TimeSheetService from "../../../Service/TimeSheetService";
// // import logo from "../../../assets/Images/1.jpg";
// // import { alignProperty } from "@mui/material/styles/cssUtils";
// // import { GrPowerReset } from "react-icons/gr";
// // import { IoSaveOutline } from "react-icons/io5";
// // export default function TimeSheet() {
// //   const [projectDetails, setProjectDetails] = useState([]);
// //   const [selectedTabIndex, setSelectedTabIndex] = useState(0);
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [disabledTabs, setDisabledTabs] = useState([]); // Track disabled tabs
// //   const [hours, setHours] = useState({}); // Stores hours input by employee ID
// //   const userDetails = JSON.parse(localStorage.getItem("sessionData"));
// //   const [selectedProjectId, setSelectedProjectID] = useState("");
// //   const [employees, setEmployees] = useState([]);
// //   const now = new Date();

// //   // Set maxDate to the end of the current month
// //   const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

// //   useEffect(() => {
// //     FetchData();
// //   }, []);

// //   useEffect(() => {
// //     if (projectDetails.length > 0) {
// //       const initialProject = projectDetails[selectedTabIndex].project.id;
// //       GetProjectDeatis(initialProject, selectedDate);
// //     }
// //   }, [projectDetails]);

// //   async function FetchData() {
// //     const response = await EmployeeService.GetProjectInfo(
// //       userDetails.employee.id
// //     );
// //     const projects = response.item;
// //     console.log(projects, "selected project details");
// //     setProjectDetails(projects);
// //   }

// //   const handleTabSelect = (index) => {
// //     setSelectedTabIndex(index);
// //   };
// //   const handleDateChange = (projectId, date) => {
// //     setHours({});
// //     const formattedDate = format(date, "MMMM yyyy");
// //     setSelectedDate(date);
// //     GetProjectDeatis(projectId, formattedDate);
// //   };
// //   const handleHoursChange = (employeeId, value) => {
// //     console.log(employeeId, value);

// //     setHours((prev) => ({
// //       ...prev,
// //       [employeeId]: value,
// //     }));
// //   };
// //   const submitFunction = () => {
// //     const currentProject = projectDetails[selectedTabIndex];
// //     const employeeData = currentProject.employees.map((employee) => ({
// //       employeeId: employee.id,
// //       hoursWorked: hours[employee.id] || "",
// //     }));
// //     return {
// //       projectId: currentProject.project.id,
// //       selectedDate: format(selectedDate, "MMMM yyyy"),
// //       employeeData,
// //     };
// //   };
// //   const SaveForm = async () => {
// //     const data = submitFunction();
// //     console.log("Form Data:", data);
// //     var isSubmited = false;
// //     var response = await TimeSheetService.AddNewTimeSheet(
// //       data,
// //       userDetails.employee.id,
// //       isSubmited
// //     );
// //     if (response.isSuccess === true) {
// //       toast.success("Successfully done. ", {
// //         position: "top-right",
// //         autoClose: "4000",
// //       });
// //     } else {
// //       toast.error(response.error.message, {
// //         position: "top-right",
// //         autoClose: "4000",
// //       });
// //     }
// //   };
// //   async function SubmitFormFunction() {
// //     const data = submitFunction();
// //     var isSubmited = true;
// //     var response = await TimeSheetService.AddNewTimeSheet(
// //       data,
// //       userDetails.employee.id,
// //       isSubmited
// //     );
// //     if (response.isSuccess === true) {
// //       toast.success("Successfully done. ", {
// //         position: "top-right",
// //         autoClose: "4000",
// //       });
// //       const projectId = projectDetails[selectedTabIndex].project.id;
// //       GetProjectDeatis(projectId, selectedDate);
// //     }
// //     setDisabledTabs((prev) => [...prev, selectedTabIndex]);
// //   }

// //   const GetProjectDeatis = async (id, date) => {
// //     setHours({});
// //     setSelectedProjectID(id);
// //     var month = format(date, "MMMM yyyy");
// //     var response = await TimeSheetService.GetTimeSheetDeatils(month, id);
// //     console.log(response.item, "project wise employees");
// //     setEmployees(response.item);
// //     response.item.map((each) => {
// //       setHours((prev) => ({
// //         ...prev,
// //         [each.employeeId]: each.workingHourse,
// //       }));
// //     });
// //   };
// //   const Resetfunction = (employeeId) => {
// //     setHours((prev) => ({
// //       ...prev,
// //       [employeeId]: "",
// //     }));
// //   };
// //   console.log(employees, "getTimesheet employees");
// //   return (
// //     <div className="Maindiv">
// //       <div className="card" style={{ borderRadius: "0px" }}>
// //         <div>
// //           <p className="timesheet">Time Sheet</p>
// //         </div>

// //         <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
// //           <TabList>
// //             {projectDetails.map((obj, index) => (
// //               <Tab
// //                 key={index}
// //                 style={{ color: "blue" }}
// //                 onClick={() => GetProjectDeatis(obj.project.id, selectedDate)}
// //               >
// //                 {obj.project.projectName}
// //               </Tab>
// //             ))}
// //           </TabList>

// //           {projectDetails.map((project, projectIndex) => (
// //             <TabPanel key={projectIndex}>
// //               <div>
// //                 <div className="datepicker">
// //                   <DatePicker
// //                     style={{ alignItems: "end" }}
// //                     selected={selectedDate}
// //                     onChange={(date) =>
// //                       handleDateChange(project.project.id, date)
// //                     }
// //                     showMonthYearPicker
// //                     dateFormat="MMMM yyyy"
// //                     customInput={<CustomInput />}
// //                     className="w-100"
// //                     maxDate={maxDate}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="row">
// //                 <table className="table table-striped  mt-2">
// //                   <thead>
// //                     <tr>
// //                       <th className="tableheader">NAME</th>
// //                       <th className="tableheader">DESIGNATION</th>
// //                       <th className="tableheader">STATUS</th>
// //                       <th className="tableheader">ROLE</th>
// //                       <th className="tableheader">DURATION</th>
// //                       <th className="tableheader">ACTIONS</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {project.employees.map((emp, index) => (
// //                       <tr key={index}>
// //                         <td>
// //                           <div
// //                             className="d-flex"
// //                             style={{ alignItems: "center" }}
// //                           >
// //                             <div>
// //                               <img
// //                                 src={logo}
// //                                 alt=""
// //                                 width="40px"
// //                                 height="40px"
// //                               />
// //                             </div>

// //                             <div>
// //                               <div className="empName ms-2">
// //                                 {`${emp.firstName} ${emp.lastName}`}
// //                               </div>
// //                               <div className="ms-2">{emp.email}</div>
// //                             </div>
// //                           </div>
// //                         </td>
// //                         <td>
// //                           <div>
// //                             <div className="" style={{ textAlign: "start" }}>
// //                               Designation
// //                             </div>
// //                             <div
// //                               className="role"
// //                               style={{ textAlign: "start" }}
// //                             >
// //                               {/* {emp.role.name} */}
// //                             </div>
// //                           </div>
// //                         </td>
// //                         <td>
// //                           {emp.employeeStatus == "Active" ? (
// //                             <div
// //                               className=""
// //                               style={{
// //                                 backgroundColor: "#196e8a",
// //                                 borderRadius: "40px",
// //                                 textAlign: "center",
// //                                 color: "white",
// //                               }}
// //                             >
// //                               <span>{emp.employeeStatus}</span>
// //                             </div>
// //                           ) : (
// //                             <div
// //                               className=""
// //                               style={{
// //                                 textAlign: "start",
// //                                 backgroundColor: "#ADD8E6",
// //                                 borderRadius: "40px",
// //                               }}
// //                             >
// //                               {emp.employeeStatus}
// //                             </div>
// //                           )}
// //                         </td>
// //                         <td>
// //                           <div className="role" style={{ textAlign: "start" }}>
// //                             {emp.role.name}
// //                           </div>
// //                         </td>

// //                         <td>
// //                           <input
// //                             type="text"
// //                             className="form-control w-50"
// //                             placeholder="Enter hours"
// //                             value={hours[emp.id]}
// //                             onChange={(e) =>
// //                               handleHoursChange(emp.id, e.target.value)
// //                             }
// //                           />
// //                         </td>
// //                         <td>
// //                           <div className="d-flex" style={{}}>
// //                             <div className="" style={{ textAlign: "start" }}>
// //                               <GrPowerReset
// //                                 onClick={() => Resetfunction(emp.employeeId)}
// //                                 cursor="pointer"
// //                               />
// //                             </div>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //                 <div className="d-flex" style={{ justifyContent: "end" }}>
// //                   <div className="me-4">
// //                     <button className="btn btn-primary" onClick={SaveForm}>
// //                       Save
// //                     </button>
// //                   </div>
// //                   <div>
// //                     <button className="btn btn-success">Submit</button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </TabPanel>
// //           ))}
// //         </Tabs>
// //       </div>
// //       <ToastContainer position="top-end" autoClose={5000} />
// //     </div>
// //   );
// // }

// // const CustomInput = forwardRef(({ value, onClick }, ref) => (
// //   <div
// //     className="custom-input"
// //     onClick={onClick}
// //     ref={ref}
// //     style={{
// //       display: "flex",
// //       alignItems: "center",
// //       padding: "5px 10px",
// //       border: "1px solid #ccc",
// //       borderRadius: "4px",
// //       cursor: "pointer",
// //     }}
// //   >
// //     <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "5px" }} />
// //     <span>{value}</span>
// //   </div>
// // ));
// import { useEffect, useState, forwardRef } from "react";
// import EmployeeService from "../../../Service/EmployeeService/EmployeeService";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../../../assets/Styles/TimeSheet.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-tabs/style/react-tabs.css";
// import { Link } from "react-router-dom"; // Ensure Link is imported if you're using react-router
// import { format } from "date-fns"; // Import format from date-fns
// import TimeSheetService from "../../../Service/TimeSheetService";
// import logo from "../../../assets/Images/1.jpg";
// import { alignProperty } from "@mui/material/styles/cssUtils";
// import { GrPowerReset } from "react-icons/gr";
// import { IoSaveOutline } from "react-icons/io5";

// export default function TimeSheet() {
//   const [projectDetails, setProjectDetails] = useState([]);
//   const [selectedTabIndex, setSelectedTabIndex] = useState(0);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [disabledTabs, setDisabledTabs] = useState([]); // Track disabled tabs
//   const [hours, setHours] = useState({}); // Stores hours input by employee ID
//   const userDetails = JSON.parse(localStorage.getItem("sessionData"));
//   const [selectedProjectId, setSelectedProjectID] = useState("");
//   const [employees, setEmployees] = useState([]);
//   const now = new Date();

//   // Set maxDate to the end of the current month
//   const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

//   useEffect(() => {
//     FetchData();
//   }, []);

//   useEffect(() => {
//     if (projectDetails.length > 0) {
//       const initialProject = projectDetails[selectedTabIndex].project.id;
//       GetProjectDeatis(initialProject, selectedDate);
//     }
//   }, [projectDetails]);

//   async function FetchData() {
//     const response = await EmployeeService.GetProjectInfo(
//       userDetails.employee.id
//     );
//     const projects = response.item;
//     console.log(projects, "selected project details");
//     setProjectDetails(projects);
//   }

//   const handleTabSelect = (index) => {
//     setSelectedTabIndex(index);
//   };

//    const handleDateChange = (projectId, date) => {
//     const formattedDate = format(date, "MMMM yyyy");
//     setSelectedDate(date);
//     GetProjectDeatis(projectId, formattedDate);

//     // Clear hours state when month changes
//     setHours({});
//   };

//   const handleHoursChange = (employeeId, value) => {
//     console.log(employeeId, value);
//     setHours((prev) => ({
//       ...prev,
//       [employeeId]: value,
//     }));
//   };

//   const submitFunction = () => {
//     const currentProject = projectDetails[selectedTabIndex];
//     const employeeData = currentProject.employees.map((employee) => ({
//       employeeId: employee.id,
//       hoursWorked: hours[employee.id] || "",
//     }));
//     return {
//       projectId: currentProject.project.id,
//       selectedDate: format(selectedDate, "MMMM yyyy"),
//       employeeData,
//     };
//   };

//   const SaveForm = async () => {
//     const data = submitFunction();
//     console.log("Form Data:", data);
//     var isSubmited = false;
//     var response = await TimeSheetService.AddNewTimeSheet(
//       data,
//       userDetails.employee.id,
//       isSubmited
//     );
//     if (response.isSuccess === true) {
//       toast.success("Successfully done. ", {
//         position: "top-right",
//         autoClose: "4000",
//       });
//     } else {
//       toast.error(response.error.message, {
//         position: "top-right",
//         autoClose: "4000",
//       });
//     }
//   };

//   async function SubmitFormFunction() {
//     const data = submitFunction();
//     var isSubmited = true;
//     var response = await TimeSheetService.AddNewTimeSheet(
//       data,
//       userDetails.employee.id,
//       isSubmited
//     );
//     if (response.isSuccess === true) {
//       toast.success("Successfully done. ", {
//         position: "top-right",
//         autoClose: "4000",
//       });
//       const projectId = projectDetails[selectedTabIndex].project.id;
//       GetProjectDeatis(projectId, selectedDate);
//     }
//     setDisabledTabs((prev) => [...prev, selectedTabIndex]);
//   }

//   const GetProjectDeatis = async (id, date) => {
//     setHours({});
//     setSelectedProjectID(id);
//     var month = format(date, "MMMM yyyy");
//     var response = await TimeSheetService.GetTimeSheetDeatils(month, id);
//     console.log(response.item, "project wise employees");
//     setEmployees(response.item);
//     response.item.map((each) => {
//       setHours((prev) => ({
//         ...prev,
//         [each.employeeId]: each.workingHourse,
//       }));
//     });
//   };

//   const Resetfunction = (employeeId) => {
//     setHours((prev) => ({
//       ...prev,
//       [employeeId]: "",
//     }));
//   };

//   console.log(employees, "getTimesheet employees");

//   return (
//     <div className="Maindiv">
//       <div className="card" style={{ borderRadius: "0px" }}>
//         <div>
//           <p className="timesheet">Time Sheet</p>
//         </div>

//         <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
//           <TabList>
//             {projectDetails.map((obj, index) => (
//               <Tab
//                 key={index}
//                 style={{ color: "blue" }}
//                 onClick={() => GetProjectDeatis(obj.project.id, selectedDate)}
//               >
//                 {obj.project.projectName}
//               </Tab>
//             ))}
//           </TabList>

//           {projectDetails.map((project, projectIndex) => (
//             <TabPanel key={projectIndex}>
//               <div>
//                 <div className="datepicker">
//                   <DatePicker
//                     style={{ alignItems: "end" }}
//                     selected={selectedDate}
//                     onChange={(date) =>
//                       handleDateChange(project.project.id, date)
//                     }
//                     showMonthYearPicker
//                     dateFormat="MMMM yyyy"
//                     customInput={<CustomInput />}
//                     className="w-100"
//                     maxDate={maxDate}
//                   />
//                 </div>
//               </div>

//               <div className="row">
//                 <table className="table table-striped  mt-2">
//                   <thead>
//                     <tr>
//                       <th className="tableheader">NAME</th>
//                       <th className="tableheader">DESIGNATION</th>
//                       <th className="tableheader">STATUS</th>
//                       <th className="tableheader">ROLE</th>
//                       <th className="tableheader">DURATION</th>
//                       <th className="tableheader">ACTIONS</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {project.employees.map((emp, index) => (
//                       <tr key={index}>
//                         <td>
//                           <div
//                             className="d-flex"
//                             style={{ alignItems: "center" }}
//                           >
//                             <div>
//                               <img
//                                 src={logo}
//                                 alt=""
//                                 width="40px"
//                                 height="40px"
//                               />
//                             </div>

//                             <div>
//                               <div className="empName ms-2">
//                                 {`${emp.firstName} ${emp.lastName}`}
//                               </div>
//                               <div className="ms-2">{emp.email}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <div>
//                             <div className="" style={{ textAlign: "start" }}>
//                               Designation
//                             </div>
//                             <div
//                               className="role"
//                               style={{ textAlign: "start" }}
//                             >
//                               {/* {emp.role.name} */}
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           {emp.employeeStatus == "Active" ? (
//                             <div
//                               className=""
//                               style={{
//                                 backgroundColor: "#196e8a",
//                                 borderRadius: "40px",
//                                 textAlign: "center",
//                                 color: "white",
//                               }}
//                             >
//                               <span>{emp.employeeStatus}</span>
//                             </div>
//                           ) : (
//                             <div
//                               className=""
//                               style={{
//                                 textAlign: "start",
//                                 backgroundColor: "#ADD8E6",
//                                 borderRadius: "40px",
//                               }}
//                             >
//                               {emp.employeeStatus}
//                             </div>
//                           )}
//                         </td>
//                         <td>
//                           <div className="role" style={{ textAlign: "start" }}>
//                             {emp.role.name}
//                           </div>
//                         </td>

//                         <td>
//                           <input
//                             type="text"
//                             className="form-control w-50"
//                             placeholder="Enter hours"
//                             value={hours[emp.id]}
//                             onChange={(e) =>
//                               handleHoursChange(emp.id, e.target.value)
//                             }
//                           />
//                         </td>
//                         <td>
//                           <div className="d-flex" style={{}}>
//                             <div
//                               className=""
//                               style={{ textAlign: "start" }}
//                               data-tip="Reset Hours"
//                             >
//                               <GrPowerReset
//                                 onClick={() => Resetfunction(emp.employeeId)}
//                                 cursor="pointer"
//                               />
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <div className="d-flex" style={{ justifyContent: "end" }}>
//                   <div className="me-4">
//                     <button className="btn btn-primary" onClick={SaveForm}>
//                       Save
//                     </button>
//                   </div>
//                   <div>
//                     <button
//                       className="btn btn-success"
//                       onClick={SubmitFormFunction}
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </TabPanel>
//           ))}
//         </Tabs>
//       </div>
//       <ToastContainer position="top-end" autoClose={5000} />
//     </div>
//   );
// }

// const CustomInput = forwardRef(({ value, onClick }, ref) => (
//   <div
//     className="custom-input"
//     onClick={onClick}
//     ref={ref}
//     style={{
//       display: "flex",
//       alignItems: "center",
//       padding: "5px 10px",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//       cursor: "pointer",
//     }}
//   >
//     <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "5px" }} />
//     <span>{value}</span>
//   </div>
// ));
// import { useEffect, useState, forwardRef } from "react";
// import EmployeeService from "../../../Service/EmployeeService/EmployeeService";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../../../assets/Styles/TimeSheet.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "react-tabs/style/react-tabs.css";
// import { format } from "date-fns";
// import TimeSheetService from "../../../Service/TimeSheetService";
// import logo from "../../../assets/Images/1.jpg";
// import { GrPowerReset } from "react-icons/gr";
// import { IoSaveOutline } from "react-icons/io5";

// export default function TimeSheet() {
//   const [projectDetails, setProjectDetails] = useState([]);
//   const [selectedTabIndex, setSelectedTabIndex] = useState(0);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [disabledTabs, setDisabledTabs] = useState([]);
//   const [hours, setHours] = useState({});
//   const userDetails = JSON.parse(localStorage.getItem("sessionData"));
//   const [selectedProjectId, setSelectedProjectID] = useState("");
//   const [employees, setEmployees] = useState([]);
//   const now = new Date();
//   const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

//   useEffect(() => {
//     FetchData();
//   }, []);

//   useEffect(() => {
//     if (projectDetails.length > 0) {
//       const initialProject = projectDetails[selectedTabIndex].project.id;
//       GetProjectDeatis(initialProject, selectedDate);
//     }
//   }, [projectDetails, selectedTabIndex, selectedDate]);

//   async function FetchData() {
//     try {
//       const response = await EmployeeService.GetProjectInfo(
//         userDetails.employee.id
//       );
//       const projects = response.item;
//       console.log(projects, "selected project details");
//       setProjectDetails(projects);
//     } catch (error) {
//       console.error("Error fetching project details:", error);
//     }
//   }

//   const handleTabSelect = (index) => {
//     setSelectedTabIndex(index);
//   };

//   const handleDateChange = async (projectId, date) => {
//     const formattedDate = format(date, "MMMM yyyy");
//     setSelectedDate(date);

//     // Clear hours state when month changes
//     setHours({});

//     // Fetch new data after clearing hours
//     await GetProjectDeatis(projectId, formattedDate);
//   };

//   const handleHoursChange = (employeeId, value) => {
//     console.log(employeeId, value);
//     setHours((prev) => ({
//       ...prev,
//       [employeeId]: value,
//     }));
//   };

//   const submitFunction = () => {
//     const currentProject = projectDetails[selectedTabIndex];
//     const employeeData = currentProject.employees.map((employee) => ({
//       employeeId: employee.id,
//       hoursWorked: hours[employee.id] || "",
//     }));
//     return {
//       projectId: currentProject.project.id,
//       selectedDate: format(selectedDate, "MMMM yyyy"),
//       employeeData,
//     };
//   };

//   const SaveForm = async () => {
//     const data = submitFunction();
//     console.log("Form Data:", data);
//     try {
//       const response = await TimeSheetService.AddNewTimeSheet(
//         data,
//         userDetails.employee.id,
//         false
//       );
//       if (response.isSuccess) {
//         toast.success("Successfully saved.", {
//           position: "top-right",
//           autoClose: 4000,
//         });
//       } else {
//         toast.error(response.error.message, {
//           position: "top-right",
//           autoClose: 4000,
//         });
//       }
//     } catch (error) {
//       console.error("Error saving form:", error);
//     }
//   };

//   const SubmitFormFunction = async () => {
//     const data = submitFunction();
//     try {
//       const response = await TimeSheetService.AddNewTimeSheet(
//         data,
//         userDetails.employee.id,
//         true
//       );
//       if (response.isSuccess) {
//         toast.success("Successfully submitted.", {
//           position: "top-right",
//           autoClose: 4000,
//         });
//         const projectId = projectDetails[selectedTabIndex].project.id;
//         await GetProjectDeatis(projectId, selectedDate);
//         setDisabledTabs((prev) => [...prev, selectedTabIndex]);
//       } else {
//         toast.error(response.error.message, {
//           position: "top-right",
//           autoClose: 4000,
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const GetProjectDeatis = async (id, date) => {
//     setSelectedProjectID(id);
//     const formattedDate = format(date, "MMMM yyyy");
//     try {
//       const response = await TimeSheetService.GetTimeSheetDeatils(
//         formattedDate,
//         id
//       );
//       console.log(response.item, "project wise employees");
//       setEmployees(response.item);

//       // Update hours with the new data
//       const newHours = {};
//       response.item.forEach((each) => {
//         newHours[each.employeeId] = each.workingHourse;
//       });
//       setHours(newHours);
//     } catch (error) {
//       console.error("Error fetching project details:", error);
//     }
//   };

//   const Resetfunction = (employeeId) => {
//     setHours((prev) => ({
//       ...prev,
//       [employeeId]: "",
//     }));
//   };

//   console.log(employees, "getTimesheet employees");

//   return (
//     <div className="Maindiv">
//       <div className="card" style={{ borderRadius: "0px" }}>
//         <div>
//           <p className="timesheet">Time Sheet</p>
//         </div>

//         <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
//           <TabList>
//             {projectDetails.map((obj, index) => (
//               <Tab
//                 key={index}
//                 style={{ color: "blue" }}
//                 onClick={() => GetProjectDeatis(obj.project.id, selectedDate)}
//               >
//                 {obj.project.projectName}
//               </Tab>
//             ))}
//           </TabList>

//           {projectDetails.map((project, projectIndex) => (
//             <TabPanel key={projectIndex}>
//               <div>
//                 <div className="datepicker">
//                   <DatePicker
//                     style={{ alignItems: "end" }}
//                     selected={selectedDate}
//                     onChange={(date) =>
//                       handleDateChange(project.project.id, date)
//                     }
//                     showMonthYearPicker
//                     dateFormat="MMMM yyyy"
//                     customInput={<CustomInput />}
//                     className="w-100"
//                     maxDate={maxDate}
//                   />
//                 </div>
//               </div>

//               <div className="row">
//                 <table className="table table-striped mt-2">
//                   <thead>
//                     <tr>
//                       <th className="tableheader">NAME</th>
//                       <th className="tableheader">DESIGNATION</th>
//                       <th className="tableheader">STATUS</th>
//                       <th className="tableheader">ROLE</th>
//                       <th className="tableheader">DURATION</th>
//                       <th className="tableheader">ACTIONS</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {project.employees.map((emp, index) => (
//                       <tr key={index}>
//                         <td>
//                           <div
//                             className="d-flex"
//                             style={{ alignItems: "center" }}
//                           >
//                             <div>
//                               <img
//                                 src={logo}
//                                 alt=""
//                                 width="40px"
//                                 height="40px"
//                               />
//                             </div>
//                             <div>
//                               <div className="empName ms-2">
//                                 {`${emp.firstName} ${emp.lastName}`}
//                               </div>
//                               <div className="ms-2">{emp.email}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <div style={{ textAlign: "start" }}>Designation</div>
//                           <div className="role" style={{ textAlign: "start" }}>
//                             {emp.role?.name || ""}
//                           </div>
//                         </td>
//                         <td>
//                           <div
//                             style={{
//                               backgroundColor:
//                                 emp.employeeStatus === "Active"
//                                   ? "#196e8a"
//                                   : "#ADD8E6",
//                               borderRadius: "40px",
//                               color:
//                                 emp.employeeStatus === "Active"
//                                   ? "white"
//                                   : "black",
//                               textAlign: "center",
//                             }}
//                           >
//                             <span>{emp.employeeStatus}</span>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="role" style={{ textAlign: "start" }}>
//                             {emp.role?.name || ""}
//                           </div>
//                         </td>
//                         <td>
//                           {employees.length > 0 ? (
//                             employees.map((obj, index) => (
//                               <div key={obj.employeeId}>
//                                 {obj.isSubmited === true ? (
//                                   <p>{obj.workingHourse}</p>
//                                 ) : (
//                                   <input
//                                     type="text"
//                                     className="form-control w-50"
//                                     placeholder="Enter hours"
//                                     value={hours[obj.employeeId] || ""}
//                                     onChange={(e) =>
//                                       handleHoursChange(
//                                         obj.employeeId,
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                 )}
//                               </div>
//                             ))
//                           ) : (
//                             <input
//                               type="text"
//                               className="form-control w-50"
//                               placeholder="Enter hours"
//                               value={hours[emp.id] || ""}
//                               onChange={(e) =>
//                                 handleHoursChange(emp.id, e.target.value)
//                               }
//                             />
//                           )}
//                         </td>
//                         <td>
//                           <div className="d-flex">
//                             <GrPowerReset
//                               onClick={() => Resetfunction(emp.id)}
//                               cursor="pointer"
//                               title="Reset Hours"
//                             />
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
// <div className="d-flex" style={{ justifyContent: "end" }}>
//   <div className="me-4">
//     <button className="btn btn-primary" onClick={SaveForm}>
//       Save
//     </button>
//   </div>
//   <div>
//     <button
//       className="btn btn-success"
//       onClick={SubmitFormFunction}
//     >
//       Submit
//     </button>
//   </div>
// </div>
//               </div>
//             </TabPanel>
//           ))}
//         </Tabs>
//       </div>
//       <ToastContainer position="top-end" autoClose={5000} />
//     </div>
//   );
// }

// const CustomInput = forwardRef(({ value, onClick }, ref) => (
//   <div
//     className="custom-input"
//     onClick={onClick}
//     ref={ref}
//     style={{
//       display: "flex",
//       alignItems: "center",
//       padding: "5px 10px",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//       cursor: "pointer",
//     }}
//   >
//     <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "5px" }} />
//     <span>{value}</span>
//   </div>
// ));
import { useEffect, useState, forwardRef } from "react";
import EmployeeService from "../../../Service/EmployeeService/EmployeeService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/Styles/TimeSheet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tabs/style/react-tabs.css";
import { format } from "date-fns";
import TimeSheetService from "../../../Service/TimeSheetService";
import logo from "../../../assets/Images/1.jpg";
import { GrPowerReset } from "react-icons/gr";
import { IoSaveOutline } from "react-icons/io5";

export default function TimeSheet() {
  const [projectDetails, setProjectDetails] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [disabledTabs, setDisabledTabs] = useState([]);
  const [hours, setHours] = useState({});
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
  const [selectedProjectId, setSelectedProjectID] = useState("");
  const [employees, setEmployees] = useState([]);
  const now = new Date();
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    if (projectDetails.length > 0) {
      const initialProject = projectDetails[selectedTabIndex].project.id;
      GetProjectDeatis(initialProject, selectedDate);
    }
  }, [projectDetails, selectedTabIndex, selectedDate]);

  async function FetchData() {
    try {
      const response = await EmployeeService.GetProjectInfo(
        userDetails.employee.id
      );
      const projects = response.item;
      console.log(projects, "selected project details");
      setProjectDetails(projects);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  }

  const handleTabSelect = (index) => {
    setSelectedTabIndex(index);
  };

  const handleDateChange = async (projectId, date) => {
    const formattedDate = format(date, "MMMM yyyy");
    setSelectedDate(date);

    // Clear hours state when month changes
    setHours({});

    // Fetch new data after clearing hours
    await GetProjectDeatis(projectId, formattedDate);
  };

  const handleHoursChange = (employeeId, value) => {
    console.log(employeeId, value);
    setHours((prev) => ({
      ...prev,
      [employeeId]: value,
    }));
  };

  const submitFunction = () => {
    const currentProject = projectDetails[selectedTabIndex];
    const employeeData = currentProject.employees.map((employee) => ({
      employeeId: employee.id,
      hoursWorked: hours[employee.id] || "",
    }));
    return {
      projectId: currentProject.project.id,
      selectedDate: format(selectedDate, "MMMM yyyy"),
      employeeData,
    };
  };

  const SaveForm = async () => {
    const data = submitFunction();
    console.log("Form Data:", data);
    try {
      const response = await TimeSheetService.AddNewTimeSheet(
        data,
        userDetails.employee.id,
        false
      );
      if (response.isSuccess) {
        toast.success("Successfully saved.", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.error(response.error.message, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  const SubmitFormFunction = async () => {
    const data = submitFunction();
    try {
      const response = await TimeSheetService.AddNewTimeSheet(
        data,
        userDetails.employee.id,
        true
      );
      if (response.isSuccess) {
        toast.success("Successfully submitted.", {
          position: "top-right",
          autoClose: 4000,
        });
        const projectId = projectDetails[selectedTabIndex].project.id;
        await GetProjectDeatis(projectId, selectedDate);
        setDisabledTabs((prev) => [...prev, selectedTabIndex]);
      } else {
        toast.error(response.error.message, {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const GetProjectDeatis = async (id, date) => {
    setSelectedProjectID(id);
    const formattedDate = format(date, "MMMM yyyy");
    try {
      const response = await TimeSheetService.GetTimeSheetDeatils(
        formattedDate,
        id
      );
      console.log(response.item, "project wise employees");
      setEmployees(response.item);

      // Update hours with the new data
      const newHours = {};
      response.item.forEach((each) => {
        newHours[each.employeeId] = each.workingHourse;
      });
      setHours(newHours);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const Resetfunction = (employeeId) => {
    setHours((prev) => ({
      ...prev,
      [employeeId]: "",
    }));
  };

  console.log(employees, "getTimesheet employees");

  return (
    <div className="Maindiv">
      <div className="card" style={{ borderRadius: "0px" }}>
        <div>
          <p className="timesheet">Time Sheet</p>
        </div>

        <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
          <TabList>
            {projectDetails.map((obj, index) => (
              <Tab
                key={index}
                style={{ color: "blue" }}
                onClick={() => GetProjectDeatis(obj.project.id, selectedDate)}
              >
                {obj.project.projectName}
              </Tab>
            ))}
          </TabList>

          {projectDetails.map((project, projectIndex) => (
            <TabPanel key={projectIndex}>
              <div>
                <div className="datepicker">
                  <DatePicker
                    style={{ alignItems: "end" }}
                    selected={selectedDate}
                    onChange={(date) =>
                      handleDateChange(project.project.id, date)
                    }
                    showMonthYearPicker
                    dateFormat="MMMM yyyy"
                    customInput={<CustomInput />}
                    className="w-100"
                    maxDate={maxDate}
                  />
                </div>
              </div>

              <div className="row">
                <table className="table table-striped mt-2">
                  <thead>
                    <tr>
                      <th className="tableheader">NAME</th>
                      <th className="tableheader">DESIGNATION</th>
                      <th className="tableheader">STATUS</th>
                      <th className="tableheader">ROLE</th>
                      <th className="tableheader">DURATION</th>
                      <th className="tableheader">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.employees.map((emp, index) => (
                      <tr key={index}>
                        <td>
                          <div
                            className="d-flex"
                            style={{ alignItems: "center" }}
                          >
                            <div>
                              {/* <img
                                src={logo}
                                alt=""
                                width="40px"
                                height="40px"
                              /> */}
                            </div>
                            <div>
                              <div className="empName ">
                                {`${emp.firstName} ${emp.lastName}`}
                              </div>
                              <div className="">{emp.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ textAlign: "start" }}>Designation</div>
                          <div className="role" style={{ textAlign: "start" }}>
                            {/* {emp.role?.name || ""} */}
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              backgroundColor:
                                emp.employeeStatus === "Active"
                                  ? "#196e8a"
                                  : "#ADD8E6",
                              borderRadius: "40px",
                              color:
                                emp.employeeStatus === "Active"
                                  ? "white"
                                  : "black",
                              textAlign: "center",
                            }}
                          >
                            <span>{emp.employeeStatus}</span>
                          </div>
                        </td>
                        <td>
                          <div className="role" style={{ textAlign: "start" }}>
                            {emp.role?.name || ""}
                          </div>
                        </td>
                        <td>
                          {employees.length > 0 &&
                          employees.some((obj) => obj.employeeId === emp.id) ? (
                            employees
                              .filter((obj) => obj.employeeId === emp.id)
                              .map((filteredEmployee) => (
                                <div key={filteredEmployee.employeeId}>
                                  {filteredEmployee.isSubmited === true ? (
                                    <div>{filteredEmployee.workingHourse}</div>
                                  ) : (
                                    <input
                                      type="text"
                                      className="form-control w-50"
                                      value={hours[emp.id] || ""}
                                      onChange={(e) =>
                                        handleHoursChange(
                                          emp.id,
                                          e.target.value
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              ))
                          ) : (
                            <input
                              type="text"
                              className="form-control w-50"
                              value={hours[emp.id] || ""}
                              onChange={(e) =>
                                handleHoursChange(emp.id, e.target.value)
                              }
                            />
                          )}
                        </td>
                        <td>
                          <div>
                            <GrPowerReset
                              size={22}
                              style={{
                                cursor: "pointer",
                                textAlign: "start",
                                display: "flex",
                              }}
                              onClick={() => Resetfunction(emp.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex" style={{ justifyContent: "end" }}>
                  <div className="me-4">
                    <button className="btn btn-primary" onClick={SaveForm}>
                      Save
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={SubmitFormFunction}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
}

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className="custom-input" onClick={onClick} ref={ref}>
    <FontAwesomeIcon icon={faCalendar} style={{ color: "blue" }} />
    <span style={{ color: "black", paddingLeft: "6px" }}>{value}</span>
  </button>
));
