import React, { useState, useEffect } from 'react';
import '../../assets/Styles/EmployeePages/AddEmpStyle.css';
import axios from "axios";
import { Link } from "react-router-dom";

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
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [projectManagers, setProjectManagers] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("https://localhost:44305/api/Employees");
                setEmployees(response.data);
                const managers = response.data.filter(emp => emp.roleName === 'Project Manager');
                setProjectManagers(managers);
            } catch (error) {
                console.error('Error fetching employees', error);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await axios.get("https://localhost:44305/api/Roles");
                const sortedRoles = response.data.sort((a, b) => a.name.localeCompare(b.name));
                setRoles(sortedRoles);
            } catch (error) {
                console.error('Error fetching roles', error);
            }
        };

        fetchEmployees();
        fetchRoles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!employee.employeeId) newErrors.employeeId = 'Employee ID is required';
        if (!employee.firstName) newErrors.firstName = 'First Name is required';
        if (!employee.email) newErrors.email = 'Email is required';
        if (!employee.password) newErrors.password = 'Password is required';
        if (!employee.dateOfJoining) newErrors.dateOfJoining = 'Date of Joining is required';
        if (!employee.roleName) newErrors.roleName = 'Role Name is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const idExists = employees.some(emp => emp.employeeId === employee.employeeId);
        if (idExists) {
            setErrors(prevErrors => ({
                ...prevErrors,
                employeeId: 'Employee ID already exists'
            }));
            return; 
        }

        const formattedDate = new Date(employee.dateOfJoining).toISOString();
        employee.dateOfJoining = formattedDate;

        const selectedRole = roles.find(role => role.name === employee.roleName);
        if (selectedRole) {
            employee.roleId = selectedRole.id;
        }

        if (!employee.projectManagerName) {
            employee.projectManagerName = null;
        }

        try {
            await axios.post("https://localhost:44305/api/Employees", employee);
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
                />
                {errors.employeeId && <p className="error">{errors.employeeId}</p>}

                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={employee.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
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
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={employee.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
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
                />
                {errors.dateOfJoining && <p className="error">{errors.dateOfJoining}</p>}

                <label>Project Manager</label>
                <select
                    name="projectManagerName"
                    value={employee.projectManagerName}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select Project Manager</option>
                    {projectManagers.map((emp) => (
                        <option key={emp.id} value={`${emp.firstName} ${emp.lastName}`}>
                            {`${emp.firstName} ${emp.lastName}`}
                        </option>
                    ))}
                </select>

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

                <label>Role</label>
                <select
                    name="roleName"
                    value={employee.roleName}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select Role</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                </select>
                {errors.roleName && <p className="error">{errors.roleName}</p>}

                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;