import "../../assets/Styles/AddRevenue.css";
import DatePicker from "react-datepicker";
import { useState, forwardRef, useMemo } from "react";
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
import { FaDollarSign } from "react-icons/fa6";
import { useRef } from "react";
import GetAllRevenue from "../IndianFinance/Revenue";

export default function AddRevenue() {
  const now = new Date();
  const maxDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [TimeSheetdata, setTimeSheet] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [GetSubmitedRevenue, setGetRevenue] = useState([]);

  const [disiblebuttons, setDisiblebuttons] = useState(false);
  const [ProjectDetails, setProjectDetails] = useState({});

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
    setSelectedDate(date);
    await GetTimeSheet(id, date);
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

    if (
      GetRevenueResponse.isSuccess === true &&
      GetRevenueResponse.item.length > 0
    ) {
      if (GetRevenueResponse.item.every((a) => a.isSubmited === true)) {
        setDisiblebuttons(true);
      } else {
        setDisiblebuttons(false);
      }
    } else {
      setDisiblebuttons(false);
    }
  };

  function backtoprojects(e) {
    FetchData();
    e.preventDefault();
    navigate("/USFinance/UsFinaceALlProjects");
  }

  const handleHoursChange = (timesheetId, value) => {
    setRate((prev) => ({
      ...prev,
      [timesheetId]: value,
    }));
  };

  const SaveForm = async () => {
    const employeeData = TimeSheetdata.map((employee) => ({
      timesheetId: employee.id,
      hourlyRate: rate[employee.id] || "",
    }));

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
      toast.error(AddtimeSheetResponse.error.message, {
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
    } else {
      toast.error(AddtimeSheetResponse.error.message, {
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ color: "blue" }}>{ProjectDetails.projectName}</div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => handleDateChange(date)}
                showMonthYearPicker
                dateFormat="MMMM yyyy"
                customInput={<CustomInput />}
                className="w-50"
                maxDate={maxDate}
              />
            </div>
          </div>
        </div>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th
                style={{
                  fontSize: "small",
                  fontWeight: "bold",
                  backgroundColor: "#196e8a",
                  color: "white",
                }}
              >
                NAME
              </th>
              <th
                style={{
                  fontSize: "small",
                  backgroundColor: "#196e8a",
                  color: "white",
                }}
              >
                EMAIL
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontSize: "small",
                  backgroundColor: "#196e8a",
                  color: "white",
                }}
              >
                STATUS
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontSize: "small",
                  backgroundColor: "#196e8a",
                  color: "white",
                }}
              >
                ROLE
              </th>
              <th
                style={{
                  fontSize: "small",
                  backgroundColor: "#196e8a",
                  color: "white",
                }}
              >
                WORKED HOURS
              </th>
              <th
                style={{
                  fontSize: "small",
                  backgroundColor: "#196e8a",
                  color: "white",
                }}
              >
                RATE FOR HOURS(
                <FaDollarSign />)
              </th>
              <th
                style={{
                  textAlign: "center",
                  fontSize: "small",
                  backgroundColor: "#196e8a",
                  color: "white",
                }}
              >
                TOTAL REVENUE( <FaDollarSign />)
              </th>
            </tr>
          </thead>
          <tbody>
            {TimeSheetdata.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No timesheet in this project
                </td>
              </tr>
            ) : (
              TimeSheetdata.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.name}</td>
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
                      <span>{emp.status === 1 ? "Active" : "Inactive"}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>{emp.role}</td>
                  <td style={{ textAlign: "center" }}>{emp.hoursWorked}</td>
                  <td style={{ textAlign: "center" }}>
                    {GetSubmitedRevenue.isSuccess === true ? (
                      GetSubmitedRevenue.item.map(
                        (obj) =>
                          obj.timesheetId === emp.id &&
                          (obj.isSubmited === true ? (
                            <p
                              key={obj.timesheetId}
                              style={{ textAlign: "center" }}
                            >
                              {obj.hourlyRate}
                            </p>
                          ) : (
                            <div
                              key={obj.timesheetId}
                              style={{
                                display: "flex",
                                justifyContent: "start",
                              }}
                            >
                              <input
                                type="number"
                                placeholder="Hourly Rate In $"
                                value={
                                  rate[obj.timesheetId] !== undefined
                                    ? rate[obj.timesheetId]
                                    : obj.hourlyRate
                                }
                                onChange={(e) => {
                                  const newRate = e.target.value;

                                  if (
                                    !isNaN(newRate) &&
                                    (newRate === "" || newRate >= 0)
                                  ) {
                                    handleHoursChange(obj.timesheetId, newRate);
                                  } else {
                                    handleHoursChange(obj.timesheetId, rate);
                                  }
                                }}
                                style={{ width: "150px" }}
                              />
                            </div>
                          ))
                      )
                    ) : (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <input
                          type="number"
                          placeholder="Hourly Rate In $"
                          value={rate[emp.id] || ""}
                          disabled={false}
                          onChange={(e) =>
                            handleHoursChange(emp.id, e.target.value)
                          }
                          style={{ textAlign: "center" }}
                        />
                      </div>
                    )}
                  </td>

                  <td style={{ textAlign: "start" }}>
                    {GetSubmitedRevenue.isSuccess === true ? (
                      GetSubmitedRevenue.item.map((obj) =>
                        obj.timesheetId === emp.id ? (
                          <div
                            key={obj.timesheetId}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {obj.isSubmited === true ? (
                              <p>{obj.totalRevenue}</p>
                            ) : (
                              <input
                                type="number"
                                placeholder="Total Revenue"
                                value={
                                  emp.hoursWorked * rate[emp.id] ||
                                  obj.totalRevenue
                                }
                                disabled={true}
                                style={{ textAlign: "center" }}
                              />
                            )}
                          </div>
                        ) : null
                      )
                    ) : (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <input
                          type="number"
                          placeholder="Total Revenue"
                          value={emp.hoursWorked * rate[emp.id] || "0"}
                          disabled={true}
                          style={{ textAlign: "center" }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {GetSubmitedRevenue.isSuccess === true && (
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "15px",
            }}
          >
            <button
              className="resetbutton mr-2 button"
              style={{ marginRight: "10px", backgroundColor: "grey" }}
              onClick={Resetfunction}
              disabled={disiblebuttons}
            >
              Reset
            </button>
            <button
              className="savebutton mr-2 button"
              style={{ marginRight: "10px" }}
              onClick={SaveForm}
              disabled={disiblebuttons}
            >
              Save
            </button>
            <button
              className="submitbutton button"
              style={{ backgroundColor: "blue" }}
              onClick={SubmitFormFunction}
              disabled={disiblebuttons}
            >
              Submit
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
