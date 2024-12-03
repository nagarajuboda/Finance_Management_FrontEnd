import "../../assets/Styles/EmployeePages/EmployeeDetails.css";
import userProfile from "../../assets/Images/adminprofile.png";
import { useEffect, useState, React } from "react";
import axios from "axios";
import EmployeeService from "../../Service/EmployeeService/EmployeeService";
export default function EmployeeDetails() {
  const employeeID = sessionStorage.getItem("id");

  const [employee, setEmployee] = useState({});
  const [ReportingManager, setReportingManager] = useState({});
  const [Skills, setSkills] = useState([]);
  const [role, setRole] = useState({});
  const [employeeTracking, setemployeeTracking] = useState([]);
  const [isVisible, setisVisible] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [employeeID]);
  const fetchData = async () => {
    const response = await axios.get(
      `https://localhost:44305/api/Employees/EmployeeDetails?id=${employeeID}`
    );
    var employeeResponse = response.data;
    setEmployee(employeeResponse.item.employee);
    setRole(employeeResponse.item.getRole);
    setReportingManager(employeeResponse.item.reportingManager);
    setSkills(employeeResponse.item.getSkillsets);
    const GetProjectsResponse = await EmployeeService.GetEmployeefcn(
      employeeID
    );
    setemployeeTracking(GetProjectsResponse.item);
  };
  // function toggleDropdown() {
  //   var dropdown = document.querySelector(".dropdown");
  //   dropdown.classList.toggle("active");
  // }
  const moreskills = () => {
    console.log("button cliked");
    setisVisible(true);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".dropbtn")) {
      setDropdownOpen(false);
    }
  };
  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };
  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  return (
    <div className="">
      <div className="Employee-details-content">employee details</div>
      <div className="view-employee-maindiv row">
        <div className="personal-details col-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "normal",
            }}
            className="mt-4"
          >
            <div className="me-4">
              <img src={userProfile} alt="" height="100px" width="100px" />
            </div>
            <div className="name-id-status pt-2 ">
              <p className="employee-name">
                {`${employee.firstName} ${employee.lastName}`}
              </p>
              <p className="employee-id">{employee.employeeId}</p>
              <div class="dropdown activeorDeactiveDropdownlist">
                <button
                  class=" dropdown-toggle dropdowninside "
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    fontSize: "12px",
                    color: "white",
                  }}
                >
                  <span class="dot"></span>
                  {employee.employeeStatus ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-4 ms-1 ">
            <div
              className="col-4 "
              style={{ fontSize: "12px", color: "#918A8A" }}
            >
              Email
            </div>
            <div
              className="col-8"
              style={{ fontSize: "12px", fontWeight: "600", color: "#000000" }}
            >
              {employee.email}
            </div>
          </div>
          <div className="row mt-3 ms-1 ">
            <div
              className="col-4 "
              style={{ fontSize: "12px", color: "#918A8A" }}
            >
              Mobile
            </div>
            <div
              className="col-8"
              style={{ fontSize: "12px", fontWeight: "600", color: "#000000" }}
            >
              {`${"+91"} ${employee.mobileNo}`}
            </div>
          </div>
          <div className="row mt-3 ms-1 ">
            <div
              className="col-4 "
              style={{ fontSize: "12px", color: "#918A8A" }}
            >
              Date Of Joining
            </div>
            <div
              className="col-8"
              style={{ fontSize: "12px", fontWeight: "600", color: "#000000" }}
            >
              {new Date(employee.dateOfJoining).toLocaleDateString("en-GB")}
            </div>
          </div>
          <div className="row mt-3 ms-1 ">
            <div
              className="col-4 "
              style={{ fontSize: "12px", color: "#918A8A" }}
            >
              Role
            </div>
            <div
              className="col-8"
              style={{ fontSize: "12px", fontWeight: "600", color: "#000000" }}
            >
              {role.name}
            </div>
          </div>
          <div className="row mt-3 ms-1 ">
            <div
              className="col-4 "
              style={{ fontSize: "12px", color: "#918A8A" }}
            >
              Reporting Manager
            </div>
            <div
              className="col-8"
              style={{ fontSize: "12px", fontWeight: "600", color: "#000000" }}
            >
              {`${ReportingManager.firstName} ${ReportingManager.lastName}`}
            </div>
          </div>
          <div className="row mt-3 ms-1 ">
            <div
              className="col-4 "
              style={{ fontSize: "12px", color: "#918A8A" }}
            >
              Skills
            </div>
            <div
              className="col-8"
              style={{ fontSize: "12px", fontWeight: "600", color: "#000000" }}
            >
              {Skills.length > 0 ? (
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {Skills.slice(0, 3).map((empskill, index) => (
                      <p
                        key={index}
                        style={{
                          fontSize: "12px",
                          display: "flex",
                          marginRight: "5px",
                        }}
                      >
                        {empskill.skill}
                        {index < 2 && ","}
                      </p>
                    ))}

                    {Skills.length > 3 && (
                      <button
                        className="tooltip-button "
                        onClick={toggleTooltip}
                        style={{
                          fontSize: "12px",
                          color: "#139BFF",
                          paddingBottom: "15px",
                        }}
                        type="button"
                      >
                        ...more
                      </button>
                    )}
                  </div>

                  {isTooltipVisible && (
                    <div className="tooltip-box">
                      <div className="tooltip-header">
                        <span style={{ fontSize: "12px", padding: "0px 7px" }}>
                          Skill Sets
                        </span>
                      </div>
                      <ul
                        className="tooltip-list"
                        style={{
                          overflowY: "scroll",
                          resize: "none",
                          // gap: "5px",
                          // height: "50x",
                          borderRadius: "4px",
                          height: "100px",
                          flexWrap: "wrap",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#000000",
                        }}
                      >
                        {Skills.slice(3).map((empskill, index) => (
                          <li
                            key={index}
                            style={{
                              fontSize: "12px",
                              color: "white",
                              padding: "0px 7px",
                            }}
                          >
                            {empskill.skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                // Skills.map(
                //   (empskill, index) =>
                //     // <p>{console.log(index)}</p>
                //     index < 3 ? (
                //       <div style={{ display: "flex" }}>
                //         <p
                //           key={index}
                //           style={{ fontSize: "12px", display: "flex" }}
                //         >
                //           {empskill.skill} {index < 2 && <span>,</span>}{" "}
                //           {index > 1 && <span>...</span>}
                //         </p>
                //         {console.log(empskill, index)}
                //         <p>
                //           {index === 2 && (
                //             <button
                //               //class="dropbtn"
                //               // onClick={toggleDropdown}
                //               //className="dropbtn"
                //               className="tooltip-button"
                //               onClick={toggleTooltip}
                //               type="button"
                //               style={{ fontSize: "12px", color: "#139BFF" }}
                //               //onClick={moreskills}
                //             >
                //               more
                //             </button>
                //           )}
                //         </p>
                //       </div>
                //     ) : (
                //       <div>
                //         {isTooltipVisible && (
                //           <div className="tooltip-box">
                //             <div className="tooltip-header">
                //               <span className="ms-2 ">Skill Sets</span>
                //             </div>
                //             <ul
                //               className="tooltip-list"
                //               style={{ paddingBottom: "5px" }}
                //             >
                //               <li style={{ padding: "0px 7px" }}>
                //                 {empskill.skill}
                //               </li>
                //             </ul>
                //           </div>
                //         )}
                //       </div>
                //       // // <p key={index}>{`${empskill.skill} ${","}`}</p>
                //       // <div class="dropdown" onclick="toggleDropdown()">
                //       //   <div class="dropdown-content">
                //       //     <a href="#">{empskill.skill}</a>
                //       //   </div>
                //       // </div>
                //     )
                //   // <p key={index}>{`${empskill.skill} ${","}`}</p>
                // )
                <p style={{ margin: "0" }}>NA</p>
              )}
            </div>
          </div>
        </div>

        <div className="working-details col-8">
          <div className="project-list mt-3">Project list</div>
          <table className="employeeTable" style={{ width: "100%" }}>
            <thead className="employee-Details-table">
              <tr>
                <th style={{ padding: "0px 8px" }}>Project Name</th>
                <th>Client Name</th>
                <th>Project Manager</th>
                <th>Start Date</th>
                <th>End Date</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {employeeTracking.map((obj, index) => {
                const dates = obj.period.split(" to ");
                const fromDate = dates[0];
                const toDate = dates[1];
                return obj.bench === true ? (
                  <tr key={index}>
                    <td>
                      <p style={{ margin: "0", padding: "0px 8px" }}>Bench</p>
                    </td>
                    <td>
                      <p
                        style={{
                          fontWeight: "800",
                          margin: "0",
                          padding: "0px 8px",
                        }}
                      >
                        --
                      </p>
                    </td>
                    <td>
                      <p
                        style={{
                          fontWeight: "800",
                          margin: "0",
                          padding: "0px 8px",
                        }}
                      >
                        --
                      </p>
                    </td>
                    <td> {fromDate}</td>
                    <td> {toDate}</td>
                    <td></td>
                  </tr>
                ) : (
                  <tr key={index}>
                    <td style={{ padding: "0px 8px" }}>
                      {obj.project.projectName}
                    </td>
                    <td>{obj.client.clientName}</td>
                    <td>
                      {obj.projectManager.firstName}{" "}
                      {obj.projectManager.lastName}
                    </td>
                    <td>{fromDate}</td>
                    {toDate == "present" ? (
                      <td>
                        {
                          <p
                            style={{
                              fontWeight: "800",
                              margin: "0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            --
                          </p>
                        }
                      </td>
                    ) : (
                      <td>{toDate}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
