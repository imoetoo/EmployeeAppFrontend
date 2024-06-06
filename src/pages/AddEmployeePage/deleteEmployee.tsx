import React from 'react';
import { useDeleteEmployeeMutation } from '../../store/services/employeeApi.ts';
import './addEmployeeForm.css'

interface DeleteEmployeePopUpProps {
  employeeId: number;
  onClose: () => void;
}

export const DeleteEmployeePopUp: React.FC<DeleteEmployeePopUpProps> = ({ employeeId, onClose }) => {
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const handleDelete = async () => {
    await deleteEmployee(employeeId);
    onClose(); // Close the popup after deletion
  };

  return (
    <div className="popup">
      <div>Are you sure you want to delete this employee?</div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};
