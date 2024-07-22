import axios from 'axios';
import { Link } from "react-router-dom";
import EmployeeModal from './EmployeeModal';
import React, { useState, useEffect } from 'react';
import ConfirmationModal from './DeleteConfirmationModal';
import InactiveEmployeesModal from './InactiveEmployeesModal';
import '../../assets/Styles/EmployeePages/EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'asc' });
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employeeToDeactivate, setEmployeeToDeactivate] = useState(null);

  useEffect(() => {
    fetchEmployees();
    fetchRoles();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles', error);
    }
  };

  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : 'Unknown Role';
  };

  const getProjectManagerName = (projectManagerId) => {
    const projectManager = employees.find(emp => emp.id === projectManagerId);
    return projectManager ? `${projectManager.firstName} ${projectManager.lastName}` : 'N/A';
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleDeactivate = (employee) => {
    setEmployeeToDeactivate(employee);
    setShowConfirmModal(true);
  };

  const confirmDeactivate = async () => {
    try {
      if (employeeToDeactivate) {
        await axios.put(`https://localhost:44305/api/Employees/UpdateEmployee`, { ...employeeToDeactivate, employeeStatus: 0 });
        fetchEmployees();
      }
      setShowConfirmModal(false);
      setEmployeeToDeactivate(null);
    } catch (error) {
      console.error('Error deactivating employee', error);
    }
  };

  const cancelDeactivate = () => {
    setShowConfirmModal(false);
    setEmployeeToDeactivate(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...employees]
    .filter(emp => emp.employeeStatus === 1)
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const filteredEmployees = sortedEmployees.filter(employee =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-list">
      <h1>Employee Dashboard</h1>
      <div className='MainDiv'>
        <div className='LeftDiv'>
          <input type="textt" placeholder="Search by name..." value={searchTerm}
            onChange={handleSearch} className="search-inputt"/>
          <button className="add-btn" onClick={() => { setCurrentEmployee(null); setShowModal(true); }}>Add Employee</button>
          <button className="inactive-btn" onClick={() => setShowInactiveModal(true)}>View Inactive Employees</button>
        </div>
        <div className='RightDiv'>
          <Link to ="/Roles"><a>Roles List</a></Link>
        </div>
      </div>  
      <table className='EmpTable'> 
        <thead>
          <tr>
            <th onClick={() => handleSort('firstName')}>First Name</th>
            <th onClick={() => handleSort('lastName')}>Last Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('mobileNo')}>Mobile No</th>
            <th onClick={() => handleSort('dateOfJoining')}>Date of Joining</th>
            <th>Status</th>
            <th onClick={() => handleSort('roleId')}>Role</th>
            <th>Project Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNo}</td>
              <td>{new Date(employee.dateOfJoining).toLocaleDateString('en-GB')}</td>
              <td>{employee.employeeStatus === 1 ? 'Active' : 'Inactive'}</td>
              <td>{getRoleName(employee.roleId)}</td>
              <td>{getProjectManagerName(employee.projectManagerId)}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(employee)}>Edit</button>
                <button className="deactivate-btn" onClick={() => handleDeactivate(employee)}>Deactivate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <EmployeeModal employee={currentEmployee} onClose={() => setShowModal(false)} onRefresh={fetchEmployees} />}
      {showConfirmModal && (
        <ConfirmationModal
          message={`Are you sure you want to deactivate the employee "${employeeToDeactivate?.firstName} ${employeeToDeactivate?.lastName}"?`}
          onConfirm={confirmDeactivate}
          onCancel={cancelDeactivate}
        />
      )}
      {showInactiveModal && (
        <InactiveEmployeesModal
          employees={employees.filter(emp => emp.employeeStatus === 0)}
          onClose={() => setShowInactiveModal(false)}
          onActivate={fetchEmployees}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;
