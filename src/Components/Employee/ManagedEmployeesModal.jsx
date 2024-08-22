import React from "react";

const ManagedEmployeesModal = ({ managerName, employees, onClose }) => {
  console.log(managerName, "============>");
  return (
    <div className="ManagedEmployeesModal">
      <div className="ManagedEmployeesModalCntnt">
        <div className="EmpDetailsHeader">
          <p className="ManagedEmployeesMdlHeader">
            Please Unassign <span className="ManagerName">{managerName}</span>{" "}
            as Project Manager from the employees below to deactivate.
          </p>
          <button className="EmpBackBtn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="PMEmpTable">
          <table>
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Employee ID</th>
                <th>Full Name</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.employeeId}</td>
                  <td>
                    {emp.firstName} {emp.lastName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagedEmployeesModal;
