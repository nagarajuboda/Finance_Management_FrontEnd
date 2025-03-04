import "../../../src/assets/Styles/AddExpense.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import calenderImage from "../../assets/Images/calendar_11919171.png";
import IndianFinanceService from "../../Service/IndianFinance/IndianFinanceService";
import { select } from "@material-tailwind/react";
import axios from "axios";
import { useEffect } from "react";
export default function AddExpense() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [RevenueData, setRevenueData] = useState([]);
  const [generalApportionment, setgeneralApportionment] = useState();
  const [GetExpenses, setGetExpenses] = useState([]);
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
    FetchData();
    handleDateChange(selectedDate);
  }, [generalApportionment]);

  const FetchData = async () => {
    const month = selectedDate.toLocaleString("default", { month: "long" });
    const year = selectedDate.getFullYear();
    var getMonthNunber = monthMap[month];
    var response = await IndianFinanceService.GetExpenses(getMonthNunber, year);
    setGetExpenses(response.item);
  };

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
  const handleChange = (generalApportionmentAmout) => {
    setgeneralApportionment(generalApportionmentAmout);
    const employeeCount = RevenueData.length;
    const amountPerEmployee =
      employeeCount > 0 ? generalApportionmentAmout / employeeCount : 0;
    setgeneralApportionmentEachEmployee(amountPerEmployee);
  };
  const SpecificApprotionmenthandleChange = (employeeId, value) => {
    setSpecificApprotionmentvalue((prev) => ({
      ...prev,
      [employeeId]: Number(value) || 0,
    }));
  };
  const SaveExpenses = async () => {
    const month = selectedDate.toLocaleString("default", { month: "long" });
    const year = selectedDate.getFullYear();
    var getMonthNunber = monthMap[month];
    const employeeData = RevenueData.map((employee) => ({
      employeeId: employee.id,
      specificApportionment: Number(
        SpecificApprotionmentvalue[employee.id] || ""
      ),
      generalApportionment: Number(generalApportionmentEachEmployee),
      month: Number(getMonthNunber),
      year: year,
      revenueGenerated: employee.revenueAmount,
    }));
    const response = await axios.post(
      `https://localhost:44305/api/Expenses/AddExpenses?isSubmmited=${"false"}`,
      employeeData
    );
    // var response = await IndianFinanceService.AddExpenses(
    //   employeeData,
    //   "false"
    // );

    console.log(response, "=========>");
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
              type="text"
              className="timesheet_input form-control ms-3 "
              placeholder="$"
              onChange={(e) => handleChange(e.target.value)}
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
                                {filteredEmployee.generalApportionment}
                              </span>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="text"
                                  className="timesheet_input form-control ms-3 "
                                  d
                                  placeholder="$"
                                  value={
                                    SpecificApprotionmentvalue[Revenue.id] || ""
                                  }
                                  onChange={(e) =>
                                    SpecificApprotionmenthandleChange(
                                      Revenue.id,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <input
                            type="text"
                            className="timesheet_input form-control ms-3 "
                            d
                            placeholder="$"
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
                        value={`$ ${generalApportionmentEachEmployee ?? 0}`}
                        disabled
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="timesheet_input form-control "
                        value={
                          (Number(generalApportionmentEachEmployee) || 0) +
                          (Number(SpecificApprotionmentvalue[Revenue.id]) || 0)
                        }
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
    </div>
  );
}
