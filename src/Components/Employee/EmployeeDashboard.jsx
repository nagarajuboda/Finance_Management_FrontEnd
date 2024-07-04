import React from "react";
import { Link } from "react-router-dom";
import '../../assets/Styles/EmployeePages/EmpStyle.css';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    async function FetchData(){
      var response= await axios.get("https://localhost:44305/api/Employees");
      console.log(response.data,"response")
      setEmployees(response.data)
    }
    FetchData();
  }, []);
  return (    
    <div className="employees-container">
      <div className="EmployeesHeader">
        <div>
          <p className="contentallEmployee">All Employees</p>
        </div>
        <div >
          <Link to ="/AddEmployee">Add Employee</Link>
        </div>
      </div>
      <div>
        <table className="employees-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Date of Joining</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee,index) => (
              <tr key={index}>
                <td>{employee.employeeId}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNo}</td>
                <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
                <td>{employee.employeeStatus}</td>
              </tr>
            ))} 
          </tbody>
        </table>
      </div>
    </div>
  );
}