import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoleModal from './RoleModal';
import { Link } from "react-router-dom";
import '../../assets/Styles/EmployeePages/Roles.css';
import ConfirmationModal from './DeleteConfirmationModal';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://localhost:44305/api/Roles');
      const sortedRoles = response.data.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return a.priority - b.priority;
      });
      setRoles(sortedRoles);
    } catch (error) {
      console.error('Error fetching roles', error);
    }
  };

  const handleEdit = (role) => {
    setCurrentRole(role);
    setShowModal(true);
  };

  const handleDelete = (role) => {
    setRoleToDelete(role);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (roleToDelete) {
        await axios.delete(`https://localhost:44305/api/Roles/${roleToDelete.id}`);
        fetchRoles();
      }
      setShowConfirmModal(false);
      setRoleToDelete(null);
    } catch (error) {
      console.error('Error deleting role', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setRoleToDelete(null);
  };

  return (
    <div className="role-list">
      <h1>Role List</h1>
      <div className='SubHeader'>
        <div className='SubHeaderLeft'>
          <button className="add-btn" onClick={() => { setCurrentRole(null); setShowModal(true); }}>Add Role</button>
        </div>
        <div className='SubHeaderRight'>
          <Link to="/EmployeeDashboard"><a>Employees Dashboard</a></Link>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.priority}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(role)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(role)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && <RoleModal role={currentRole} onClose={() => setShowModal(false)} onRefresh={fetchRoles} />}
      {showConfirmModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete the role "${roleToDelete?.name}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default Roles;
