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

// export default function TimeSheet() {
//   const [projectDetails, setProjectDetails] = useState([]);
//   const [selectedTabIndex, setSelectedTabIndex] = useState(0);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showsave, setShowSave] = useState(true);
//   const [showReset, setShowReset] = useState(true);
//   const [hours, setHours] = useState({}); // Stores hours input by employee ID
//   const userDetails = JSON.parse(localStorage.getItem("sessionData"));

//   useEffect(() => {
//     FetchData();
//   }, []);

//   async function FetchData() {
//     const response = await EmployeeService.GetProjectInfo(
//       userDetails.employee.id
//     );
//     const projects = response.item;
//     setProjectDetails(projects);
//   }

//   const handleTabSelect = (index) => {
//     setSelectedTabIndex(index);
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleHoursChange = (employeeId, value) => {
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
//       selectedDate: format(selectedDate, "MMMM yyyy"), // Format selectedDate
//       employeeData,
//     };
//   };

//   const FormSubmitfunction = async () => {
//     const data = submitFunction();
//     console.log("Form Data:", data);
//     // Handle form submission logic (e.g., API call)
//     var response = await TimeSheetService.AddNewTimeSheet(
//       data,
//       userDetails.employee.id
//     );
//     if (response.isSuccess === true) {
//       toast.success("Successfully done. ", {
//         position: "top-right",
//         autoClose: "4000",
//       });
//     }
//   };
//   const handleClick = (e) => {
//     e.preventDefault();
//     FormSubmitfunction();

//     setShowSave(false);
//   };
//   const ResetClick = (e) => {
//     e.preventDefault();
//     Resetfunction();

//     setShowReset(false);
//   };

//   const SubmitFormFunction = async () => {
//     console.log("submit button");
//     setShowSave(false);
//     setShowReset(false);
//   };
//   const Resetfunction = () => {
//     setHours({});
//   };

//   return (
//     <div className="Maindiv">
//       <div className="card">
//         <div>
//           <p className="timesheet">Time Sheet</p>
//         </div>

//         <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
//           <TabList>
//             {projectDetails.map((obj, index) => (
//               <Tab key={index} style={{ color: "blue" }}>
//                 {obj.project.projectName}
//               </Tab>
//             ))}
//           </TabList>

//           {projectDetails.map((project, projectIndex) => (
//             <TabPanel key={projectIndex}>
//               <div>
//                 <div
//                   className="date-picker-container"
//                   style={{
//                     position: "relative",
//                     display: "inline-block ",
//                     margin: "0px 23px",
//                   }}
//                 >
//                   <span style={{ color: "black" }}>Month</span>
//                   <DatePicker
//                     selected={selectedDate}
//                     onChange={handleDateChange}
//                     showMonthYearPicker
//                     dateFormat="MMMM yyyy"
//                     customInput={<CustomInput />}
//                     className="w-100"
//                   />
//                 </div>
//               </div>
//               <form>
//                 <div className="row">
//                   <div className="col-3 header">
//                     <span style={{ marginLeft: "7px" }}>Employee Name</span>
//                   </div>
//                   <div className="col-3 header">
//                     <span style={{ marginLeft: "7px" }}>Hours</span>
//                   </div>
//                   <div className="col-6"></div>
//                 </div>
//                 {project.employees.map((employee) => (
//                   <div key={employee.id}>
//                     <div className="row m-2">
//                       <div className="col-3">
//                         <p
//                           style={{ marginLeft: "5px" }}
//                         >{`${employee.firstName} ${employee.lastName}`}</p>
//                       </div>
//                       <div className="col-3">
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Enter hours"
//                           value={hours[employee.id] || ""}
//                           onChange={(e) =>
//                             handleHoursChange(employee.id, e.target.value)
//                           }
//                         />
//                       </div>
//                       <div className="col-6"></div>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="btnss">
//                   <Link
//                     onClick={ResetClick}
//                     disabled={!showReset}
//                     className="ms-3 btn btn-success"
//                   >
//                     Reset
//                   </Link>
//                   <Link
//                     className="ms-3 btn btn-success"
//                     disabled={!showsave}
//                     onClick={handleClick}
//                   >
//                     Save
//                   </Link>
//                   <Link
//                     className="ms-3 btn btn-primary"
//                     onClick={SubmitFormFunction}
//                   >
//                     Submit
//                   </Link>
//                 </div>
//               </form>
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
//     <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "10px" }} />
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
import { Link } from "react-router-dom"; // Ensure Link is imported if you're using react-router
import { format } from "date-fns"; // Import format from date-fns
import TimeSheetService from "../../../Service/TimeSheetService";

export default function TimeSheet() {
  const [projectDetails, setProjectDetails] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [disabledTabs, setDisabledTabs] = useState([]); // Track disabled tabs
  const [hours, setHours] = useState({}); // Stores hours input by employee ID
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));

  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    const response = await EmployeeService.GetProjectInfo(
      userDetails.employee.id
    );
    const projects = response.item;
    setProjectDetails(projects);
  }

  const handleTabSelect = (index) => {
    setSelectedTabIndex(index);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleHoursChange = (employeeId, value) => {
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
      selectedDate: format(selectedDate, "MMMM yyyy"), // Format selectedDate
      employeeData,
    };
  };

  const FormSubmitfunction = async () => {
    const data = submitFunction();
    console.log("Form Data:", data);
    var response = await TimeSheetService.AddNewTimeSheet(
      data,
      userDetails.employee.id
    );
    if (response.isSuccess === true) {
      toast.success("Successfully done. ", {
        position: "top-right",
        autoClose: "4000",
      });
    }
  };
  const SubmitFormFunction = async () => {
    const data = submitFunction();
    console.log("Form Data:", data);
    var response = await TimeSheetService.AddNewTimeSheet(
      data,
      userDetails.employee.id
    );
    if (response.isSuccess === true) {
      toast.success("Successfully done. ", {
        position: "top-right",
        autoClose: "4000",
      });
    }
    setDisabledTabs((prev) => [...prev, selectedTabIndex]);
  };
  const handleClick = (e) => {
    e.preventDefault();
    FormSubmitfunction();
  };

  const ResetClick = (e) => {
    e.preventDefault();
    Resetfunction();
  };

  const Resetfunction = () => {
    setHours({});
  };

  return (
    <div className="Maindiv">
      <div className="card">
        <div>
          <p className="timesheet">Time Sheet</p>
        </div>

        <Tabs selectedIndex={selectedTabIndex} onSelect={handleTabSelect}>
          <TabList>
            {projectDetails.map((obj, index) => (
              <Tab key={index} style={{ color: "blue" }}>
                {obj.project.projectName}
              </Tab>
            ))}
          </TabList>

          {projectDetails.map((project, projectIndex) => (
            <TabPanel key={projectIndex}>
              <div>
                <div
                  className="date-picker-container"
                  style={{
                    position: "relative",
                    display: "inline-block ",
                    margin: "0px 23px",
                  }}
                >
                  <span style={{ color: "black" }} className="me-2">
                    Month
                  </span>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showMonthYearPicker
                    dateFormat="MMMM yyyy"
                    customInput={<CustomInput />}
                    className="w-100"
                  />
                </div>
              </div>
              <form>
                <div className="row">
                  <div className="col-3 header">
                    <span style={{ marginLeft: "7px" }}>Employee Name</span>
                  </div>
                  <div className="col-3 header">
                    <span style={{ marginLeft: "7px" }}>Hours</span>
                  </div>
                  <div className="col-6"></div>
                </div>
                {project.employees.map((employee) => (
                  <div key={employee.id}>
                    <div className="row m-2">
                      <div className="col-3">
                        <p
                          style={{ marginLeft: "5px" }}
                        >{`${employee.firstName} ${employee.lastName}`}</p>
                      </div>
                      <div className="col-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter hours"
                          value={hours[employee.id] || ""}
                          onChange={(e) =>
                            handleHoursChange(employee.id, e.target.value)
                          }
                        />
                      </div>
                      <div className="col-6"></div>
                    </div>
                  </div>
                ))}
                <div className="btnss">
                  <Link
                    onClick={ResetClick}
                    className={`ms-3 btn btn-success ${
                      disabledTabs.includes(selectedTabIndex) ? "disabled" : ""
                    }`}
                    style={{
                      pointerEvents: disabledTabs.includes(selectedTabIndex)
                        ? "none"
                        : "auto",
                      opacity: disabledTabs.includes(selectedTabIndex)
                        ? 0.5
                        : 1,
                      cursor: disabledTabs.includes(selectedTabIndex)
                        ? "not-allowed"
                        : "pointer",
                    }}
                  >
                    Reset
                  </Link>
                  <Link
                    className={`ms-3 btn btn-success ${
                      disabledTabs.includes(selectedTabIndex) ? "disabled" : ""
                    }`}
                    onClick={handleClick}
                    style={{
                      pointerEvents: disabledTabs.includes(selectedTabIndex)
                        ? "none"
                        : "auto",
                      opacity: disabledTabs.includes(selectedTabIndex)
                        ? 0.5
                        : 1,
                      cursor: disabledTabs.includes(selectedTabIndex)
                        ? "not-allowed"
                        : "pointer",
                    }}
                  >
                    Save
                  </Link>
                  <Link
                    className="ms-3 btn btn-primary"
                    onClick={SubmitFormFunction}
                  >
                    Submit
                  </Link>
                </div>
              </form>
            </TabPanel>
          ))}
        </Tabs>
      </div>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
}

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <div
    className="custom-input"
    onClick={onClick}
    ref={ref}
    style={{
      display: "flex",
      alignItems: "center",
      padding: "5px 10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "10px" }} />
    <span>{value}</span>
  </div>
));
