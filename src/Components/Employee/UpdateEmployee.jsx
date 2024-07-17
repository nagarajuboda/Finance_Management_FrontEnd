import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../assets/Styles/EmployeePages/UpdateEmployee.css'

const UpdateEmployee = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [employee, setEmployee] = useState(null);
    const [updatedEmployee, setUpdatedEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: '',
        dateOfJoining: '',        
        employeeId:'',
        password:'',
        projectManagerName: '',
        employeeStatus: '',
        skillSets: '',
        roleName: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://localhost:44305/api/Employees/GetEmployee?employeeId=${employeeId}`);
            setEmployee(response.data);
            setUpdatedEmployee({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                id:response.data.id,
                email: response.data.email,
                employeeId:response.data.employeeId,
                password:response.data.password,
                mobileNo: response.data.mobileNo,
                dateOfJoining: new Date(response.data.dateOfJoining).toISOString().slice(0, 16),
                projectManagerName: response.data.projectManagerName ?? '',
                employeeStatus: response.data.employeeStatus ?? '',
                skillSets: response.data.skillSets ?? '',
                roleId:response.data.roleId,
                role:response.data.role,
                roleName: response.data.roleName
            });
            setErrors({});
            setMessage('');
        } catch (error) {
            console.error('Error searching employee:', error);
            setEmployee(null);
            setUpdatedEmployee({
                firstName: '',
                lastName: '',
                email: '',
                mobileNo: '',
                dateOfJoining: '',
                projectManagerName: '',
                employeeStatus: '',
                skillSets: '',
                roleName: ''
            });
            setErrors({ employeeId: 'Employee not found' });
            setMessage('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value ? '' : prevErrors[name]
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!updatedEmployee.firstName) newErrors.firstName = 'First Name is required';
        if (!updatedEmployee.email) newErrors.email = 'Email is required';
        if (!updatedEmployee.dateOfJoining) newErrors.dateOfJoining = 'Date of Joining is required';
        if (!updatedEmployee.roleName) newErrors.roleName = 'Role Name is required';
        return newErrors;
    };    

    const handleUpdate = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formattedDate = new Date(updatedEmployee.dateOfJoining).toISOString();
        updatedEmployee.dateOfJoining = formattedDate;
        try {
            await axios.put("https://localhost:44305/api/Employees/UpdateEmployee",updatedEmployee);
            setMessage('Employee updated successfully!');
        } catch (error) {
            console.error('Error updating employee:', error);
            setMessage('Error updating employee');
        }
    };

    return (
        <div className="update-employee-container">
            <div className="EmployeesHeader">
                <div className='UpdateEmpHeader'>
                    <h3 style={{color: "red"}}>Update Employee</h3>
                </div>
                <div>
                    <Link to ="/EmployeeDashboard">Back</Link>
                </div>
            </div>
            <div className="search-form">
                <label>Enter Employee ID:</label>
                <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <b>{errors.employeeId && <p className="error">{errors.employeeId}</p>}</b>
            </div>

            {employee && (
                <form onSubmit={handleUpdate} className="update-employee-form">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={updatedEmployee.firstName}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        required
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}

                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={updatedEmployee.lastName}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={updatedEmployee.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label>Mobile No</label>
                    <input
                        type="text"
                        name="mobileNo"
                        value={updatedEmployee.mobileNo}
                        onChange={handleChange}
                        placeholder="Enter Mobile No"
                    />

                    <label>Date of Joining</label>
                    <input
                        type="datetime-local"
                        name="dateOfJoining"
                        value={updatedEmployee.dateOfJoining}
                        onChange={handleChange}
                        placeholder="Enter Date and Time of Joining"
                        required
                    />
                    {errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}

                    <label>Project Manager</label>
                    <input
                        type="text"
                        name="projectManagerName"
                        value={updatedEmployee.projectManagerName}
                        onChange={handleChange}
                        placeholder="Enter Project Manager Name"
                        list="employee-list"
                    />
                    <datalist id="employee-list">
                        {/* List of employees for autocomplete */}
                    </datalist>

                    <label>Status</label>
                    <input
                        type="text"
                        name="employeeStatus"
                        value={updatedEmployee.employeeStatus}
                        onChange={handleChange}
                        placeholder="Enter Status"
                    />

                    <label>Skill Sets</label>
                    <input
                        type="text"
                        name="skillSets"
                        value={updatedEmployee.skillSets}
                        onChange={handleChange}
                        placeholder="Enter Skill Sets"
                    />

                    <label>Role</label>
                    <input
                        type="text"
                        name="roleName"
                        value={updatedEmployee.roleName}
                        onChange={handleChange}
                        placeholder="Enter Role Name"
                        required
                    />
                    {errors.roleName && <p className="error">{errors.roleName}</p>}

                    <button type="submit">Update Employee</button>
                </form>
            )}

            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default UpdateEmployee;