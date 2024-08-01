import React from 'react';
import '../../assets/Styles/EmployeePages/DeleteConfirmationEmpModal.css';

const DeleteConfirmationEmpModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="DelModalOverlay">
      <div className="DelModalContent">
        <p>{message}</p>
        <div className="DelModalbtn">
          <button className="DenConfirmBtn" onClick={onConfirm}>Yes</button>
          <button className="DelCancelBtn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationEmpModal;
