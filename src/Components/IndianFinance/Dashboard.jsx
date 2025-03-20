import "../../assets/Styles/IndiaFinanceDashboard.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import { registerGradient } from "devextreme/common/charts";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import Chart from "chart.js/auto";
import calenderImage1 from "../../assets/Images/calendar_11919171.png";
import USFinanceTeamService from "../../Service/USFinanceTeamService/USFinanceTeamService";
export default function IndainFinanceDashboard() {
  const [selectedDate1, setSelectedDate1] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
  );
  const barchartref = useRef(null);
  const barchartintance = useRef(null);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(today);
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
    handleDateChange(selectedDate1);
  }, [selectedDate1]);
  const handleDateChange1 = async (date) => {
    setSelectedDate(date);
  };
  const handleDateChange = async (date) => {
    setSelectedDate1(date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const monthNumber = monthMap[month];
    var response = await USFinanceTeamService.FcnGetRevenueOverView(
      monthNumber,
      year
    );
    var result = response.data;
    if (result.isSuccess) {
      setMonthlyRevenueData(result.item);
      Graph(result);
    } else {
      Graph([]);
    }
  };
  const Graph = (result) => {
    if (barchartintance.current) {
      barchartintance.current.destroy();
    }
    const myChartRef = barchartref.current.getContext("2d");
    let Projects;
    let revenueValues;
    let dataValues;
    let highestValue;
    let barcolors;
    if (result.isSuccess) {
      Projects = result.item.map((data) => data.projectName);
      revenueValues = result.item.map((data) => data.totalRevenue);
      dataValues = revenueValues;
      highestValue = Math.max(...dataValues);
      barcolors = dataValues.map((value) => {
        return value === highestValue ? "#335CFF" : "#DCE6EF";
      });
    }
    barchartintance.current = new Chart(myChartRef, {
      type: "bar",

      data: {
        labels: Projects,
        datasets: [
          {
            data: revenueValues,
            backgroundColor: barcolors,
            barThickness: 60,
            maxBarThickness: 40,
            categoryPercentage: 10,
            barPercentage: 20,
            borderRadius: 5,
          },
        ],
      },
      options: {
        //responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 700000,
            grid: {
              color: "#E0E0E0", // Light gray dotted lines
              borderDash: [5, 5], // Creates a dotted effect
              drawBorder: false, // Removes the solid border line
            },
            ticks: {
              font: {
                size: 14,
                weight: "bold",
              },
              color: "#A5AEB4",
              callback: function (value) {
                return `$ ${value.toLocaleString()}`;
              },
            },
          },
          x: {
            grid: {
              display: false,
              color: "#A5AEB4",
              borderDash: [5, 5],
              drawBorder: true,
            },
            ticks: {
              font: {
                size: 14,
                weight: "bold",
              },
              color: "#A5AEB4",
            },
          },
        },
        plugins: {
          chartArea: {
            backgroundColor: "red",
          },
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `$${tooltipItem.raw.toLocaleString()}`;
              },
            },
          },
        },
      },

      plugins: [
        {
          id: "customBackgroundColor",
          beforeDraw: (chart) => {
            const { ctx, chartArea } = chart;
            ctx.save();
            ctx.fillStyle = "#F5F5F5";

            ctx.clearRect(0, 0, chart.width, chart.height);

            const radius = 30;
            ctx.beginPath();
            ctx.moveTo(chartArea.left + radius, chartArea.top);
            ctx.lineTo(chartArea.right - radius, chartArea.top);
            ctx.quadraticCurveTo(
              chartArea.right,
              chartArea.top,
              chartArea.right,
              chartArea.top + radius
            );
            ctx.lineTo(chartArea.right, chartArea.bottom - radius);
            ctx.quadraticCurveTo(
              chartArea.right,
              chartArea.bottom,
              chartArea.right - radius,
              chartArea.bottom
            );
            ctx.lineTo(chartArea.left + radius, chartArea.bottom);
            ctx.quadraticCurveTo(
              chartArea.left,
              chartArea.bottom,
              chartArea.left,
              chartArea.bottom - radius
            );
            ctx.lineTo(chartArea.left, chartArea.top + radius);
            ctx.quadraticCurveTo(
              chartArea.left,
              chartArea.top,
              chartArea.left + radius,
              chartArea.top
            );
            ctx.closePath();

            ctx.fill(); // Apply background fill
            ctx.restore();
          },
        },
      ],
    });

    return () => {
      if (barchartintance.current) {
        barchartintance.current.destroy();
      }
    };
  };
  const data = [
    { value: 5, label: "A", color: "#855FC0" },
    { value: 5, label: "B", color: "#FFD8D8" },
    { value: 15, label: "C", color: "#C6FFD2" },
    { value: 20, label: "D", color: "#60CDF5" },
  ];
  const size = {
    width: 450,
    height: 250,
  };
  const StyledText = styled("text")(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 16,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }
  return (
    <div>
      <div>
        <span className="Dashboard-paragraph">Dashboard</span>
      </div>
      <div className="row">
        <div style={{ marginTop: "15px", fontSize: "14px" }} className="col-4">
          Today, <strong>{formattedDate}</strong>
        </div>
        <div className="col-5 "></div>
        <div
          className="col-3 "
          style={{ display: "flex", justifyContent: "end" }}
        >
          <div>
            <DatePicker
              selected={selectedDate1}
              onChange={handleDateChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              maxDate={
                new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
              }
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
                      src={calenderImage1}
                      alt=""
                      height="20px"
                      width="20px"
                    />
                  </span>
                  <span>
                    {selectedDate1.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              }
            />
          </div>
        </div>
      </div>
      <div className="row m-0 d-flex gap-5" style={{ paddingTop: "30px" }}>
        <div className="col total-balance">
          <div className="row">
            <div className="col-4 pt-3">
              <span className="Total-Balance-Span">Total Balance</span>
            </div>
          </div>
          <div
            className="pt-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="">
              <span className="Total-balance-amout">$7,855</span>
            </div>

            <div className=" ">
              <span className="Total-balance-amout">15.28%</span>
            </div>
          </div>
          <div className="row white-line"></div>
          <div
            className="pt-2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="">
              <span className="see-details">See Details</span>
            </div>

            <div className="">
              <i
                class="bi bi-arrow-right"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              ></i>
            </div>
          </div>
        </div>
        <div className="col monthly-income">
          <div className="row">
            <div className="col-5 pt-3">
              <span className="Total-Balance-Span">Monthly Income</span>
            </div>
          </div>
          <div
            className=" pt-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className=" ">
              <span className="Total-balance-amout">$7,855</span>
            </div>

            <div className="">
              <span className="Total-balance-amout">15.28%</span>
            </div>
          </div>
          <div className="row white-line"></div>
          <div
            className=" pt-2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="">
              <span className="see-details">See Details</span>
            </div>

            <div className="">
              <i
                class="bi bi-arrow-right"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              ></i>
            </div>
          </div>
        </div>
        <div className="col monthly-expenses">
          <div className="row">
            <div className="col-5 pt-3">
              <span className="Total-Balance-Span">Monthly Expenses</span>
            </div>
          </div>
          <div
            className=" pt-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="">
              <span className="Total-balance-amout">$7,855</span>
            </div>
            <div className="">
              <span className="Total-balance-amout">15.28%</span>
            </div>
          </div>
          <div className="row white-line"></div>
          <div
            className=" pt-2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="">
              <span className="see-details">See Details</span>
            </div>

            <div className="">
              <i
                class="bi bi-arrow-right"
                style={{ fontSize: "20px", fontWeight: "bold" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex m-0" style={{ paddingTop: "50px", gap: "40px" }}>
        <div className="revenue-summary" style={{ flexBasis: "68%" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="p-3"
          >
            <span className="Monthly-overview-content">Revenue Overview</span>

            <div>
              <DatePicker
                selected={selectedDate1}
                onChange={handleDateChange}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                maxDate={
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() - 1,
                    1
                  )
                }
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
                        src={calenderImage1}
                        alt=""
                        height="20px"
                        width="20px"
                      />
                    </span>
                    <span>
                      {selectedDate1.toLocaleString("default", {
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
              width: "750px",
            }}
            className=""
          >
            <canvas
              ref={barchartref}
              className="indian-finance-revneue-overview ms-4 "
            />
          </div>
        </div>
        <div
          className="expenses-overview"
          style={{
            flexBasis: "32%",
          }}
        >
          <span>Expenses Overview</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PieChart
              series={[
                {
                  data,

                  innerRadius: 80,
                  paddingAngle: 4,
                  cornerRadius: 5,
                  labelPosition: 60,
                  outerRadius: 110,
                },
              ]}
              {...size}
            >
              <PieCenterLabel>
                <span></span>
              </PieCenterLabel>
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
