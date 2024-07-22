// import { useEffect, useState, forwardRef } from "react";
// import EmployeeService from "../../../Service/EmployeeService/EmployeeService";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../../../assets/Styles/TimeSheet.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import { Link } from "react-router-dom"; // Ensure Link is imported if you're using react-router

// export default function TimeSheet() {
//   const [projectDetails, setProjectDetails] = useState([]);
//   const [selectedTabIndex, setSelectedTabIndex] = useState(0);
//   const [selectedDate, setSelectedDate] = useState(new Date());
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
//   console.log(projectDetails, "details");

//   const submitFunction = () => {
//     const currentProject = projectDetails[selectedTabIndex];
//     const employeeData = currentProject.employees.map((employee) => ({
//       employeeId: employee.id,
//       hours: hours[employee.id] || "",
//     }));

//     return {
//       projectId: currentProject.project.id,
//       selectedDate,
//       employeeData,
//     };
//   };

//   const FormSubmitfunction = () => {
//     const data = submitFunction();
//     console.log("Form Data:", data);
//     // Handle form submission logic (e.g., API call)
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
//                   <button className="btn btn-danger">Reset</button>
//                   <button className="ms-3 btn btn-primary">Save</button>
//                   <Link
//                     onClick={FormSubmitfunction}
//                     className="ms-3 btn btn-success"
//                   >
//                     Submit
//                   </Link>
//                 </div>
//               </form>
//             </TabPanel>
//           ))}
//         </Tabs>
//       </div>
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
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom"; // Ensure Link is imported if you're using react-router
import { format, setDate } from "date-fns"; // Import format from date-fns
import TimeSheetService from "../../../Service/TimeSheetService";

export default function TimeSheet() {
  const [projectDetails, setProjectDetails] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
  console.log(userDetails, "project managerdata");
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
      hours: hours[employee.id] || "",
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
    // Handle form submission logic (e.g., API call)
    var response = await TimeSheetService.AddNewTimeSheet(
      data,
      userDetails.employee.id
    );
    console.log(response, "add timesheet response");
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
                  <span style={{ color: "black" }}>Month</span>
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
                  <button className="btn btn-danger">Reset</button>
                  <button className="ms-3 btn btn-primary">Save</button>
                  <Link
                    onClick={FormSubmitfunction}
                    className="ms-3 btn btn-success"
                  >
                    Submit
                  </Link>
                </div>
              </form>
            </TabPanel>
          ))}
        </Tabs>
      </div>
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
