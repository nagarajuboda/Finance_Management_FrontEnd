import "../../../src/assets/Styles/IndiaFinanceDashboard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { CommonSeriesSettings } from "devextreme-react/chart";
import { registerGradient } from "devextreme/common/charts";
import { useRef } from "react";
import { useState } from "react";
import React from "react";
import { Doughnut } from "react-chartjs-2";
export default function IndainFinanceDashboard() {
  const today = new Date();
  const barchartref = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate1, setSelectedDate1] = useState(new Date());

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(today);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div>
        <span className="Dashboard-paragrapha">Dashboard</span>
      </div>
      <div className="row">
        <div style={{ marginTop: "15px", fontSize: "14px" }} className="col-4">
          Today, <strong>{formattedDate}</strong>
        </div>
        <div className="col-5 "></div>
        <div className="col-3">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
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
                  float: "right",
                }}
              >
                <span style={{ marginRight: "10px" }}>
                  {/* <img src={calenderImage} alt="" height="20px" width="20px" /> */}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "10px",
        }}
      >
        <div className="Total-Data Total-Bal">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "50%", padding: "10px 10px 0 10px" }}>
              <div className="Cap">Total Balance</div>

              <div className="Balance">$7500</div>
            </div>
            <div style={{ width: "50%", padding: "10px 10px 0 10px" }}>
              <div style={{ height: "52px", textalign: "right" }}>;;</div>

              <div className="Bal-Percentage">15.24%</div>
            </div>
          </div>
          <div className="Outer-Details">
            <div className="Details">See Details</div>
            <div className="Details" style={{ float: "right" }}>
              gfdgfg
            </div>
          </div>
        </div>

        <div className="Total-Data Monthly-Income">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "50%", padding: "10px 10px 0 10px" }}>
              <div className="Cap">Monthly Income</div>

              <div className="Balance">$2783.00</div>
            </div>
            <div style={{ width: "50%", padding: "10px 10px 0 10px" }}>
              <div style={{ height: "52px", textalign: "right" }}>;;</div>

              <div className="Bal-Percentage">25.55%</div>
            </div>
          </div>
          <div className="Outer-Details">
            <div className="Details">See Details</div>
            <div className="Details" style={{ float: "right" }}>
              gfdgfg
            </div>
          </div>
        </div>
        <div className="Total-Data Monthly-Exp">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "50%", padding: "10px 10px 0 10px" }}>
              <div className="Cap">Monthly Expense</div>

              <div className="Balance">$1655.00</div>
            </div>
            <div style={{ width: "50%", padding: "10px 10px 0 10px" }}>
              <div style={{ height: "52px", textalign: "right" }}>;;</div>

              <div className="Bal-Percentage">12.35%</div>
            </div>
          </div>
          <div className="Outer-Details">
            <div className="Details">See Details</div>
            <div className="Details" style={{ float: "right" }}>
              gfdgfg
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "40px", paddingBottom: "20px" }}>
        <span className="Dashboard-paragrapha">REVENUE SUMMARY</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "10px",
        }}
      >
        <div className="Revenue-Div">
          <div className="Cap">Revenue Overview</div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <canvas ref={barchartref} className="bar-pie-chart " /> */}
          </div>
        </div>
        <div className="Exp-Div"></div>
      </div>
      <div style={{ paddingTop: "40px", paddingBottom: "20px" }}>
        <span className="Dashboard-paragrapha">PROFIT AND LOSS SUMMARY</span>
      </div>
      <div className="P-L-Summary">
        <div className="P-L-Inner"></div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "60px",
        }}
      >
        <div className="Revenue-Div"></div>
        <div className="Exp-Div"></div>
      </div>
    </div>
  );
}
