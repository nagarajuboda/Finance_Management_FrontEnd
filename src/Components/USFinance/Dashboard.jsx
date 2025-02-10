import "../../../src/assets/Styles/USfinanceDashboard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calenderImage from "../../assets/Images/calendar_11919171.png";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { CommonSeriesSettings } from "devextreme-react/chart";
import { registerGradient } from "devextreme/common/charts";

// import { PieChart, Pie, Cell, Tooltip } from "recharts";

// import { PieChart } from "@mui/x-charts/PieChart";
// import { PieChart, Pie, Tooltip, Cell } from "recharts";
// import { Chart } from "react-google-charts";
import { useState } from "react";
import React from "react";
import { Doughnut } from "react-chartjs-2";
export default function UsFinanceTeamDashboard() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [submitedTimesheet, setsubmitedTimesheet] = useState("70%");
  const [NotsubmitedTimesheet, setNotsubmitedTimesheet] = useState("30%");
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
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const data = [
    { name: "Submitted Timesheet", value: 70, color: "#1E73DC" },
    { name: "Timesheet Not Submitted", value: 30, color: "#F67D3B" },
  ];
  const data11 = [
    { name: "Billable Employees", value: 70, color: "#F5F5F5" }, // Light gray
    { name: "Non Billable Employees", value: 30, color: "#1E73DC" }, // Blue
  ];
  const COLORS = ["#FDCB58", "#D3D3D3"];
  const seriesColor = {
    base: "#f5564a",
    fillId: registerGradient("linear", {
      colors: [
        {
          offset: "20%",
          color: "#97c95c",
        },
        {
          offset: "90%",
          color: "#eb3573",
        },
      ],
    }),
  };
  const barChartOptions = {
    data: [
      { category: "GXO", revenue: 1500 },
      { category: "cianahealth", revenue: 1000 },
      { category: "EDR", revenue: 2000 },
      { category: "XPO", revenue: 2800 },
      { category: "Title", revenue: 500 },
      { category: "Title", revenue: 1800 },
      { category: "Title", revenue: 1300 },
    ],
    series: [
      {
        type: "bar",
        xKey: "category",
        yKey: "revenue",
        fill: ({ datum }) => (datum.revenue === 2800 ? "#0066FF" : "#CBD5E1"),
        tooltip: {
          renderer: ({ datum }) => ({
            title: "Project Revenue",
            content: `$${datum.revenue}`,
          }),
        },
      },
    ],
    legend: { enabled: false },
    axes: [
      { type: "category", position: "bottom", title: { text: "" } },
      { type: "number", position: "left", title: { text: "$ Revenue" } },
    ],
  };

  // Pie Chart Configuration
  const pieChartOptions = {
    data: [
      { category: "Completed", value: 70 },
      { category: "Pending", value: 30 },
    ],
    series: [
      {
        type: "pie",
        angleKey: "value",
        labelKey: "category",
        fills: ["#FACC15", "#CBD5E1"], // Yellow & Gray
        innerRadius: 0, // Full Pie
      },
    ],
    legend: { enabled: true },
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
              {/* <PieChart
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
              /> */}
            </div>
            <div>
              {/* <div class="dropdown">
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
              </div> */}
              {/* <span className="total_projects_content ">Total Projects</span> */}
            </div>
          </div>
        </div>
        <div
          className="Project_progress1 "
          style={{ width: "22%", marginLeft: "50px" }}
        >
          <div style={{ display: "flex" }}>
            {/* <PieChart
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
            /> */}
            {/* <div class="dropdown">
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
            </div> */}
          </div>
        </div>
        <div
          className="Project_progress1 "
          style={{ width: "22%", marginLeft: "50px" }}
        >
          <div style={{ display: "flex" }}>
            {/* <PieChart
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
            /> */}
            {/* <div class="dropdown">
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
            </div> */}
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
            className="upcomingtimesheetdiv UpcommingUsfinance"
          >
            <div
              className="flex justify-center items-center"
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* <span style={{ fontSize: "12px" }} className="m-4">
                Submitted Timesheet
              </span> */}
              <div className="row" style={{ width: "100vw" }}>
                <div className="col-6 ">
                  <PieChart width={500} height={400} className="ms-4">
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={100}
                      outerRadius={140}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>

                    <Tooltip />
                    <svg width="400" height="300">
                      <defs>
                        <filter
                          id="shadow"
                          x="-50%"
                          y="-50%"
                          width="200%"
                          height="200%"
                        >
                          <feDropShadow
                            dx="2"
                            dy="2"
                            stdDeviation="4"
                            floodColor="rgba(0,0,0,0.3)"
                          />
                        </filter>
                      </defs>

                      <circle
                        cx="250"
                        cy="200"
                        r="80"
                        fill="white"
                        filter="url(#shadow)"
                      />

                      <text
                        x="62%"
                        y="75%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="18px"
                        fontWeight="bold"
                        fill="#555"
                      >
                        WEEKLY
                      </text>
                      <line
                        x1="332"
                        y1="271"
                        x2="500"
                        y2="401"
                        stroke="#514C4C"
                        strokeWidth="4"
                        fill="#596365"
                      />
                      <line
                        x1="369"
                        y1="300"
                        x2="502"
                        y2="280"
                        stroke="#514C4C"
                        strokeWidth="4"
                        fill="#596365"
                      />
                      <text
                        x="62%"
                        y="65%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="18px"
                        fontWeight="bold"
                        fill="#555"
                        className="kjasdsakj"
                      >
                        TIMESHEET
                      </text>
                      <line
                        x1="205"
                        y1="20"
                        x2="150"
                        y2="20"
                        stroke="#514C4C"
                        strokeWidth="4"
                        fill="block"
                      />
                      <line
                        x1="203"
                        y1="19  "
                        x2="260"
                        y2="70"
                        stroke="#514C4C"
                        strokeWidth="4"
                        fill="block"
                      />
                    </svg>
                  </PieChart>
                  <div className="absolute text-sm">
                    <div
                      style={{
                        position: "absolute",
                        left: "60px",
                        top: "14%",
                        fontSize: "14px",
                      }}
                    >
                      Submitted Timesheet
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        right: "200px",
                        top: "65%",
                        fontSize: "14px",
                      }}
                    >
                      Timesheet Not Submitted
                    </div>
                  </div>
                  <div className="absolute text-sm">
                    <div
                      style={{
                        position: "absolute",
                        left: "190px",
                        top: "40%",
                        fontSize: "12px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      70%
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        right: "390px",
                        top: "58%",
                        fontSize: "12px",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      30%
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <PieChart width={500} height={400} className="">
                    <Pie
                      data={data11}
                      cx="50%"
                      cy="50%"
                      innerRadius={100}
                      outerRadius={140}
                      dataKey="value"
                      stroke="none"
                    >
                      {data11.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>

                    <Tooltip />

                    <svg width="500" height="400">
                      <text
                        x="50%"
                        y="45%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="18px"
                        fontWeight="bold"
                        fill="#777"
                      >
                        BILLING
                      </text>
                      <text
                        x="50%"
                        y="52%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="18px"
                        fontWeight="bold"
                        fill="#777"
                      >
                        PERFORMANCE
                      </text>

                      {/* <line
                        x1="332"
                        y1="271"
                        x2="500"
                        y2="401"
                        stroke="#514C4C"
                        strokeWidth="4"
                        fill="#596365"
                      /> */}
                      <line
                        x1="464"
                        y1="334"
                        x2="356"
                        y2="212"
                        stroke="#514C4C"
                        strokeWidth="4"
                        fill="#596365"
                      />
                      <line
                        x1="205"
                        y1="20"
                        x2="150"
                        y2="20"
                        stroke="#514C4C"
                        strokeWidth="4"
                        fill="block"
                      />
                      <line
                        x1="203"
                        y1="19  "
                        x2="260"
                        y2="70"
                        stroke="#514C4C"
                        strokeWidth="4"
                        fill="block"
                      />
                    </svg>
                  </PieChart>
                  <div className="absolute text-sm">
                    <div
                      style={{
                        position: "absolute",
                        left: "10px",
                        top: "15%",
                        fontSize: "14px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "18px",
                        }}
                      >
                        70%
                      </span>
                      Billable Employees
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        right: "270px",
                        top: "75%",
                        fontSize: "14px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: "18px",
                        }}
                      >
                        30%
                      </span>{" "}
                      Non Billable Employees
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Revenue-overview-maindiv">
        <span className="Revenue-overview-span">Revenue Overview</span>
        <div className="Revenue-overview">
          <h3 style={{ fontSize: "16px" }} className="m-2">
            Project Revenue
          </h3>
        </div>
      </div>
    </div>
  );
}
