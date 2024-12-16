import "../../../src/assets/Styles/TimeSheet.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EmployeeService from "../../Service/EmployeeService/EmployeeService";
export default function TimeSheet() {
  const userDetails = JSON.parse(localStorage.getItem("sessionData"));
  var id = userDetails.employee.id;
  console.log(id);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [projectOptions, setProjects] = useState([]);

  const [ProjectEmployees, setProjectemployess] = useState([]);

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.toLocaleString("default", { month: "long" });

    const result = `${month} ${year}`;
    setFormattedDate(result);
    FetchData();
  }, [selectedDate]);
  async function FetchData() {
    const response = await EmployeeService.GetProjectInfo(id);
    const projects = response.item;
    const options = projects.map((p, index) => ({
      value: p.project.id,
      label: p.project.projectName,
    }));

    setProjects(options);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle project selection
  const handleProjectChange = async (option) => {
    setSelectedProject(option);
    // console.log(formattedDate, "option");
    const ProjectEmployeess = await axios.get(
      `https://localhost:44305/api/Timesheets/GetProjectEmployee?projectID=${option.value}&date=${formattedDate}`
    );
    var result = ProjectEmployees;
    console.log(result, "==========>");

    setProjectemployess(result);
  };
  console.log(ProjectEmployees, "employees");
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: "200px", // Adjust the height of the dropdown
      overflowY: "auto", // Add scroll when content overflows
    }),
    control: (provided) => ({
      ...provided,
      height: "32px", // Adjust the input box height
      minHeight: "32px",
    }),
    option: (provided) => ({
      ...provided,
      padding: "10px", // Adjust option padding
    }),
  };
  console.log(ProjectEmployees, "========>");
  return (
    <div>
      <div className="timeSheet_content">TimeSheet</div>
      <div className="TimeSheetMainDiv">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            justifyContent: "end",
            marginRight: "25px",
            paddingTop: "20px",
          }}
        >
          {/* Dropdown List */}
          <div className="">
            <Select
              options={projectOptions}
              placeholder="Select Project"
              onChange={handleProjectChange}
              value={selectedProject}
              className="drop_down_list"
              styles={customStyles}

              // isSearchable
            />
          </div>

          <div>
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
                  <span style={{ marginRight: "10px" }}>📅</span>
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
        <div className="TimeSheet_Table" style={{ padding: "10px" }}>
          <table
            id="example"
            className="employeeTable"
            style={{ width: "100%" }}
          >
            <thead>
              <tr className="tableheader">
                <th style={{ fontSize: "12px" }}>Name</th>
                <th style={{ fontSize: "12px" }}>Email</th>
                <th style={{ fontSize: "12px" }}>Department</th>
                <th style={{ fontSize: "12px" }}>Status</th>
                <th style={{ fontSize: "12px" }}>Role</th>
                <th style={{ fontSize: "12px" }}>Hours</th>
              </tr>
            </thead>
            <tbody>
              {ProjectEmployees.map((emp, index) => {
                <tr key={index}>
                  <td>{ProjectEmployees}</td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
