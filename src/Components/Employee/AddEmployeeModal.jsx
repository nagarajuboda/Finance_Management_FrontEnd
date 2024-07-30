import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../assets/Styles/EmployeePages/AddEmployeeModal.css';

const AddEmployeeModal = ({ employee, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: '',
    mobileNo: '',
    dateOfJoining: '',
    projectManagerId: '', // Store Project Manager ID here
    employeeStatus: 1,
    skillSets: '',
    roleId: ''
  });
  const [roles, setRoles] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);
  const [errors, setErrors] = useState({});
  const [existingEmployeeIds, setExistingEmployeeIds] = useState([]);
  const isEditing = !!employee;

  useEffect(() => {
    if (employee) {
      const formattedDate = new Date(employee.dateOfJoining).toISOString().split('T')[0];
      setFormData({
        ...employee,
        dateOfJoining: formattedDate,
        employeeStatus: employee.employeeStatus === 1 ? 1 : 0,
        projectManagerId: employee.projectManagerId || ''
      });
    } else {
      const now = new Date();
      now.setHours(11, 0, 0, 0);
      const defaultDate = now.toISOString().split('T')[0];
      setFormData(prevData => ({ ...prevData, dateOfJoining: defaultDate }));
      fetchEmployeeIds(); // Fetch existing employee IDs if adding new employee
    }
    fetchRoles();
    fetchProjectManagers();
  }, [employee]);

  const fetchEmployeeIds = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Employees/AllEmployees');
      const ids = response.data.map(emp => emp.employeeId);
      setExistingEmployeeIds(ids);
      if (!employee) {
        const nextEmployeeId = getNextEmployeeId(ids);
        setFormData(prevData => ({ ...prevData, employeeId: nextEmployeeId }));
      }
    } catch (error) {
      console.error('Error fetching employee IDs', error);
    }
  };

  const getNextEmployeeId = (existingIds) => {
    const prefix = 'IARC';
    const currentIds = existingIds.filter(id => id.startsWith(prefix)).map(id => id.slice(prefix.length));
    const maxId = currentIds.reduce((max, id) => Math.max(max, parseInt(id.replace(/^0+/, ''))), 0);
    return `${prefix}${String(maxId + 1).padStart(4, '0')}`;
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Roles/AllRoles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles', error);
    }
  };

  const fetchProjectManagers = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Employees/AllEmployees');
      const rolesResponse = await axios.get('https://localhost:44305/api/Roles/AllRoles');
      const projectManagerRole = rolesResponse.data.find(role => role.name === 'Project Manager');
      if (projectManagerRole) {
        const projectManagers = response.data.filter(emp => emp.roleId === projectManagerRole.id);
        setProjectManagers(projectManagers);
      }
    } catch (error) {
      console.error('Error fetching project managers', error);
    }
  };

  const getProjectManagerName = (employeeId) => {
    const pm = projectManagers.find(pm => pm.employeeId === employeeId);
    return pm ? `${pm.firstName} ${pm.lastName}` : '';
  };

  const validate = (fieldName, value) => {
    switch (fieldName) {
      case 'firstName':
        if (!value) return 'First name is required';
        break;
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email address is invalid';
        break;
      case 'passwordHash':
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
      const { dateOfJoining, employeeStatus, projectManagerId } = formData;
      const date = new Date(dateOfJoining);
      date.setHours(11, 0, 0, 0);
      const formattedDateOfJoining = date.toISOString();

      const dataToSubmit = {
        ...formData,
        dateOfJoining: formattedDateOfJoining,
        employeeStatus: Number(employeeStatus), // Ensure employeeStatus is sent as a number
        projectManagerId // Use Project Manager ID for submission
      };

      if (!employee) {
        await axios.post('https://localhost:44305/api/Employees/CreateEmployee', dataToSubmit);
      } else {
        await axios.put(`https://localhost:44305/api/Employees/UpdateEmployee`, dataToSubmit);
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error saving employee', error);
    }
  };

  const handleProjectManagerChange = (e) => {
    const selectedName = e.target.value;
    const selectedPm = projectManagers.find(pm => `${pm.firstName} ${pm.lastName}` === selectedName);
    setFormData(prevData => ({
      ...prevData,
      projectManagerId: selectedPm ? selectedPm.employeeId : '',
      projectManager: selectedName
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-AddEmp">
        <div className='MainDiv'>
          <div className='LeftDiv'>
            <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
          </div>
          <div className='RightDivClose'>
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {isEditing && (
            <input type="hidden" name="employeeId" value={formData.employeeId} />
          )}
          <label>
            Employee ID:
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              disabled={isEditing} // Disable editing if it's an existing employee
            />
          </label>
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
            <input type="password" name="passwordHash" value={formData.passwordHash} onChange={handleChange} />
            {errors.passwordHash && <span className="error">{errors.passwordHash}</span>}
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
            <select name="projectManager" value={formData.projectManager} onChange={handleProjectManagerChange}>
              <option value="">Select Project Manager</option>
              {projectManagers.map(pm => (
                <option key={pm.employeeId} value={`${pm.firstName} ${pm.lastName}`}>
                  {`${pm.firstName} ${pm.lastName}`}
                </option>
              ))}
            </select>
          </label>
          <label>
            Employee Status:
            <select name="employeeStatus" value={formData.employeeStatus} onChange={handleChange}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
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
          <label>
            Skill Sets:
            <textarea name="skillSets" value={formData.skillSets} onChange={handleChange}></textarea>
          </label>
          <button type="submit" className="submit-btn">
            {isEditing ? 'Save' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
