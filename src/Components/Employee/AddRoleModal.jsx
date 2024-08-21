import React, { useState, useEffect } from "react";
import axios from "axios";

const AddRoleModal = ({ role, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    priority: "1",
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44305/api/Roles/AllRoles"
        );
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles", error);
      }
    };

    fetchRoles();

    if (role) {
      setFormData(role);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        priority: "1",
      }));
    }
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "name") {
      checkRoleName(value);
    }
  };

  const checkRoleName = (name) => {
    const roleNameExists = roles.some(
      (r) =>
        r.name.toLowerCase() === name.toLowerCase() &&
        (!role || r.id !== role.id)
    );
    if (roleNameExists) {
      setError("Role name already exists");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      return; // Prevent form submission if there is an error
    }

    try {
      if (role == null) {
        await axios.post(
          "https://localhost:44305/api/Roles/CreateRole",
          formData
        );
      } else {
        await axios.put(
          "https://localhost:44305/api/Roles/UpdateRole",
          formData
        );
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Error saving role", error);
    }
  };

  return (
    <div className="RolesModelContainer">
      <div className="RolesModelContent">
        <div className="RolesModelSubHeader">
          <div className="RolesModelSubHeaderLeft">
            <h2>{role ? "Edit Role" : "Add Role"}</h2>
          </div>
          <div className="RolesModelSubHeaderRight">
            <button
              className="RolesModelSubHeaderRightCloseBtn"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="RolesContainer">
            <div className="RolesRow">
              <div className="Roleslabel">Role Name:</div>
              <div className="Rolesvalue">
                <input
                  type="Rolestext"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="RolesRow">
              <div className="Roleslabel">Priority:</div>
              <div className="Rolesvalue">
                <select
                  name="priority"
                  className="RolesModelPriority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="1">High</option>
                  <option value="2">Medium</option>
                  <option value="3">Low</option>
                </select>
              </div>
            </div>
            {error && <div className="RolesError">{error}</div>}
          </div>
          <button
            type="submit"
            className="RolesModelSaveBtn"
            disabled={!!error}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoleModal;
