import "../../../src/assets/Styles/USfinanceDashboard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import calenderImage from "../../assets/Images/";
import calenderImage from "../../assets/Images/calendar_11919171.png";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

// import { PieChart } from "@mui/x-charts";
import { Chart } from "react-google-charts";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";
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

  const data = [
    { name: "Completed", students: 20 },
    { name: "Remaining", students: 80 },
  ];

  const COLORS = ["yellow", "#DFDFDF"];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

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
            // maxDate={new Date()}
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
          <PieChart width={700} height={700}>
            <Pie
              activeIndex={activeIndex}
              data={data}
              dataKey="students"
              outerRadius={250}
              fill="green"
              onMouseEnter={onPieEnter}
              style={{ cursor: "pointer", outline: "none" }} // Ensure no outline on focus
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
              style={{ cursor: "pointer", outline: "none" }} // Ensure no outline on focus
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
              style={{ cursor: "pointer", outline: "none" }} // Ensure no outline on focus
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
        </div>
      </div>

      <div>
        <div style={{ marginTop: "50px" }}>
          <span className="upcommingtimesheet">upcoming timesheet</span>
          <div style={{ marginTop: "10px" }} className="upcomingtimesheetdiv">
            hello
          </div>
        </div>
      </div>
    </div>
  );
}
