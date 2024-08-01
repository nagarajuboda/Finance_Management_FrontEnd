import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddRoleModal = ({ role, onClose, onRefresh }) => {
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
    <div className="Rolesmodal-overlay">
      <div className="Rolesmodal-content">
        <div className='RolesModelSubHeader'>
          <div className='RolesModelSubHeaderLeft'>
            <h2>{role ? 'Edit Role' : 'Add Role'}</h2>
          </div>
          <div className='RolesModelSubHeaderRightDivClose'>
            <button className="RolesModelclose-btn" onClick={onClose}>Close</button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='RolesContainer'>
            <div className='RolesRow'>
              <div className='Roleslabel'>
                Role Name:
              </div>
              <div className='Rolesvalue'>
                <input type="Rolestext" name="name" value={formData.name} onChange={handleChange} required />
              </div>
            </div>
            <div className='RolesRow'>
              <div className='Roleslabel'>
                Priority:
              </div>
              <div className='Rolesvalue'>
                <input type="number" className='RolesModelPriority' name="priority"
                  value={formData.priority} onChange={handleChange} min="1"required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="RolesModelsave-btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddRoleModal;