// import "../../assets/Styles/AddRevenue.css";
// import DatePicker from "react-datepicker";
// import { useState, forwardRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import USFinanceTeamService from "../../Service/USFinanceTeamService/USFinanceTeamService";
// import { IoArrowBackCircle } from "react-icons/io5";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { format } from "date-fns";
// import { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { timestamp } from "rxjs";
// export default function AddRevenue() {
//   const now = new Date();
//   const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [TimeSheetdata, setTimeSheet] = useState([]);
//   const [projectId, setProjectId] = useState("");
//   const [getRevenue, setGetRevenue] = useState([]);
//   const [ProjectDetails, setProjectDetails] = useState({});
//   const [montth, setMonth] = useState();
//   const id = localStorage.getItem("empId");
//   const [rate, setRate] = useState({});
//   const monthMap = {
//     January: "1",
//     February: "2",
//     March: "3",
//     April: "4",
//     May: "5",
//     June: "6",
//     July: "7",
//     August: "8",
//     September: "9",
//     October: "10",
//     November: "11",
//     December: "12",
//   };
//   useEffect(() => {
//     FetchData();
//   }, []);
//   useEffect(() => {
//     GetTimeSheet(id, selectedDate);
//   }, [id, selectedDate]);
//   const handleDateChange = async (date) => {
//     // console.log(date, "date onchange");
//     const formattedDate = format(date, "MMMM yyyy");
//     setSelectedDate(date);
//     const [month, year] = formattedDate.split(" ");
//     const monthNumber = monthMap[month];
//     await GetTimeSheet(id, selectedDate);
//   };

//   const navigate = useNavigate();

//   //   useEffect(() => {
//   //     // const month = selectedDate.toLocaleString("default", { month: "long" });
//   //     // const year = selectedDate.getFullYear();
//   //     // const monthNumber = monthMap[month];
//   //     handleDateChange(selectedDate);
//   //     //GetTimeSheet(id, monthNumber, year);
//   //   }, [selectedDate]);
//   async function FetchData() {
//     var response = await USFinanceTeamService.FcnGetProjectDetails(id);
//     setProjectDetails(response.item.project);
//   }
//   const GetTimeSheet = async (ProjectID, date) => {
//     const formattedDate = format(date, "MMMM yyyy");

//     const [month, year] = formattedDate.split(" ");
//     const monthNumber = monthMap[month];
//     console.log(monthNumber, year, ProjectID);
//     var GetRevenueResponse = await USFinanceTeamService.FcnGetRevenue(
//       ProjectID,
//       monthNumber,
//       year
//     );
//     setGetRevenue(GetRevenueResponse.item);

//     var getTimeSheetResponse = await axios.get(
//       `https://localhost:44305/api/Timesheets/GetTimesheetsByMonthAndYear?projectId=${ProjectID}&month=${monthNumber}&year=${year}`
//     );
//     setTimeSheet(getTimeSheetResponse.data.item);
//     console.log(TimeSheetdata, "GetTimeSheet============>");
//   };
//   function backtoprojects(e) {
//     FetchData();
//     e.preventDefault();
//     navigate("/USFinance/UsFinaceALlProjects");
//   }
//   const handleHoursChange = (employeeId, value) => {
//     setRate((prev) => ({
//       ...prev,
//       [employeeId]: value,
//     }));
//   };
//   const SaveForm = async () => {
//     const employeeData = TimeSheetdata.map((employee) => ({
//       timesheetId: employee.id,
//       hourlyRate: rate[employee.id] || "",
//     }));
//     console.log(employeeData, "employee data");
//     var AddtimeSheetResponse = await USFinanceTeamService.AddRevenue(
//       employeeData,
//       false
//     );
//     if (AddtimeSheetResponse.isSuccess) {
//       toast.success("Successfully saved.", {
//         position: "top-right",
//         autoClose: 4000,
//       });
//     } else {
//       toast.error(response.error.message, {
//         position: "top-right",
//         autoClose: 4000,
//       });
//     }
//   };

