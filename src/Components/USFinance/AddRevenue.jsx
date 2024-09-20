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
  const [GetSubmitedRevenue, setGetRevenue] = useState([]);
  const [ProjectDetails, setProjectDetails] = useState({});
  const [montth, setMonth] = useState();
  const id = localStorage.getItem("empId");
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
    GetTimeSheet(id, selectedDate);
  }, [id, selectedDate]);

  const handleDateChange = async (date) => {
    const formattedDate = format(date, "MMMM yyyy");
    setSelectedDate(date);
    const [month, year] = formattedDate.split(" ");
    const monthNumber = monthMap[month];
    await GetTimeSheet(id, selectedDate);
  };

  const navigate = useNavigate();
  async function FetchData() {
    var response = await USFinanceTeamService.FcnGetProjectDetails(id);
    setProjectDetails(response.item.project);
  }
  const GetTimeSheet = async (ProjectID, date) => {
    const formattedDate = format(date, "MMMM yyyy");
    const [month, year] = formattedDate.split(" ");
    const monthNumber = monthMap[month];
    var loader = true;
    console.log(GetSubmitedRevenue, "submited revenue ");
    var response = await axios.get(
      `https://localhost:44305/api/Timesheets/GetTimesheetsByMonthAndYear?projectId=${ProjectID}&month=${monthNumber}&year=${year}`
    );
    if (response) {
      setTimeSheet(response.data.item);
      loader = false;
    }

    var GetRevenueResponse = await USFinanceTeamService.FcnGetRevenue(
      ProjectID,
      monthNumber,
      year
    );

    setGetRevenue(GetRevenueResponse);
  };
  function backtoprojects(e) {
    FetchData();
    e.preventDefault();
    navigate("/USFinance/UsFinaceALlProjects");
  }
  const handleHoursChange = (id, value) => {
    console.log(id, value, "hours change"); // Check the values being passed
    setRate((prev) => ({
      ...prev,
      [id]: value, // Update the state with the new value
    }));
  };
  const SaveForm = async () => {
    const employeeData = TimeSheetdata.map((employee) => ({
      timesheetId: employee.id,
      hourlyRate: rate[employee.id] || "",
    }));
    console.log(employeeData, "-------------->");
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

      await GetTimeSheet(id, selectedDate);
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
                className="w-50   "
                maxDate={maxDate}
              />
            </div>
          </div>
        </div>

        <table className="table table-striped  mt-3">
          <thead>
            <tr>
              <th
                className=""
                style={{ fontSize: "small", fontWeight: "bold" }}
              >
                NAME
              </th>
              <th className="" style={{ fontSize: "small" }}>
                EMAIL
              </th>
              <th
                className=""
                style={{ textAlign: "center", fontSize: "small" }}
              >
                STATUS
              </th>
              <th
                className=""
                style={{ textAlign: "center", fontSize: "small" }}
              >
                ROLE
              </th>
              <th className="" style={{ fontSize: "small" }}>
                WORKED HOURS
              </th>
              <th className="" style={{ fontSize: "small" }}>
                RATE FOR HOURS
              </th>
              <th style={{ fontSize: "small" }}>TOTAL REVENUE</th>
            </tr>
          </thead>
          <tbody>
            {TimeSheetdata.length === 0 ? (
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>No employees in this project</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ) : (
              TimeSheetdata.map((emp, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex" style={{ alignItems: "center" }}>
                      <div>
                        <div className=" ">{emp.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{emp.email}</td>
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
                    {GetSubmitedRevenue.isSuccess === true &&
                    GetSubmitedRevenue.item.some(
                      (obj) => obj.timesheetId === emp.id
                    ) ? (
                      GetSubmitedRevenue.item
                        .filter((obj) => obj.timesheetId === emp.id)
                        .map((filteredEmployee) => (
                          <div key={filteredEmployee.timesheetId}>
                            {filteredEmployee.isSubmited === true ? (
                              <div style={{ textAlign: "center" }}>
                                {console.log("isSubmited true block")}
                                {filteredEmployee.hourlyRate}
                              </div>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "",
                                }}
                              >
                                <input
                                  type="number"
                                  className="form-control w-50"
                                  value={
                                    rate[emp.id] !== undefined
                                      ? rate[emp.id]
                                      : filteredEmployee.hourlyRate
                                  } // Use rate if defined, otherwise fallback
                                  onChange={(e) =>
                                    handleHoursChange(emp.id, e.target.value)
                                  } // Update the state on change
                                />
                              </div>
                            )}
                          </div>
                        ))
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "",
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
                  <td>
                    {GetSubmitedRevenue.isSuccess === true &&
                      GetSubmitedRevenue.item
                        .filter((obj) => obj.timesheetId === emp.id)
                        .map((filteredEmployee) => (
                          <div key={filteredEmployee.timesheetId}>
                            {filteredEmployee.isSubmited && (
                              <div style={{ textAlign: "center" }}>
                                {filteredEmployee.totalRevenue}
                              </div>
                            )}
                          </div>
                        ))}
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
