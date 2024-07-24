import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import '../../assets/Styles/EmployeePages/Modal.css';

const RoleModal = ({ role, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: '',
    priority: '1' 
  });

  useEffect(() => {
    if (role) {
      setFormData(role);
    } else {
      setFormData(prevData => ({
        ...prevData,
        priority: '1'
      }));
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role==null) {
        await axios.post('https://localhost:44305/api/Roles/CreateRole', formData);
      } else {
        await axios.put("https://localhost:44305/api/Roles/UpdateRole", formData);
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error saving role', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className='SubHeader'>
          <div className='SubHeaderLeft'><h2>{role ? 'Edit Role' : 'Add Role'}</h2></div>
          <div className='SubHeaderRightDivClose'><button className="close-btn" onClick={onClose}>Close</button></div>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Role Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Priority:
            <input
              type="number"
              className='Priority'
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              min="1"
              required
            />
          </label>
          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;