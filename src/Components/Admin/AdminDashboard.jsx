import axios from "axios";
import "../../assets/Styles/EmployeePages/AdminDashboard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
export default function AdminDashboard() {
  const [TotalEmployees, setTotalEmployees] = useState(0);
  const [TotalbenchEmployees, setTotalBenchEmployees] = useState(0);
  const [BillaBleEmployees, setBillbleEmployees] = useState(0);
  const [TotalProject, setTotalProjects] = useState(0);
  const totalEmployees = TotalEmployees;
  const billable = BillaBleEmployees;
  const nonBillable = TotalbenchEmployees;
  const total = billable + nonBillable;
  // const billablePercentage = total > 0 ? (billable / total) * 100 : 0;
  // const nonBillablePercentage = total > 0 ? (nonBillable / total) * 100 : 0;
  const billablePercentage = (billable / totalEmployees) * 100;
  const nonBillablePercentage = (nonBillable / totalEmployees) * 100;
  const totalBench = TotalbenchEmployees;
  const internal = 0;
  const noProjects = TotalProject;
  const internalPercentage = (internal / totalBench) * 100;
  const noProjectsPercentage = (noProjects / totalBench) * 100;

  useEffect(() => {
    FetchData();
  }, []);
  const FetchData = async () => {
    var response = await axios.get(
      "https://localhost:44305/api/Employees/TotalEmployees"
    );
    var resuult = response.data;
    if (resuult.isSuccess) {
      setTotalEmployees(resuult.item.item1);
      setTotalBenchEmployees(resuult.item.item2);
      setBillbleEmployees(resuult.item.item3);
      setTotalProjects(resuult.item.item4);
    }
    console.log(response, "response");
  };
  console.log(totalEmployees, "toatalemp");
  console.log(totalBench, "bench Employees");
  return (
    <div className="DashboardMaindiv">
      <p className="employeeoveriew_content">Employee Overview</p>

      <div className="row m-0">
        <div className="col-4 Employeeoverview " style={{ width: "32%" }}>
          <p className="ActiveEmployeeContent mt-2">Active Employees</p>
          <div style={{ position: "relative", width: "200px" }}>
            <svg width="100" height="50">
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#F5F5F5"
                strokeWidth="8"
              />

              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#4A90E2"
                strokeWidth="8"
                strokeDasharray={`${billablePercentage}, 100`}
              />

              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#F5A623"
                strokeWidth="8"
                strokeDasharray={`${nonBillablePercentage}, 100`}
                strokeDashoffset={-billablePercentage}
              />
            </svg>

            <div
              style={{
                position: "absolute",
                top: " 83%",
                left: " 48%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <h5 style={{ marginRight: "97px", fontSize: "20px" }}>
                {totalEmployees}
              </h5>
            </div>
            <div
              style={{
                position: "absolute",
                top: "130%",
                left: "24%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <small className="total_employees_content">Total Employees</small>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              // top: "50%",
              // left: "60%",
              top: "46%",
              left: "68%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "19px",
                    backgroundColor: "#4A90E2",
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                ></div>
                <span className="billble_content">{billable} Billable</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "10px",
                    height: "19px",
                    backgroundColor: "#F5A623",
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                ></div>
                <span className="billble_content">
                  {nonBillable} Non-Billable
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-4 Employeeoverview "
          style={{ width: "32%", marginLeft: "16px" }}
        >
          <div className="mt-2">
            <p className="ActiveEmployeeContent">Employees on Bench</p>

            <div
              style={{
                position: "relative",
                width: "120px",
                height: "120px",
              }}
            >
              <svg
                width="100"
                height="100"
                viewBox="0 0 36 36"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="transparent"
                  stroke="#F5F5F5"
                  strokeWidth="2"
                />

                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="transparent"
                  stroke="#4A90E2"
                  strokeWidth="2"
                  strokeDasharray={`${internalPercentage} ${
                    100 - internalPercentage
                  }`}
                  strokeDashoffset="0"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="transparent"
                  stroke="#D3D3D3"
                  strokeWidth="2"
                  strokeDasharray={`${noProjectsPercentage} ${
                    100 - noProjectsPercentage
                  }`}
                  strokeDashoffset={`-${internalPercentage}`}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  // top: "50%",
                  // left: "39%",
                  top: "42%",
                  left: " 39%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  padding: "0",
                  margin: "0",
                }}
              >
                <small className="bench_Employee-Progress">{totalBench}</small>
                <br />

                <span className="total_employees_content">Bench Employees</span>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "42%",
              left: " 70%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "19px",
                  backgroundColor: "#4A90E2",
                  marginRight: "5px",
                  borderRadius: "50%",
                }}
              ></div>
              <span className="billble_content">{internal} Internal</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "10px",
                  height: "19px",
                  backgroundColor: "#D3D3D3",
                  marginRight: "5px",
                  borderRadius: "50%",
                }}
              ></div>
              <span className="billble_content">{noProjects} No Projects</span>
            </div>
          </div>
        </div>
        <div
          className="col-4 Employeeoverview "
          style={{ width: "32%", marginLeft: "16px" }}
        >
          <div className="mt-2">
            <p className="ActiveEmployeeContent"> Total Employees</p>
          </div>
          <div
            className="total_employee_content"
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 18px",
            }}
          >
            <span style={{ fontSize: "20px" }} className="lastrowcontent">
              {totalEmployees}
            </span>
            <span style={{ fontSize: "13px" }} className="lastrowcontent">
              Active Employees
            </span>
          </div>
          <div
            className="total_employee_content1"
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 18px",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "20px" }} className="lastrowcontent">
              {totalBench}
            </span>
            <span style={{ fontSize: "13px" }} className="lastrowcontent">
              Employees on bench
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
