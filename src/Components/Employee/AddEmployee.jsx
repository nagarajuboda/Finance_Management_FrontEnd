import React, { useState } from 'react';
import '../../assets/Styles/EmployeePages/AddEmpStyle.css';
import axios from "axios";
import { Link } from "react-router-dom";
//const response = await axios.post("https://localhost:44305/api/Employees", employee);
const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNo: '',
        dateOfJoining: '',
        projectManagerName: '',
        employeeStatus: '',
        skillSets: '',
        roleId: '',
        roleName: ''
    });

    const [errors, setErrors] = useState({});

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
        if (!employee.employeeId) newErrors.employeeId = 'Employee ID is required';
        if (!employee.firstName) newErrors.firstName = 'First Name is required';
        if (!employee.email) newErrors.email = 'Email is required';
        if (!employee.password) newErrors.password = 'Password is required';
        if (!employee.dateOfJoining) newErrors.dateOfJoining = 'Date of Joining is required';
        if (!employee.roleId) newErrors.roleId = 'Role ID is required';
        return newErrors;
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
                password: '',
                mobileNo: '',
                dateOfJoining: '',
                projectManagerName: '',
                employeeStatus: '',
                skillSets: '',
                roleId: '',
                roleName: ''
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
                    required
                />
                {errors.employeeId && <p className="error">{errors.employeeId}</p>}

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
                    name="password"
                    value={employee.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                />
                {errors.password && <p className="error">{errors.password}</p>}

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
                    type="datetime-local"
                    name="dateOfJoining"
                    value={employee.dateOfJoining}
                    onChange={handleChange}
                    required
                />
                {errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}

                <label>Project Manager Name</label>
                <input
                    type="text"
                    name="projectManagerName"
                    value={employee.projectManagerName}
                    onChange={handleChange}
                    placeholder="Enter Project Manager Name"
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

                <label>Role Name</label>
                <input
                    type="text"
                    name="roleName"
                    value={employee.roleName}
                    onChange={handleChange}
                    placeholder="Enter Role Name"
                />
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;