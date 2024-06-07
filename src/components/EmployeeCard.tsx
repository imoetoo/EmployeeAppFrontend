import React, { useState } from "react";
import { Employee } from "../models/Employee.ts";
import { useNavigate } from "react-router-dom";
import { DeleteEmployeePopUp } from "../pages/deleteEmployeePage/deleteEmployeePage.tsx";

interface EmployeeCardProps {
  employee: Employee;
}

//just use React.FC for JS function components
//the prop passed in this case is the employee object prop
export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const navigate = useNavigate();
  const navigateUpdateHandler = () => {
    navigate(`/update-employee/${employee.id}`);
  };
  const [showPopUp, setShowPopUp] = useState(false);

  const deleteHandler = () => {
    setShowPopUp(true);
  };

  return (
    <div className="employeeCard">
      <div>
        <h3>{employee.name}</h3>
        <p>{employee.department}</p>
        <p>{employee.salary}</p>
      </div>
      <div>
        {!showPopUp && (
          <div>
            <button onClick={navigateUpdateHandler}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        )}
        {showPopUp && <DeleteEmployeePopUp employeeId = {employee.id!} onClose = {()=>setShowPopUp(false)}/>}
      </div>
    </div>
  );
};
