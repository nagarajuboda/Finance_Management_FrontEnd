import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import EmployeeModal from './AddEmployeeModal';
import ConfirmationModal from './DeleteConfirmationModal';
import InactiveEmployeesModal from './InactiveEmployeesModal';
import '../../assets/Styles/EmployeePages/EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'employeeId', direction: 'asc' });
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employeeToDeactivate, setEmployeeToDeactivate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
    fetchRoles();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Employees/AllEmployees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Roles/AllRoles');
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

  const getHeaderClass = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc';
    }
    return '';
  };

  const handleRowClick = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };

  return (
    <div className="employee-list">
      <h1>Employee Dashboard</h1>
      <div className='MainDiv'>
        <div className='LeftDiv'>
          <input type="text" placeholder="Search by name..." value={searchTerm}
            onChange={handleSearch} className="search-input"/>
          <button className="add-btn" onClick={() => { setCurrentEmployee(null); setShowModal(true); }}>Add Employee</button>
          <button className="inactive-btn" onClick={() => setShowInactiveModal(true)}>View Inactive Employees</button>
        </div>
        <div className='RightDiv'>
          <Link to="/roles"><a>Roles List</a></Link>
        </div>
      </div>  
      <table className='EmpTable'> 
        <thead>
          <tr>
            <th className={getHeaderClass('employeeId')} onClick={() => handleSort('employeeId')}>Employee Id</th>
            <th className={getHeaderClass('firstName')} onClick={() => handleSort('firstName')}>First Name</th>
            <th className={getHeaderClass('lastName')} onClick={() => handleSort('lastName')}>Last Name</th>
            <th className={getHeaderClass('email')} onClick={() => handleSort('email')}>Email</th>
            <th className={getHeaderClass('mobileNo')} onClick={() => handleSort('mobileNo')}>Mobile No</th>
            <th className={getHeaderClass('dateOfJoining')} onClick={() => handleSort('dateOfJoining')}>Date of Joining</th>
            <th>Status</th>
            <th className={getHeaderClass('roleId')} onClick={() => handleSort('roleId')}>Role</th>
            <th>Project Manager</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(employee => (
              <tr key={employee.id} onClick={() => handleRowClick(employee.id)} className="clickable-row">
                <td>{employee.employeeId}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNo}</td>
                <td>{new Date(employee.dateOfJoining).toLocaleDateString('en-GB')}</td>
                <td>{employee.employeeStatus === 1 ? 'Active' : 'Inactive'}</td>
                <td>{getRoleName(employee.roleId)}</td>
                <td>{getProjectManagerName(employee.projectManagerId)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="no-employees">No active employees.</td>
            </tr>
          )}
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
