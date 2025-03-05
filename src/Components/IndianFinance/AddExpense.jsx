import "../../../src/assets/Styles/AddExpense.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import calenderImage from "../../assets/Images/calendar_11919171.png";
import IndianFinanceService from "../../Service/IndianFinance/IndianFinanceService";
import { select } from "@material-tailwind/react";
import ellips from "../../../src/assets/Images/Ellipse.png";
import checkimage from "../../../src/assets/Images/check.png";
import axios from "axios";
import { useEffect } from "react";
export default function AddExpense() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [RevenueData, setRevenueData] = useState([]);
  const [generalApportionment, setgeneralApportionment] = useState(0);
  const [GetExpenses, setGetExpenses] = useState([]);
  const [generalExpensesForEachEmployee, setGeneralExpensesForEachEmployee] =
    useState();
  const [isOpen, setIsOpen] = useState(false);
  const [rate, setRate] = useState({});
  const [
    generalApprotionmentSubmittedvalue,
    SetgeneralApprotionmentSubmittedvalue,
  ] = useState();
  const [SpecificApprotionmentvalue, setSpecificApprotionmentvalue] = useState(
    {}
  );
  const [
    generalApportionmentEachEmployee,
    setgeneralApportionmentEachEmployee,
  ] = useState();

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
  }, [generalApprotionmentSubmittedvalue]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    var getMonthNunber = monthMap[month];
    var response = await IndianFinanceService.GetExpenses(getMonthNunber, year);
    setGetExpenses(response.item);
    if (response.item.length > 0) {
      var GeneralApprotionmentvalue = await response.item.map(
        (data) => data.generalApportionment
      );
      setgeneralApportionmentEachEmployee(GeneralApprotionmentvalue[0]);
      const totalSum = GeneralApprotionmentvalue.reduce(
        (acc, curr) => acc + curr,
        0
      );
      setgeneralApportionment(totalSum);
    } else {
      setgeneralApportionment("");
      setgeneralApportionmentEachEmployee(0);
    }

    var response = await IndianFinanceService.GetRevenue(getMonthNunber, year);
    if (response.isSuccess) {
      setRevenueData(response.item);
    }
  };

  //   const handleChange = (e) => {
  //     const amount = e.target.value;
  //     setgeneralApportionment(amount);
  //     const employeeCount = RevenueData.length;
  //     const amountPerEmployee = employeeCount > 0 ? amount / employeeCount : 0;
  //     setgeneralApportionmentEachEmployee(amountPerEmployee);
  //   };
  const handleChange = (e) => {
    const amount = Number(e.target.value); // Ensure it's a number
    setgeneralApportionment(amount);
    const employeeCount = RevenueData.length;
    const amountPerEmployee = employeeCount > 0 ? amount / employeeCount : 0;
    setgeneralApportionmentEachEmployee(amountPerEmployee);
  };
  const SpecificApprotionmenthandleChange = (employeeId, value) => {
    setSpecificApprotionmentvalue((prev) => ({
      ...prev,
      [employeeId]: Number(value),
    }));
  };
  const SaveExpenses = async () => {
    const month = selectedDate.toLocaleString("default", { month: "long" });
    const year = selectedDate.getFullYear();
    var getMonthNunber = monthMap[month];
    const employeeData = RevenueData.map((employee) => ({
      employeeId: employee.id,
      specificApportionment: rate[employee.id] || "",
      generalApportionment: generalApportionmentEachEmployee,
      month: Number(getMonthNunber),
      year: year,
      revenueGenerated: Number(employee.revenueAmount),
    }));
    var response = await IndianFinanceService.AddExpenses(
      employeeData,
      "false"
    );
    if (response.isSuccess) {
      setIsOpen(true);
    }
  };
  const handleHoursChange = (EmployeeID, value) => {
    setRate((prev) => ({
      ...prev,
      [EmployeeID]: value,
    }));
  };
  return (
    <div>
      <span className="Expenses-span">Expense</span>
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
              type="number"
              className="timesheet_input form-control"
              // placeholder="Enter General Apportionment"
              value={generalApportionment}
              onChange={handleChange}
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
              </tr>
            </thead>
            <tbody>
              {RevenueData.length > 0 ? (
                RevenueData.map((Revenue, index) => (
                  <tr
                    key={index}
                    className="tablebody"
                    style={{
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                  >
                    <td style={{ fontSize: "14px" }}>{Revenue.employeeId}</td>
                    <td style={{ fontSize: "14px" }}>
                      {Revenue.firstName} {Revenue.LastName}
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      {Revenue.revenueAmount ? Revenue.revenueAmount : "0"}
                    </td>
                    <td>
                      {GetExpenses.length > 0 ? (
                        GetExpenses.filter(
                          (obj) => obj.employeeId === Revenue.id
                        ).map((filteredEmployee) => (
                          <div key={filteredEmployee.employeeId}>
                            {filteredEmployee.isSubmitted === true ? (
                              <span
                                style={{
                                  textAlign: "center",
                                  display: "flex",
                                  justifyContent: "center",
                                  fontSize: "14px",
                                }}
                              >
                                {filteredEmployee.specificApportionment}
                              </span>
                            ) : (
                              <div
                                key={filteredEmployee.employeeId}
                                style={{
                                  display: "flex",
                                  justifyContent: "start",
                                  fontSize: "14px",
                                }}
                              >
                                <input
                                  type="number"
                                  className="timesheet_input form-control "
                                  placeholder="Hourly Rate In $"
                                  value={
                                    rate[filteredEmployee.employeeId] !==
                                    undefined
                                      ? rate[filteredEmployee.employeeId]
                                      : filteredEmployee.specificApportionment
                                  }
                                  onChange={(e) => {
                                    const newRate = e.target.value;
                                    if (
                                      newRate &&
                                      (newRate === "" || newRate >= 0)
                                    ) {
                                      handleHoursChange(
                                        filteredEmployee.employeeId,
                                        newRate
                                      );
                                    } else {
                                      handleHoursChange(
                                        filteredEmployee.employeeId,
                                        rate
                                      );
                                    }
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div
                          style={{ display: "flex", justifyContent: "start" }}
                        >
                          <input
                            type="text"
                            className="timesheet_input form-control "
                            d
                            placeholder="00:00  Hrs"
                            value={SpecificApprotionmentvalue[Revenue.id] || ""}
                            onChange={(e) =>
                              SpecificApprotionmenthandleChange(
                                Revenue.id,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        className="timesheet_input form-control ms-3 "
                        d
                        placeholder="$"
                        value={`$   ${generalApportionmentEachEmployee ?? 0}`}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="timesheet_input form-control "
                        value={
                          (Number(generalApportionmentEachEmployee) || 0) +
                          (Number(SpecificApprotionmentvalue[Revenue.id]) ||
                            0) +
                          (Number(rate[Revenue.id]) || 0) // Ensure correct employee ID
                        }
                        // value={
                        //   (Number(generalApportionmentEachEmployee) || 0) +
                        //   (Number(SpecificApprotionmentvalue[Revenue.id]) ||
                        //     0) +
                        //   (Number(rate[Revenue.id]) || 0)
                        // }
                        disabled={true}
                        style={{
                          textAlign: "center",
                          fontSize: "14px",
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr style={{ width: "100%" }}>
                  <td></td>
                  <td></td>

                  <td></td>
                  <td>No Records Found</td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              paddingBottom: "15px",
              paddingTop: "15px",
            }}
          >
            <button
              type="button"
              className="AddRevneueSaveButton me-3"
              onClick={SaveExpenses}
            >
              <span
                className="AddRevneueSaveButtonSpan"
                style={{ fontSize: "14px" }}
              >
                Save
              </span>
            </button>
            <button
              type="button"
              className="AddRevneueSubmitButton"
              //  onClick={SubmitFormFunction}
            >
              <span className="AddRevneueSubmitButtonSpan"> Submit</span>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="unique-popup-overlay">
          <div className="unique-popup-container">
            <div className="unique-popup-icon">
              <div className="ellipse-container">
                <img
                  src={checkimage}
                  alt="Check"
                  className="check-image"
                  height="40px"
                  width="40px"
                />
                <img
                  src={ellips}
                  alt="Ellipse"
                  className="ellipse-image"
                  height="65px"
                  width="65px"
                />
              </div>
            </div>
            <h2 className="unique-popup-title">
              Monthly Expenses Saved Successfully!
            </h2>
            <p className="unique-popup-message">Click OK to see the result</p>
            <button
              className="unique-popup-button"
              onClick={() => setIsOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