//   const SubmitFormFunction = async () => {
//     const employeeData = TimeSheetdata.map((employee) => ({
//       timesheetId: employee.id,
//       hourlyRate: rate[employee.id] || "",
//     }));
//     var AddtimeSheetResponse = await USFinanceTeamService.AddRevenue(
//       employeeData,
//       true
//     );
//     if (AddtimeSheetResponse.isSuccess) {
//       toast.success("Successfully submitted.", {
//         position: "top-right",
//         autoClose: 4000,
//       });
//       const formattedDate = format(selectedDate, "MMMM yyyy");
//       const [month, year] = formattedDate.split(" ");
//       const monthNumber = monthMap[month];
//       await GetTimeSheet(id, monthNumber, year);
//       setDisabledTabs((prev) => [...prev, selectedTabIndex]);
//     } else {
//       toast.error(response.error.message, {
//         position: "top-right",
//         autoClose: 4000,
//       });
//     }
//   };
//   const CustomInput = forwardRef(({ value, onClick }, ref) => (
//     <div
//       className="custom-input"
//       onClick={onClick}
//       ref={ref}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         padding: "5px 10px",
//         border: "1px solid #ccc",
//         borderRadius: "4px",
//         cursor: "pointer",
//       }}
//     >
//       <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "5px" }} />
//       <span>{value}</span>
//     </div>
//   ));
//   const Resetfunction = (e) => {
//     console.log("reset click");
//     setRate({});
//   };
//   return (
//     <div className="revenuemaindiv">
//       <div className="d-flex">
//         <IoArrowBackCircle
//           style={{ cursor: "pointer", fontSize: "28px", color: "block" }}
//           onClick={backtoprojects}
//         />
//         <p className="">Back</p>
//       </div>
//       <div className="card">
//         <div className="">
//           <p className="conetntrevenue">Add Monthly Revenue</p>
//           <div
//             style={{ display: "flex", justifyContent: "space-between" }}
//             className=""
//           >
//             <div className="" style={{ color: "blue" }}>
//               {ProjectDetails.projectName}
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "end",
//               }}
//             >
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => handleDateChange(date)}
//                 showMonthYearPicker
//                 dateFormat="MMMM yyyy"
//                 customInput={<CustomInput />}
//                 className="w-50 "
//                 maxDate={maxDate}
//               />
//             </div>
//           </div>
//         </div>

