import React, { useState } from 'react';
import axios from 'axios';
//import './DeleteEmployee.css';
import '../../assets/Styles/EmployeePages/DeleteEmployee.css';
import { Link } from "react-router-dom";

const DeleteEmployee = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setEmployeeId(e.target.value);
        setMessage('');
        setError('');
    };

    const handleDelete = async () => {
        try {
            await axios.delete("https://localhost:44305/api/Employees/${employeeId}");
            setMessage('Employee deleted successfully!');
            setError('');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('Employee not found');
                setMessage('');
            } else {
                setError('Error deleting employee');
                setMessage('');
            }
        }
    };

    return (
        <div className="delete-employee-container">
            <div className="EmployeesHeader">
                 <div className='DeleteEmpHeader'>
                     <h3 style={{color: "red"}}>Delete Employee</h3>
                 </div>
                 <div>
                     <Link to ="/EmployeeDashboard">Back</Link>
                 </div>
             </div>
             <div className="delete-employee">
                <label>Employee ID</label>
                <input
                    type="text"
                    value={employeeId}
                    onChange={handleChange}
                    placeholder="Enter Employee ID"
                    required
                />
                <button type="button" onClick={handleDelete}>Delete Employee</button>
                <b>{message && <p className="message">{message}</p>}
                {error && <p className="error">{error}</p>}</b>
            </div>
        </div>
    );
};

export default DeleteEmployee;
