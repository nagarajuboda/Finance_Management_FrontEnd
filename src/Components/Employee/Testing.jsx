import React from 'react';
import { Link } from 'react-router-dom';
//import '../../assets/Styles/EmployeePages/Testing.css';

const MyDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/EmployeesPage">Employees</Link></li>
          <li><Link to="/RolesPage">Roles</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default MyDashboard;
