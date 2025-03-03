import "../../../src/assets/Styles/AddExpense.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import calenderImage from "../../assets/Images/calendar_11919171.png";
import IndianFinanceService from "../../Service/IndianFinance/IndianFinanceService";
import { select } from "@material-tailwind/react";
import { useEffect } from "react";
export default function AddExpense() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [RevenueData, setRevenueData] = useState([]);

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
    handleDateChange(selectedDate);
  }, []);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    var getMonthNunber = monthMap[month];
    var response = await IndianFinanceService.GetRevenue(getMonthNunber, year);
    if (response.isSuccess) {
      setRevenueData(response.item);
    }
  };
  console.log(RevenueData);

  return (
    <div>
      <span>Expense</span>
      <div className="Add-Expense-MainDiv">
        <div
          className="General-Apportionment "
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "25px 10px 0px 10px",
          }}
        >
          <div className="d-flex " style={{ alignItems: "center" }}>
            <span className="">General Apportionment</span>
            <input
              type="text"
              className="timesheet_input form-control ms-3 "
              d
              placeholder="$"
              //   value={hours[employee.id] || ""}
              //   onChange={(e) => handleHoursChange(employee.id, e.target.value)}
            />
          </div>
          <div className="me-4">
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
                    fontSize: "14px",
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
                <th>Employee ID</th>
                <th style={{ fontSize: "14px" }}>Employee Name</th>
                <th style={{ fontSize: "14px" }}>Revenue Generated</th>
                <th style={{ fontSize: "14px" }}>Specific Apportionment</th>
                <th style={{ fontSize: "14px" }}>General Apportionment</th>
                <th style={{ fontSize: "14px" }}>Total Expenses</th>
                <th style={{ fontSize: "14px" }}>Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              {RevenueData.length > 0 &&
                RevenueData.map((Revneu, index) => (
                  <tr key={index} className="tablebody">
                    <td style={{ fontSize: "14px" }}>{Revneu.employeeId}</td>
                    <td style={{ fontSize: "14px" }}>
                      {Revneu.firstName} {Revneu.LastName}
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      {Revneu.revenueAmount ? Revneu.revenueAmount : "0"}
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      <input
                        type="text"
                        className="timesheet_input form-control ms-3 "
                        d
                        placeholder="$"
                        //   value={hours[employee.id] || ""}
                        //   onChange={(e) => handleHoursChange(employee.id, e.target.value)}
                      />
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      <input
                        type="text"
                        className="timesheet_input form-control ms-3 "
                        d
                        placeholder="$"
                        //   value={hours[employee.id] || ""}
                        //   onChange={(e) => handleHoursChange(employee.id, e.target.value)}
                      />
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      <input
                        type="text"
                        className="timesheet_input form-control ms-3 "
                        d
                        placeholder="$"
                        //   value={hours[employee.id] || ""}
                        //   onChange={(e) => handleHoursChange(employee.id, e.target.value)}
                      />
                    </td>
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
