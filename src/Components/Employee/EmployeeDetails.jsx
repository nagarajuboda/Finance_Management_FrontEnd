import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeModal from './AddEmployeeModal';
import ConfirmationModal from './DeleteConfirmationEmpModal';
import '../../assets/Styles/EmployeePages/EmployeeDetails.css';

const EmployeeDetails = () => { 
  const [employee, setEmployee] = useState(null);
  const [roles, setRoles] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [employeeToDeactivate, setEmployeeToDeactivate] = useState(null);
  const [projectManagerName, setProjectManagerName] = useState('NA');
  const navigate = useNavigate();
  const empId = localStorage.getItem("id");

  useEffect(() => {
    fetchEmployeeDetails(empId);
    fetchRoles();
  }, [empId]);

  const fetchEmployeeDetails = async (empId) => {
    try {
      const response = await axios.get(`https://localhost:44305/api/Employees/GetEmployee?id=${empId}`);
      const employeeData = response.data;
      setEmployee(employeeData);

      // Fetch Project Manager details if `projectManagerId` is available
      if (employeeData.projectManagerId) {
        const pmResponse = await axios.get(`https://localhost:44305/api/Employees/GetEmployee?id=${employeeData.projectManagerId}`);
        setProjectManagerName(`${pmResponse.data.firstName} ${pmResponse.data.lastName}`);
      } else {
        setProjectManagerName('NA');
      }
    } catch (error) {
      console.error('Error fetching employee details', error.response ? error.response.data : error.message);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Roles/AllRoles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles', error.response ? error.response.data : error.message);
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
        navigate('/EmployeeDashboard');  
      }
      setShowConfirmModal(false);
      setEmployeeToDeactivate(null);
    } catch (error) {
      console.error('Error deactivating employee', error.response ? error.response.data : error.message);
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
    <div className="EmployeeDetails">
      <div className="EmpHeader">
        <h3>Employee Details</h3>
        <button className="EmpBackBtn" onClick={() => navigate('/EmployeeDashboard')}>Back</button>
      </div>
      <div className="EmpDetailsContainer">
        <div className="EmpDetailsRow">
          <div className="EmpDetailsLabel">Employee ID:</div>
          <div className="EmpDetailsValue">{employee.employeeId}</div>
        </div>
        <div className="EmpDetailsRow">
          <div className="EmpDetailsLabel">First Name:</div>
          <div className="EmpDetailsValue">{employee.firstName}</div>
        </div>
        <div className="EmpDetailsRow">
          <div className="EmpDetailsLabel">Last Name:</div>
          <div className="EmpDetailsValue">{employee.lastName}</div>
        </div>
        <div className="EmpDetailsRow">
          <div className="EmpDetailsLabel">Email:</div>
          <div className="EmpDetailsValue">{employee.email}</div>
        </div>
        <div className="EmpDetailsRow">
          <div className="EmpDetailsLabel">Mobile No:</div>
          <div className="EmpDetailsValue">{employee.mobileNo}</div>
        </div>
        <div className="EmpDetailsRow">
          <div className="EmpDetailsLabel">Date of Joining:</div>
          <div className="EmpDetailsValue">{new Date(employee.dateOfJoining).toLocaleDateString('en-GB')}</div>
        </div>
        <div className="EmpDetailsRow">
          <div className="EmpDetailsLabel">Status:</div>
          <div className="EmpDetailsValue">{employee.employeeStatus === 1 ? 'Active' : 'Inactive'}</div>
        </div>
        <div className="EmpDetailsRow">
          <div className="EmpDetailsLabel">Role:</div>
          <div className="EmpDetailsValue">{getRoleName(employee.roleId)}</div>
        </div>
        <div className="EmpDetailsRow">
          <div className="EmpDetailsLabel">Project Manager:</div>
          <div className="EmpDetailsValue">{projectManagerName}</div>
        </div>
        <div className="EmpDetailsRow">
          <div className="EmpDetailsLabel">Skills:</div>
          <div className="EmpDetailsValue">{employee.skillSets || 'NA'}</div>
        </div>
      </div>
      <div className="EmpActions">
        <button className="EmpEditBtn" onClick={handleEdit}>Edit</button>
        <button className="EmpDeactivateBtn" onClick={handleDeactivate}>Deactivate</button>
      </div>
      {showEditModal && <EmployeeModal employee={employee} onClose={() => setShowEditModal(false)} onRefresh={() => fetchEmployeeDetails(empId)} />}
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
