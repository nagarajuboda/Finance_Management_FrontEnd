import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationModal from './DeleteConfirmationModal';
import '../../assets/Styles/EmployeePages/InactiveEmployeesModal.css';

const InactiveEmployeesModal = ({ employees, onClose, onActivate }) => {
  const [roles, setRoles] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetchRoles();
    fetchAllEmployees();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Roles/AllRoles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles', error);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Employees/AllEmployees');
      setAllEmployees(response.data);
    } catch (error) {
      console.error('Error fetching all employees', error);
    }
  };

  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : 'Unknown Role';
  };

  const getProjectManagerName = (projectManagerId) => {
    const projectManager = allEmployees.find(emp => emp.id === projectManagerId);
    return projectManager ? `${projectManager.firstName} ${projectManager.lastName}` : 'N/A';
  };

  const handleActivate = async (employee) => {
    try {
      const updatedEmployee = {
        ...employee,
        employeeStatus: 1 
      };

      await axios.put(`https://localhost:44305/api/Employees/UpdateEmployee`, updatedEmployee);
      onActivate(); 
    } catch (error) {
      console.error('Error activating employee', error);
    }
  };

  const handleDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (employeeToDelete) {
        await axios.delete(`https://localhost:44305/api/Employees/${employeeToDelete.id}`);
        onActivate(); 
      }
      setShowConfirmModal(false);
      setEmployeeToDelete(null);
    } catch (error) {
      console.error('Error deleting employee', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setEmployeeToDelete(null);
  };

  // Sort employees by employeeId in ascending order
  const sortedEmployees = [...employees].sort((a, b) => {
    return a.employeeId.localeCompare(b.employeeId, 'en', { numeric: true });
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content-Inactive">
        <div className='Inactiveheader'>
          <h2>Inactive Employees</h2>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
        <div className="table-container">
          <table className="inactive-employees-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Date of Joining</th>
                <th>Role</th>
                <th>Project Manager</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.length > 0 ? (
                sortedEmployees.map(employee => (
                  <tr key={employee.id}>
                    <td>{employee.employeeId}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobileNo}</td>
                    <td>{new Date(employee.dateOfJoining).toLocaleDateString('en-GB')}</td>
                    <td>{getRoleName(employee.roleId)}</td>
                    <td>{getProjectManagerName(employee.projectManagerId)}</td>
                    <td>{employee.employeeStatus === 1 ? 'Active' : 'Inactive'}</td>
                    <td>
                      <button className="activate-btn" onClick={() => handleActivate(employee)}>Activate</button>
                      <button className="delete-btn" onClick={() => handleDelete(employee)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No inactive employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete the employee "${employeeToDelete?.firstName} ${employeeToDelete?.lastName}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default InactiveEmployeesModal;
