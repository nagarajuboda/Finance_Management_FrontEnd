import "../../../src/assets/Styles/IndiaFinanceDashboard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { CommonSeriesSettings } from "devextreme-react/chart";
import { registerGradient } from "devextreme/common/charts";
import { useRef } from "react";

// import { PieChart, Pie, Cell, Tooltip } from "recharts";

// import { PieChart } from "@mui/x-charts/PieChart";
// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import { Chart } from "react-google-charts";
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

  // const handleDateChange1 = async (date) => {
  //   setSelectedDate1(date);
  //   const month = date.toLocaleString("default", { month: "long" });
  //   const year = date.getFullYear();
  //   const monthNumber = monthMap[month];
  //   var response = await axios.get(
  //     `https://localhost:44305/api/Revenue/GetRevenueOverview?month=${monthNumber}&year=${year}`
  //   );
  //   var result = response.data;
  //   if (result.isSuccess) {
  //     setMonthlyRevenueData(result.item);
  //     Graph(result);
  //   } else {
  //     //setMonthlyRevenueData(() => []);
  //     Graph([]);
  //     toast.error(result.item, {
  //       position: "top-right",
  //       autoClose: 4000,
  //     });
  //   }
  // };
  // const Graph = (result) => {
  //   console.log(result, "adasdlasklk");
  //   if (barchartintance.current) {
  //     barchartintance.current.destroy();
  //   }
  //   const myChartRef = barchartref.current.getContext("2d");
  //   let Projects;
  //   let revenueValues;
  //   let dataValues;
  //   let highestValue;
  //   let barcolors;
  //   if (result.isSuccess) {
  //     Projects = result.item.map((data) => data.projectName);
  //     revenueValues = result.item.map((data) => data.totalRevenue);
  //     dataValues = revenueValues;
  //     highestValue = Math.max(...dataValues);
  //     barcolors = dataValues.map((value) => {
  //       return value === highestValue ? "#335CFF" : "#DCE6EF";
  //     });
  //   }
  //   barchartintance.current = new Chart(myChartRef, {
  //     type: "bar",
  //     data: {
  //       labels: Projects,
  //       datasets: [
  //         {
  //           data: revenueValues,
  //           backgroundColor: barcolors,
  //           barThickness: 60,
  //           maxBarThickness: 70,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           min: 0,
  //           max: 950000,
  //           grid: {
  //             color: "#E0E0E0",
  //             drawBorder: true,
  //           },
  //           ticks: {
  //             font: {
  //               size: 16,
  //               weight: "bold",
  //             },
  //             color: "#A5AEB4",
  //           },
  //         },
  //         x: {
  //           grid: {
  //             display: false,
  //             color: "#A5AEB4",
  //             borderDash: [5, 5],
  //           },
  //           ticks: {
  //             font: {
  //               size: 16,
  //               weight: "bold",
  //             },
  //             color: "#A5AEB4",
  //           },
  //         },
  //       },
  //       plugins: {
  //         chartArea: {
  //           backgroundColor: "red",
  //         },
  //       },
  //     },
  //     plugins: [
  //       {
  //         id: "customBackgroundColor",
  //         beforeDraw: (chart) => {
  //           const { ctx, chartArea } = chart;
  //           ctx.save();
  //           ctx.fillStyle = "#F5F5F5";
  //           ctx.fillRect(
  //             chartArea.left,
  //             chartArea.top,
  //             chartArea.right - chartArea.left,
  //             chartArea.bottom - chartArea.top
  //           );
  //           ctx.restore();
  //         },
  //       },
  //     ],
  //   });

  //   return () => {
  //     if (barchartintance.current) {
  //       barchartintance.current.destroy();
  //     }
  //   };
  // };

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
