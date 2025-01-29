import "../../../src/assets/Styles/USfinanceDashboard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calenderImage from "../../assets/Images/calendar_11919171.png";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import { Chart } from "react-google-charts";
import { useState } from "react";
import React from "react";
export default function UsFinanceTeamDashboard() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(today);
  const handleDateChange = async (date) => {
    setSelectedDate(date);
  };

  const [activeIndex, setActiveIndex] = useState(-1);

  // const data = [
  //   { name: "Completed", students: 20 },
  //   { name: "Remaining", students: 80 },
  // ];

  // const COLORS = ["yellow", "#DFDFDF"];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const data1 = {
    labels: ["Submitted Timesheet", "Timesheet Not Submitted"],
    datasets: [
      {
        data: [70, 30], // 70% submitted, 30% not submitted
        backgroundColor: ["#2d9cdb", "#f2994a"], // Blue & Orange
        hoverBackgroundColor: ["#1d7cb3", "#e0873e"],
        borderWidth: 0,
      },
    ],
  };

  const options1 = {
    cutout: "70%", // Makes it a donut chart
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const data = [
    { name: "Submitted Timesheet", value: 70 },
    { name: "Timesheet Not Submitted", value: 30 },
  ];

  const COLORS = ["#2D9CDB", "#F57241"];
  return (
    <div>
      <div>
        <span className="Dashboard-paragrapha">Dashboard</span>
      </div>
      <div className="row">
        <div style={{ marginTop: "15px", fontSize: "13px" }} className="col-4">
          Today, <strong>{formattedDate}</strong>
        </div>
        <div className="col-5 "></div>
        <div className="col-3 ">
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
                }}
              >
                <span style={{ marginRight: "10px" }}>
                  <img src={calenderImage} alt="" height="20px" width="20px" />
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
      <div style={{ marginTop: "15px" }}>
        <span className="project-uodate-content">Project Update</span>
      </div>
      <div
        className=" m-0"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "10px",
        }}
      >
        {/* <div className="Project_progress1 " style={{ width: "22%" }}>
          <PieChart width={700} height={700}>
            <Pie
              activeIndex={activeIndex}
              data={data}
              dataKey="students"
              outerRadius={250}
              fill="green"
              onMouseEnter={onPieEnter}
              style={{ cursor: "pointer", outline: "none" }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div
          className="Project_progress1 "
          style={{ width: "22%", marginLeft: "50px" }}
        >
          <PieChart width={700} height={700}>
            <Pie
              activeIndex={activeIndex}
              data={data}
              dataKey="students"
              outerRadius={250}
              fill="green"
              onMouseEnter={onPieEnter}
              style={{ cursor: "pointer", outline: "none" }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div
          className="Project_progress1 "
          style={{ width: "22%", marginLeft: "50px" }}
        >
          <PieChart width={700} height={700}>
            <Pie
              activeIndex={activeIndex}
              data={data}
              dataKey="students"
              outerRadius={250}
              fill="green"
              onMouseEnter={onPieEnter}
              style={{ cursor: "pointer", outline: "none" }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div
          className="Project_progress1"
          style={{ width: "22%", marginLeft: "50px" }}
        >
          <div
            className="circle"
            style={{
              position: "relative",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
              marginLeft: "15px",
            }}
          >
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              100
            </span>
          </div>
        </div> */}
      </div>

      <div>
        <div style={{ marginTop: "50px" }}>
          <span className="upcommingtimesheet">upcoming timesheet</span>
          <div style={{ marginTop: "10px" }} className="upcomingtimesheetdiv">
            <div className="chart-container">
              <PieChart width={300} height={250}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60} // Creates the donut effect
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>

              <div className="chart-center-text">
                <h3>WEEKLY</h3>
                <h4>TIMESHEET</h4>
              </div>

              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color submitted"></span>
                  Submitted Timesheet
                </div>
                <div className="legend-item">
                  <span className="legend-color not-submitted"></span>
                  Timesheet Not Submitted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
