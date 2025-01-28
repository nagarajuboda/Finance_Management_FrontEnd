import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GetAllRevenue from "../IndianFinance/Revenue";
import "../../../src/assets/Styles/Revenue.css";
import calenderImage from "../../assets/Images/calendar_11919171.png";
import USFinanceTeamService from "../../Service/USFinanceTeamService/USFinanceTeamService";
import { ToastContainer, toast } from "react-toastify";
import { FaDollarSign } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
export default function AddRevenue() {
  const navigate = useNavigate();
  var projectID = sessionStorage.getItem("id");
  const [Project, setProject] = useState({});
  const [TimeSheetdata, setTimeSheet] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [GetSubmitedRevenue, setGetRevenue] = useState([]);
  const [disiblebuttons, setDisiblebuttons] = useState(false);
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
    GetTimeSheet(projectID, selectedDate);
  }, [projectID, selectedDate]);

  async function FetchData() {
    var ProjectResponse = await axios.get(
      `https://localhost:44305/api/Projects/GetProject?id=${projectID}`
    );
    var result = ProjectResponse.data;
    setProject(result.item.project);
    // var loader = true;
    // var response = await axios.get(
    //   `https://localhost:44305/api/Timesheets/GetTimesheetsByMonthAndYear?projectId=${projectID}&month=${monthNumber}&year=${year}`
    // );
    // var result = response.data;

    // if (result.isSuccess) {
    //   setTimeSheet(response.data.item);
    // }
  }
  const handleHoursChange = (timesheetId, value) => {
    setRate((prev) => ({
      ...prev,
      [timesheetId]: value,
    }));
  };
  console.log(rate, "rate");
  const GetTimeSheet = async (projectID, selectedDate) => {
    const month = selectedDate.toLocaleString("default", { month: "long" });
    const year = selectedDate.getFullYear();
    const monthNumber = monthMap[month];
    var loader = true;
    var response = await axios.get(
      `https://localhost:44305/api/Timesheets/GetTimesheetsByMonthAndYear?projectId=${projectID}&month=${monthNumber}&year=${year}`
    );

    var result = response.data;
    if (result.isSuccess) {
      setTimeSheet(response.data.item);
      loader = false;
    }

    var GetRevenueResponse = await USFinanceTeamService.FcnGetRevenue(
      projectID,
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
  const handleDateChange = async (date) => {
    setSelectedDate(date);
    await GetTimeSheet(projectID, date);
  };
  const backtoProjectList = () => {
    navigate("/dashboard/USFinanceTeamAllProjects");
  };
  const SaveForm = async () => {
    const employeeData = TimeSheetdata.map((employee) => ({
      timesheetId: employee.id,
      hourlyRate: rate[employee.id] || "",
    }));
    console.log(employeeData, "==========>");
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
    console.log(employeeData, "employeeData");
    var AddtimeSheetResponse = await USFinanceTeamService.AddRevenue(
      employeeData,
      true
    );

    if (AddtimeSheetResponse.isSuccess) {
      toast.success("Successfully submitted.", {
        position: "top-right",
        autoClose: 4000,
      });

      await GetTimeSheet(projectID, selectedDate);
    } else {
      toast.error(AddtimeSheetResponse.error.message, {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };
  return (
    <div>
      <div className="Project_destils_content" style={{ display: "flex" }}>
        <span>
          <i
            class="bi bi-arrow-left"
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={backtoProjectList}
          ></i>
        </span>
        <span className="ms-3"> Project Details</span>
      </div>
      <div className="addRevenueMaindiv p-2">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "15px",
          }}
        >
          <div>
            <span className="project_Name ms-2">{Project.projectName}</span>
          </div>
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              maxDate={new Date()}
              className="timesheet-datepicker"
              customInput={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    border: "1px solid #ccc",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                  }}
                >
                  <span style={{ marginRight: "10px" }}>
                    <img
                      src={calenderImage}
                      alt=""
                      height="20px"
                      width="20px"
                    />
                  </span>
                  <span>
                    {selectedDate.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              }
            />
          </div>
        </div>
        <div style={{ padding: "10px" }}>
          <table
            id="example"
            className="employeeTable"
            style={{ width: "100%" }}
          >
            <thead>
              <tr className="tableheader">
                <th style={{ fontSize: "12px" }}>Name</th>
                <th style={{ fontSize: "12px" }}>Email</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Role</th>
                <th>Worked Hours</th>
                <th style={{ textAlign: "center" }}>Rate per Hour</th>
                <th style={{ textAlign: "center" }}>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {TimeSheetdata.length === 0 ? (
                <tr className="tablebody">
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No timesheet available for the selected month.
                  </td>
                </tr>
              ) : (
                TimeSheetdata.map((emp, index) => (
                  <tr key={index} className="tablebody">
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
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="text"
                        className="timesheet_input form-control  "
                        value={`${emp.hoursWorked} ${"Hrs"}`}
                        disabled
                        style={{ textAlign: "end" }}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {GetSubmitedRevenue.isSuccess === true ? (
                        GetSubmitedRevenue.item.map(
                          (obj) =>
                            obj.timesheetId === emp.id &&
                            (obj.isSubmited === true ? (
                              <div
                                key={obj.timesheetId}
                                style={{ display: "flex", textAlign: "center" }}
                              >
                                <FaDollarSign
                                  className="mt-1"
                                  style={{
                                    fontSize: "0.90rem",
                                  }}
                                />
                                <p style={{ textAlign: "center" }}>
                                  {obj.hourlyRate}
                                </p>
                              </div>
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
                                  className="timesheet_input form-control "
                                  placeholder="Hourly Rate In $"
                                  value={
                                    rate[obj.timesheetId] !== undefined
                                      ? rate[obj.timesheetId]
                                      : obj.hourlyRate
                                  }
                                  onChange={(e) => {
                                    const newRate = e.target.value;
                                    if (
                                      newRate &&
                                      (newRate === "" || newRate >= 0)
                                    ) {
                                      handleHoursChange(
                                        obj.timesheetId,
                                        newRate
                                      );
                                    } else {
                                      handleHoursChange(obj.timesheetId, rate);
                                    }
                                  }}
                                  // style={{ width: "150px" }}
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
                            placeholder="Rate $"
                            value={rate[emp.id] || ""}
                            className="timesheet_input form-control "
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
                                <div style={{ display: "flex" }}>
                                  <FaDollarSign
                                    className="mt-1"
                                    style={{
                                      fontSize: "0.90rem",
                                    }}
                                  />
                                  <p>{obj.totalRevenue}</p>
                                </div>
                              ) : (
                                <input
                                  type="number"
                                  className="timesheet_input form-control "
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
                          <p>
                            {"$"} {emp.hoursWorked * rate[emp.id] || "0"}
                          </p>
                          {/* <input
                            type="number"
                            placeholder="Total Revenue"
                            value={emp.hoursWorked * rate[emp.id] || "0"}
                            disabled={true}
                            style={{ textAlign: "center" }}
                          /> */}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              paddingBottom: "15px",
            }}
          >
            <button
              type="button"
              className="AddRevneueSaveButton me-3"
              onClick={SaveForm}
              disabled={disiblebuttons}
            >
              <span className="AddRevneueSaveButtonSpan"> Save</span>
            </button>
            <button
              type="button"
              className="AddRevneueSubmitButton"
              onClick={SubmitFormFunction}
              disabled={disiblebuttons}
            >
              <span className="AddRevneueSubmitButtonSpan"> Submit</span>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
