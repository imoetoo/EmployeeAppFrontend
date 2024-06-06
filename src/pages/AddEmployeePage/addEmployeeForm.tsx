import React, { useState } from "react";
import { useAddEmployeeMutation } from "../../store/services/employeeApi.ts";
import { useNavigate } from "react-router-dom";
import "./addEmployeeForm.css";

export const AddEmployeeForm: React.FC = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState(0);
  const [submitHandler] = useAddEmployeeMutation();
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault(); //prevents triggering the default behaviour of the form
          //   const data = {name,salary,department};
          submitHandler({ data: { name, salary, department } });
        }}
      >
        <div className = "form-input">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className = "form-input">
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="" disabled hidden>
              Choose the Department
            </option>
            <option value="HR">HR</option>
            <option value="PS">PS</option>
          </select>
        </div>
        <div className = "form-input">
          <input
            type="text"
            placeholder="salary"
            value={salary}
            onChange={(e) => setSalary(+e.target.value)}
          />
        </div>

        <button type="submit" onClick={() => setShowPopUp(true)}>
          Add Employee
        </button>
      </form>
      {showPopUp && (
        <div className="popup">
          <div>Employee Added</div>
          <button
            onClick={() => {
              setShowPopUp(false);
              navigate("/");
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
