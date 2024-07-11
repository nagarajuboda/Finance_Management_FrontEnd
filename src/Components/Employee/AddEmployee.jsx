import React, { useState } from 'react';
import '../../assets/Styles/EmployeePages/AddEmpStyle.css';
import axios from "axios";
import { Link } from "react-router-dom";

const AddEmployee = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value
        }));
    };

    const validate = () => {
        let errors = {};

        if (!employee.employeeId) errors.employeeId = 'Employee ID is required';
        if (!employee.firstName) errors.firstName = 'First Name is required';
        if (!employee.email) errors.email = 'Email is required';
        if (!employee.passwordHash) errors.passwordHash = 'Password is required';
        if (!employee.dateOfJoining) errors.dateOfJoining = 'Date of Joining is required';
        if (!employee.roleId) errors.roleId = 'Role ID is required';

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('https://localhost:44305/api/Employees', employee);
            alert('Employee added successfully!');
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
        } catch (error) {
            console.error('Error adding employee', error);
            alert('Error adding employee');
        }
    };

    return (
        <div className="add-employee-container">
            <div className="EmployeesHeader">
                 <div className='AddEmpHeader'>
                     <h3 style={{color: "red"}}>Add Employee</h3>
                 </div>
                 <div>
                     <Link to ="/EmployeeDashboard">Back</Link>
                 </div>
             </div>
            <form onSubmit={handleSubmit} className="add-employee-form">
                <label>Employee ID</label>
                <input
                    type="text"
                    name="employeeId"
                    value={employee.employeeId}
                    onChange={handleChange}
                    placeholder="Enter Employee ID"
                />
                {errors.employeeId && <div className="error">{errors.employeeId}</div>}

                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={employee.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                />
                {errors.firstName && <div className="error">{errors.firstName}</div>}

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
                />
                {errors.email && <div className="error">{errors.email}</div>}

                <label>Password</label>
                <input
                    type="password"
                    name="passwordHash"
                    value={employee.passwordHash}
                    onChange={handleChange}
                    placeholder="Enter Password"
                />
                {errors.passwordHash && <div className="error">{errors.passwordHash}</div>}

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
                />
                {errors.dateOfJoining && <div className="error">{errors.dateOfJoining}</div>}

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
                />
                {errors.roleId && <div className="error">{errors.roleId}</div>}

                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;