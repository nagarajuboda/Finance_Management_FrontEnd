import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../assets/Styles/EmployeePages/EmployeeModal.css';

const EmployeeModal = ({ employee, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    employeeId: 'IARC',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNo: '',
    dateOfJoining: '',
    projectManagerId: null,
    employeeStatus: 1,
    skillSets: '',
    roleId: ''
  });
  const [roles, setRoles] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      const formattedDate = new Date(employee.dateOfJoining).toISOString().split('T')[0];
      setFormData({
        ...employee,
        dateOfJoining: formattedDate,
        employeeStatus: employee.employeeStatus === 1 ? 1 : 0,
        projectManagerId: employee.projectManagerId || null
      });
    } else {
      const now = new Date();
      now.setHours(11, 0, 0, 0);
      const defaultDate = now.toISOString().split('T')[0];
      setFormData(prevData => ({ ...prevData, dateOfJoining: defaultDate }));
    }
    fetchRoles();
    fetchProjectManagers();
  }, [employee]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles', error);
    }
  };

  const fetchProjectManagers = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Employees');
      const rolesResponse = await axios.get('https://localhost:44305/api/Roles');
      const projectManagerRole = rolesResponse.data.find(role => role.name === 'Project Manager');
      if (projectManagerRole) {
        const projectManagers = response.data.filter(emp => emp.roleId === projectManagerRole.id);
        setProjectManagers(projectManagers);
      }
    } catch (error) {
      console.error('Error fetching project managers', error);
    }
  };

  const validate = (fieldName, value) => {
    switch (fieldName) {
      case 'firstName':
        if (!value) return 'First name is required';
        break;
      case 'email':
        if (!value) return 'Email is required';
        break;
      case 'password':
        if (!value) return 'Password is required';
        break;
      case 'dateOfJoining':
        if (!value) return 'Date of Joining is required';
        break;
      case 'roleId':
        if (!value) return 'Role is required';
        break;
      case 'mobileNo':
        if (!value) return 'Mobile number is required';
        if (!/^\d+$/.test(value)) return 'Mobile number must contain only numbers';
        break;
      default:
        return '';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validate(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { dateOfJoining } = formData;
      const date = new Date(dateOfJoining);
      date.setHours(11, 0, 0, 0);
      const formattedDateOfJoining = date.toISOString();

      const dataToSubmit = {
        ...formData,
        dateOfJoining: formattedDateOfJoining,
        employeeId: employee ? formData.employeeId : 'IARC',
        projectManagerId: formData.projectManagerId || null
      };

      if (!employee) {
        await axios.post('https://localhost:44305/api/Employees', dataToSubmit);
      } else {
        await axios.put(`https://localhost:44305/api/Employees/UpdateEmployee`, dataToSubmit);
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error saving employee', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-AddEmp">
        <div className='MainDiv'>
          <div className='LeftDiv'><h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2></div>
          <div className='RightDivClose'><button className="close-btn" onClick={onClose}>Close</button></div>
        </div>
        <form onSubmit={handleSubmit}>
          {employee && (
            <input type="hidden" name="employeeId" value={formData.employeeId} />
          )}
          <label>
            First Name:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </label>
          <label>
            Last Name:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>
          <label>
            Mobile No:
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              pattern="\d*"
            />
            {errors.mobileNo && <span className="error">{errors.mobileNo}</span>}
          </label>
          <label>
            Date of Joining:
            <input
              type="date"
              className="DOJ"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
            />
            {errors.dateOfJoining && <span className="error">{errors.dateOfJoining}</span>}
          </label>
          <label>
            Project Manager:
            <select name="projectManagerId" value={formData.projectManagerId || ''} onChange={handleChange}>
              <option value="">Select Project Manager</option>
              {projectManagers.map(pm => (
                <option key={pm.id} value={pm.id}>{`${pm.firstName} ${pm.lastName}`}</option>
              ))}
            </select>
          </label>
          <label>
            Status:
            <select name="employeeStatus" value={formData.employeeStatus} onChange={handleChange}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </label>
          <label>
            Skill Sets:
            <input type="text" name="skillSets" value={formData.skillSets} onChange={handleChange} />
          </label>
          <label>
            Role:
            <select name="roleId" value={formData.roleId} onChange={handleChange}>
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
            {errors.roleId && <span className="error">{errors.roleId}</span>}
          </label>
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
