import "../../../src/assets/Styles/USfinanceDashboard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calenderImage from "../../assets/Images/calendar_11919171.png";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { PieChart } from "@mui/x-charts/PieChart";
// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import { Chart } from "react-google-charts";
import { useState } from "react";
import React from "react";
import { Doughnut } from "react-chartjs-2";
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

  const data2 = {
    labels: ["In Progress", "Completed", "Not Started"],
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ["#007BFF", "#00CFFF"],
        hoverBackgroundColor: ["#0056b3", "#0099cc"],
        borderWidth: 0,
      },
    ],
  };

  const options2 = {
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };
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
        <div className="Project_progress1 " style={{ width: "22%" }}>
          <div style={{ display: "flex" }}>
            <div>
              <PieChart
                className="mt-2"
                series={[
                  {
                    data: [
                      { id: 0, value: 20, color: "yellow" },
                      { id: 1, value: 80, color: "#00000029" },
                    ],
                  },
                ]}
                width={190}
                height={95}
              />
            </div>
            <div>
              <div class="dropdown">
                <button
                  class=" dropdown-toggle this_month_content"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  this month
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="#">
                      yearly
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      monthly
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      weekly
                    </a>
                  </li>
                </ul>
              </div>
              <span className="total_projects_content ">Total Projects</span>
            </div>
          </div>
        </div>
        <div
          className="Project_progress1 "
          style={{ width: "22%", marginLeft: "50px" }}
        >
          <div style={{ display: "flex" }}>
            <PieChart
              className="mt-2"
              series={[
                {
                  data: [
                    { id: 0, value: 20, color: "#00000029" },
                    { id: 1, value: 80, color: "#64bb6a" },
                  ],
                },
              ]}
              width={250}
              height={125}
            />
            <div class="dropdown">
              <button
                class=" dropdown-toggle this_month_content"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                this month
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">
                    yearly
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    monthly
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    weekly
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="Project_progress1 "
          style={{ width: "22%", marginLeft: "50px" }}
        >
          <div style={{ display: "flex" }}>
            <PieChart
              className="mt-2"
              series={[
                {
                  data: [
                    { id: 0, value: 20, color: "red" },
                    { id: 1, value: 80, color: "#1F51FF" },
                  ],
                },
              ]}
              width={250}
              height={125}
            />
            <div class="dropdown">
              <button
                class=" dropdown-toggle this_month_content"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                this month
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">
                    yearly
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    monthly
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    weekly
                  </a>
                </li>
              </ul>
            </div>
          </div>
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
        </div>
      </div>

      <div>
        <div style={{ marginTop: "50px" }}>
          <span className="upcommingtimesheet">upcoming timesheet</span>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
            className="upcomingtimesheetdiv"
          >
            <div style={{ height: "250px" }}>
              <Doughnut data={data2} options={options2} height="250px" />
            </div>
            <div style={{ height: "250px" }}>
              <Doughnut data={data2} options={options2} height="300px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
