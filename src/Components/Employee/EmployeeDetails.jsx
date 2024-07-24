import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeModal from './AddEmployeeModal';
import ConfirmationModal from './DeleteConfirmationModal';
import '../../assets/Styles/EmployeePages/EmployeeDetails.css';

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [roles, setRoles] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [employeeToDeactivate, setEmployeeToDeactivate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeDetails();
    fetchRoles();
  }, [employeeId]);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`https://localhost:44305/api/Employees/${employeeId}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee details', error);
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

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDeactivate = () => {
    setEmployeeToDeactivate(employee);
    setShowConfirmModal(true);
  };

  const confirmDeactivate = async () => {
    try {
      if (employeeToDeactivate) {
        await axios.put(`https://localhost:44305/api/Employees/UpdateEmployee`, { ...employeeToDeactivate, employeeStatus: 0 });
        navigate('/EmployeeDashboard');  // Navigate back to EmployeeDashboard after deactivation
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

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="employee-details">
      <div className="myheader">
        <h1>Employee Details</h1>
        <button className="back-btn" onClick={() => navigate('/EmployeeDashboard')}>Back</button>
      </div>
      <div className="details-container">
        <p><strong>Employee ID:</strong> {employee.employeeId}</p>
        <p><strong>First Name:</strong> {employee.firstName}</p>
        <p><strong>Last Name:</strong> {employee.lastName}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Mobile No:</strong> {employee.mobileNo}</p>
        <p><strong>Date of Joining:</strong> {new Date(employee.dateOfJoining).toLocaleDateString('en-GB')}</p>
        <p><strong>Status:</strong> {employee.employeeStatus === 1 ? 'Active' : 'Inactive'}</p>
        <p><strong>Role:</strong> {getRoleName(employee.roleId)}</p>
        <p><strong>Project Manager:</strong> {employee.projectManagerId}</p>
      </div>
      <div className="actions">
        <button className="edit-btn" onClick={handleEdit}>Edit</button>
        <button className="deactivate-btn" onClick={handleDeactivate}>Deactivate</button>
      </div>
      {showEditModal && <EmployeeModal employee={employee} onClose={() => setShowEditModal(false)} onRefresh={fetchEmployeeDetails} />}
      {showConfirmModal && (
        <ConfirmationModal
          message={`Are you sure you want to deactivate "${employee.firstName} ${employee.lastName}"?`}
          onConfirm={confirmDeactivate}
          onCancel={cancelDeactivate}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