//         <table className="table table-striped mt-2">
//           <thead>
//             <tr>
//               <th className="">NAME</th>
//               <th className="">EMAIL</th>
//               <th className="" style={{ textAlign: "center" }}>
//                 STATUS
//               </th>
//               <th className="" style={{ textAlign: "center" }}>
//                 ROLE
//               </th>
//               <th className="" style={{ textAlign: "center" }}>
//                 WORKED HOURS
//               </th>
//               <th className="" style={{ textAlign: "center" }}>
//                 RATE FOR HOURS
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {TimeSheetdata.length === 0 ? (
//               <div style={{ textAlign: "center" }}>
//                 No TimeSheet In this Selected Month
//               </div>
//             ) : (
//               TimeSheetdata.map((emp, index) => (
//                 <tr key={index}>
//                   <td>
//                     <div className="d-flex" style={{ alignItems: "center" }}>
//                       <div>
//                         <div className="">{emp.name}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     <div style={{ textAlign: "start" }}>{emp.email}</div>
//                     <div className="role" style={{ textAlign: "start" }}></div>
//                   </td>
//                   <td>
//                     <div
//                       style={{
//                         backgroundColor:
//                           emp.status === 1 ? "#196e8a" : "#ADD8E6",
//                         borderRadius: "40px",
//                         color: emp.status === 1 ? "white" : "black",
//                         textAlign: "center",
//                       }}
//                     >
//                       <span>{emp.status == 1 ? "Active" : "InActive"}</span>
//                     </div>
//                   </td>
//                   <td>
//                     <div className="role" style={{ textAlign: "center" }}>
//                       {emp.role}
//                     </div>
//                   </td>
//                   <td style={{ textAlign: "center" }}>{emp.hoursWorked}</td>
//                   <td>
//                     {/* <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignContent: "center",
//                       }}
//                     >
//                       <input
//                         type="number"
//                         className="form-control w-50"
//                         value={rate[emp.id] || ""}
//                         onChange={(e) =>
//                           handleHoursChange(emp.id, e.target.value)
//                         }
//                       />
//                     </div> */}
//                     {getRevenue.length > 0 &&
//                     getRevenue.some((obj) => obj.timesheetId === emp.id) ? (
//                       getRevenue
//                         .filter((obj) => obj.timesheetId === emp.id)
//                         .map((filteredEmployee) => (
//                           <div key={filteredEmployee.timesheetId}>
//                             {filteredEmployee.isSubmited === true ? (
//                               <div style={{ textAlign: "center" }}>
//                                 {filteredEmployee.totalRevenue}
//                               </div>
//                             ) : (
//                               <div
//                                 style={{
//                                   display: "flex",
//                                   justifyContent: "center",
//                                 }}
//                               >
//                                 {console.log("else condtion satisfiled")}
//                                 <input
//                                   type="number"
//                                   className="form-control w-50"
//                                   value={rate[emp.id] || ""}
//                                   onChange={(e) =>
//                                     handleHoursChange(emp.id, e.target.value)
//                                   }
//                                 />
//                               </div>
//                             )}
//                           </div>
//                         ))
//                     ) : (
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <input
//                           type="number"
//                           className="form-control w-50"
//                           value={rate[emp.id] || ""}
//                           onChange={(e) =>
//                             handleHoursChange(emp.id, e.target.value)
//                           }
//                         />
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//           {/* <tbody>
//             <td className=""> Nagaraju</td>
//             <td className="">Nagarajuboda014@gmail.com</td>
//             <td
//               className=""
//               style={{ display: "flex", justifyContent: "center" }}
//             >
//               Active
//             </td>
//             <td className="" style={{ textAlign: "center" }}>
//               Employee
//             </td>
//             <td className="" style={{ textAlign: "center" }}>
//               200
//             </td>
//             <td>
//               <div
//                 className=""
//                 style={{ justifyContent: "center", display: "flex" }}
//               >
//                 <input
//                   type="number"
//                   className="form-control w-50"
//                   //   value={hours[emp.id] || ""}
//                   //   onChange={(e) => handleHoursChange(emp.id, e.target.value)}
//                 />
//               </div>
//             </td>
//           </tbody> */}
//         </table>
//         <div className="d-flex" style={{ justifyContent: "end" }}>
//           <div className="me-4">
//             <button
//               className=" button  resetbutton"
//               onClick={Resetfunction}
//               // disabled={disiblebuttons}
//             >
//               Reset
//             </button>
//           </div>
//           <div className="me-4">
//             <button className=" savebutton button" onClick={SaveForm}>
//               Save
//             </button>
//           </div>
//           <div>
//             <button
//               className="submitbutton button"
//               onClick={SubmitFormFunction}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-end" autoClose={5000} />
//     </div>
//   );
// }

import "../../assets/Styles/AddRevenue.css";
import DatePicker from "react-datepicker";
import { useState, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import USFinanceTeamService from "../../Service/USFinanceTeamService/USFinanceTeamService";
import { IoArrowBackCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { timestamp } from "rxjs";
export default function AddRevenue() {
  const now = new Date();
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [TimeSheetdata, setTimeSheet] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [getRevenue, setGetRevenue] = useState([]);
  const [ProjectDetails, setProjectDetails] = useState({});
  const [montth, setMonth] = useState();

  const [rate, setRate] = useState({});
  const monthMap = {
    January: "1",
    February: "2",
    March: "3",
    April: "4",
    May: "5",
    June: "6",
    July: "7",
    August: "8",
    September: "9",
    October: "10",
    November: "11",
    December: "12",
  };
  useEffect(() => {
    FetchData();
    handleDateChange(selectedDate);
  }, [selectedDate]);
  const handleDateChange = async (date) => {
    debugger;
    const formattedDate = format(date, "MMMM yyyy");
    setSelectedDate(date);
    const [month, year] = formattedDate.split(" ");
    const monthNumber = monthMap[month];
    await GetTimeSheet(id, monthNumber, year);
  };

  const id = localStorage.getItem("empId");
  const navigate = useNavigate();

  //   useEffect(() => {
  //     // const month = selectedDate.toLocaleString("default", { month: "long" });
  //     // const year = selectedDate.getFullYear();
  //     // const monthNumber = monthMap[month];
  //     handleDateChange(selectedDate);
  //     //GetTimeSheet(id, monthNumber, year);
  //   }, [selectedDate]);
  async function FetchData() {
    var response = await USFinanceTeamService.FcnGetProjectDetails(id);
    setProjectDetails(response.item.project);
  }
  const GetTimeSheet = async (ProjectID, month, year) => {
    var GetRevenueResponse = await USFinanceTeamService.FcnGetRevenue(
      ProjectID,
      month,
      year
    );

    setGetRevenue(GetRevenueResponse.item);
    console.log(getRevenue, "getrevenue based on month");
    var response = await axios.get(
      `https://localhost:44305/api/Timesheets/GetTimesheetsByMonthAndYear?projectId=${ProjectID}&month=${month}&year=${year}`
    );
    setTimeSheet(response.data.item);
    console.log(TimeSheetdata, "GetTimeSheet============>");
  };
  function backtoprojects(e) {
    FetchData();
    e.preventDefault();
    navigate("/USFinance/UsFinaceALlProjects");
  }
  const handleHoursChange = (employeeId, value) => {
    console.log(employeeId, value);
    setRate((prev) => ({
      ...prev,
      [employeeId]: value,
    }));
  };
  const SaveForm = async () => {
    const employeeData = TimeSheetdata.map((employee) => ({
      timesheetId: employee.id,
      hourlyRate: rate[employee.id] || "",
    }));
    console.log(employeeData, "employee data");
    var AddtimeSheetResponse = await USFinanceTeamService.AddRevenue(
      employeeData,
      false
    );
    if (AddtimeSheetResponse.isSuccess) {
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
  };

  const SubmitFormFunction = async () => {
    const employeeData = TimeSheetdata.map((employee) => ({
      timesheetId: employee.id,
      hourlyRate: rate[employee.id] || "",
    }));
    var AddtimeSheetResponse = await USFinanceTeamService.AddRevenue(
      employeeData,
      true
    );
    if (AddtimeSheetResponse.isSuccess) {
      toast.success("Successfully submitted.", {
        position: "top-right",
        autoClose: 4000,
      });
      const formattedDate = format(selectedDate, "MMMM yyyy");
      const [month, year] = formattedDate.split(" ");
      const monthNumber = monthMap[month];
      await GetTimeSheet(id, monthNumber, year);
      //setDisabledTabs((prev) => [...prev, selectedTabIndex]);
    } else {
      toast.error(response.error.message, {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };
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
      <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "5px" }} />
      <span>{value}</span>
    </div>
  ));
  const Resetfunction = (e) => {
    console.log("reset click");
    setRate({});
  };
  return (
    <div className="revenuemaindiv">
      <div className="d-flex">
        <IoArrowBackCircle
          style={{ cursor: "pointer", fontSize: "28px", color: "block" }}
          onClick={backtoprojects}
        />
        <p className="">Back</p>
      </div>
      <div className="card">
        <div className="">
          <p className="conetntrevenue">Add Monthly Revenue</p>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className=""
          >
            <div className="" style={{ color: "blue" }}>
              {ProjectDetails.projectName}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <DatePicker
                selected={selectedDate}
                onChange={(date) => handleDateChange(date)}
                showMonthYearPicker
                dateFormat="MMMM yyyy"
                customInput={<CustomInput />}
                className="w-50 "
                maxDate={maxDate}
              />
            </div>
          </div>
        </div>

        <table className="table table-striped mt-2">
          <thead>
            <tr>
              <th className="">NAME</th>
              <th className="">EMAIL</th>
              <th className="" style={{ textAlign: "center" }}>
                STATUS
              </th>
              <th className="" style={{ textAlign: "center" }}>
                ROLE
              </th>
              <th className="" style={{ textAlign: "center" }}>
                WORKED HOURS
              </th>
              <th className="" style={{ textAlign: "center" }}>
                RATE FOR HOURS
              </th>
            </tr>
          </thead>
          <tbody>
            {TimeSheetdata.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                No TimeSheet In this Selected Month
              </div>
            ) : (
              TimeSheetdata.map((emp, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex" style={{ alignItems: "center" }}>
                      <div>
                        <div className="">{emp.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "start" }}>{emp.email}</div>
                    <div className="role" style={{ textAlign: "start" }}></div>
                  </td>
                  <td>
                    <div
                      style={{
                        backgroundColor:
                          emp.status === 1 ? "#196e8a" : "#ADD8E6",
                        borderRadius: "40px",
                        color: emp.status === 1 ? "white" : "black",
                        textAlign: "center",
                      }}
                    >
                      <span>{emp.status == 1 ? "Active" : "InActive"}</span>
                    </div>
                  </td>
                  <td>
                    <div className="role" style={{ textAlign: "center" }}>
                      {emp.role}
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>{emp.hoursWorked}</td>
                  <td>
                    {/* <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <input
                        type="number"
                        className="form-control w-50"
                        value={rate[emp.id] || ""}
                        onChange={(e) =>
                          handleHoursChange(emp.id, e.target.value)
                        }
                      />
                    </div> */}
                    {getRevenue.length > 0 &&
                    getRevenue.some((obj) => obj.timesheetId === emp.id) ? (
                      getRevenue
                        .filter((obj) => obj.timesheetId === emp.id)
                        .map((filteredEmployee) => (
                          <div key={filteredEmployee.timesheetId}>
                            {filteredEmployee.isSubmited === true ? (
                              <div style={{ textAlign: "center" }}>
                                {filteredEmployee.totalRevenue}
                              </div>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <input
                                  type="number"
                                  className="form-control w-50"
                                  value={rate[emp.id] || ""}
                                  onChange={(e) =>
                                    handleHoursChange(emp.id, e.target.value)
                                  }
                                />
                              </div>
                            )}
                          </div>
                        ))
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          type="number"
                          className="form-control w-50"
                          value={rate[emp.id] || ""}
                          onChange={(e) =>
                            handleHoursChange(emp.id, e.target.value)
                          }
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="d-flex" style={{ justifyContent: "end" }}>
          <div className="me-4">
            <button
              className=" button  resetbutton"
              onClick={Resetfunction}
              // disabled={disiblebuttons}
            >
              Reset
            </button>
          </div>
          <div className="me-4">
            <button className=" savebutton button" onClick={SaveForm}>
              Save
            </button>
          </div>
          <div>
            <button
              className="submitbutton button"
              onClick={SubmitFormFunction}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-end" autoClose={5000} />
    </div>
  );
}
