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
  const [selectedProjectId, setSelectedProjectID] = useState("");
  const [employees, setEmployees] = useState([]);
  const now = new Date();

  // Set maxDate to the end of the current month
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    if (projectDetails.length > 0) {
      const initialProject = projectDetails[selectedTabIndex].project.id;
      GetProjectDeatis(initialProject, selectedDate);
    }
  }, [projectDetails]);

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
  const handleDateChange = (projectId, date) => {
    const formattedDate = format(date, "MMMM yyyy");
    setSelectedDate(date);
    GetProjectDeatis(projectId, formattedDate);
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
    var isSubmited = false;
    var response = await TimeSheetService.AddNewTimeSheet(
      data,
      userDetails.employee.id,
      isSubmited
    );
    if (response.isSuccess === true) {
      toast.success("Successfully done. ", {
        position: "top-right",
        autoClose: "4000",
      });
    } else {
      toast.error(response.error.message, {
        position: "top-right",
        autoClose: "4000",
      });
    }
  };
  async function SubmitFormFunction() {
    const data = submitFunction();
    var isSubmited = true;
    var response = await TimeSheetService.AddNewTimeSheet(
      data,
      userDetails.employee.id,
      isSubmited
    );
    if (response.isSuccess === true) {
      toast.success("Successfully done. ", {
        position: "top-right",
        autoClose: "4000",
      });
      const projectId = projectDetails[selectedTabIndex].project.id;
      GetProjectDeatis(projectId, selectedDate);
    }
    setDisabledTabs((prev) => [...prev, selectedTabIndex]);
  }

  const Resetfunction = (e) => {
    e.preventDefault();
    employees.map((each) => {
      setHours((prev) => ({
        ...prev,
        [each.employeeId]: "",
      }));
    });
  };

  const GetProjectDeatis = async (id, date) => {
    setHours({});
    setSelectedProjectID(id);
    var month = format(date, "MMMM yyyy");

    var response = await TimeSheetService.GetTimeSheetDeatils(month, id);
    setEmployees(response.item);
    response.item.map((each) => {
      setHours((prev) => ({
        ...prev,
        [each.employeeId]: each.workingHourse,
      }));
    });
  };
  console.log(employees, "getTimesheet employees");
  return (
    <div className="Maindiv">
      <div className="card">
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
                <div className="col-3 header">
                  <span style={{ marginLeft: "7px" }}>Employee Name</span>
                </div>
                <div className="col-3 header">
                  <span style={{ marginLeft: "7px" }}>Hours</span>
                </div>
                <div className="col-6"></div>
              </div>

              {employees.length > 0 ? (
                <div>
                  {employees.map((emp, index) => (
                    <div key={index}>
                      {emp.isSubmited === true ? (
                        <div className="row m-2" key={index}>
                          <div className="col-3">
                            <p style={{ marginLeft: "5px" }}>
                              {emp.employeeName}
                            </p>
                          </div>
                          <div className="col-3">
                            <p>{emp.workingHourse}</p>
                          </div>
                          <div className="col-6"></div>
                        </div>
                      ) : (
                        <div className="row m-2">
                          <div className="col-3">
                            <p style={{ marginLeft: "5px" }}>
                              {emp.employeeName}
                            </p>
                          </div>
                          <div className="col-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter hours"
                              value={hours[emp.employeeId]}
                              onChange={(e) =>
                                handleHoursChange(
                                  emp.employeeId,
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div className="col-6"></div>
                        </div>
                      )}
                    </div>
                  ))}
                  {employees.some((emp) => !emp.isSubmited) && (
                    <div className="btnss">
                      <Link
                        onClick={Resetfunction}
                        className="ms-3 btn btn-success"
                      >
                        Reset
                      </Link>
                      <Link className="ms-3 btn btn-success" onClick={SaveForm}>
                        Save
                      </Link>
                      <Link
                        className="ms-3 btn btn-success"
                        onClick={SubmitFormFunction}
                      >
                        Submit
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                project.employees.map((employee) => (
                  <div key={employee.id}>
                    <div className="row m-2">
                      <div className="col-3">
                        <p style={{ marginLeft: "5px" }}>
                          {`${employee.firstName} ${employee.lastName}`}
                        </p>
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
                ))
              )}
              {employees.length === 0 && (
                <div className="btnss">
                  <Link
                    onClick={Resetfunction}
                    className="ms-3 btn btn-success"
                  >
                    Reset
                  </Link>
                  <Link className="ms-3 btn btn-success" onClick={SaveForm}>
                    Save
                  </Link>
                  <Link
                    className="ms-3 btn btn-success"
                    onClick={SubmitFormFunction}
                  >
                    Submit
                  </Link>
                </div>
              )}
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
    <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "5px" }} />
    <span>{value}</span>
  </div>
));
