import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/Styles/EmployeePages/UpdateEmployee.css'
import { Link } from "react-router-dom";

const UpdateEmployee = () => {
    const [employee, setEmployee] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        passwordHash: '',
        mobileNo: '',
        dateOfJoining: '',
        projectManagerId: '',
        employeeStatus: '',
        skillSets: '',
        roleId: ''
    });

    const [errors, setErrors] = useState({});
    const [fetchError, setFetchError] = useState('');
    const [isFetched, setIsFetched] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
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
        if (!employee.firstName) newErrors.firstName = 'First Name is required';
        if (!employee.email) newErrors.email = 'Email is required';
        if (!employee.passwordHash) newErrors.passwordHash = 'Password is required';
        if (!employee.dateOfJoining) newErrors.dateOfJoining = 'Date of Joining is required';
        if (!employee.roleId) newErrors.roleId = 'Role ID is required';
        return newErrors;
    };

    const handleFetchEmployee = async () => {
        try {
            const response = await axios.get("https://localhost:44305/api/Employees/${employee.employeeId}");
            setEmployee(response.data);
            setFetchError('');
            setIsFetched(true);
        } catch (error) {
            console.error('Error fetching employee', error);
            setFetchError('Employee not found');
            setIsFetched(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.put("https://localhost:44305/api/Employees/${employee.employeeId}", employee);
            alert('Employee updated successfully!');
            setEmployee({
                employeeId: '',
                firstName: '',
                lastName: '',
                email: '',
                passwordHash: '',
                mobileNo: '',
                dateOfJoining: '',
                projectManagerId: '',
                employeeStatus: '',
                skillSets: '',
                roleId: ''
            });
            setErrors({});
            setIsFetched(false);
        } catch (error) {
            console.error('Error updating employee', error);
            alert('Error updating employee');
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
             <div className="fetch-employee">
                <label>Employee ID</label>
                <input
                    type="text"
                    name="employeeId"
                    value={employee.Id}
                    onChange={handleChange}
                    placeholder="Enter Employee ID"
                    required
                />
                <button type="button" onClick={handleFetchEmployee}>Fetch Employee</button><br/>
                <b>{fetchError && <p className="error">{fetchError}</p>}</b>
            </div>
            {isFetched && (
                <form onSubmit={handleSubmit} className="update-employee-form">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        required
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}

                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label>Password</label>
                    <input
                        type="password"
                        name="passwordHash"
                        value={employee.passwordHash}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                    />
                    {errors.passwordHash && <p className="error">{errors.passwordHash}</p>}

                    <label>Mobile No</label>
                    <input
                        type="text"
                        name="mobileNo"
                        value={employee.mobileNo}
                        onChange={handleChange}
                        placeholder="Enter Mobile No"
                    />

                    <label>Date of Joining</label>
                    <input
                        type="date"
                        name="dateOfJoining"
                        value={employee.dateOfJoining}
                        onChange={handleChange}
                        required
                    />
                    {errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}

                    <label>Project Manager ID</label>
                    <input
                        type="text"
                        name="projectManagerId"
                        value={employee.projectManagerId}
                        onChange={handleChange}
                        placeholder="Enter Project Manager ID"
                    />

                    <label>Status</label>
                    <input
                        type="text"
                        name="employeeStatus"
                        value={employee.employeeStatus}
                        onChange={handleChange}
                        placeholder="Enter Status"
                    />

                    <label>Skill Sets</label>
                    <input
                        type="text"
                        name="skillSets"
                        value={employee.skillSets}
                        onChange={handleChange}
                        placeholder="Enter Skill Sets"
                    />

                    <label>Role ID</label>
                    <input
                        type="text"
                        name="roleId"
                        value={employee.roleId}
                        onChange={handleChange}
                        placeholder="Enter Role ID"
                        required
                    />
                    {errors.roleId && <p className="error">{errors.roleId}</p>}

                    <button type="submit">Update Employee</button>
                </form>
            )}
        </div>
    );
};

export default UpdateEmployee;