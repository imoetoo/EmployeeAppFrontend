import React, { useState } from "react";
import { useAddEmployeeMutation } from "../../store/services/employeeApi.ts";
import { useNavigate } from "react-router-dom";
import "./addEmployeeForm.css";
import {validate} from "./validateUserInput.tsx"

export const AddEmployeeForm: React.FC = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState(0);
  const [submitHandler] = useAddEmployeeMutation();
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{name?:string, department?:string, salary?:string}>({});

  const submitForm = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInput = { name, salary, department };
    // submitHandler({ data: { name, salary, department } });
    const validationErrors = validate(userInput);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }else{
      submitHandler({data: {...userInput}});
      setShowPopUp(true);
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={submitForm}>
        <div className = "form-input">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="error">{errors.name}</div>}
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
          {errors.department && <div className="error">{errors.department}</div>}
        </div>
        <div className = "form-input">
          <input
            type="text"
            placeholder="salary"
            value={salary}
            onChange={(e) => setSalary(+e.target.value)}
          />
          {errors.salary && <div className="error">{errors.salary}</div>}
        </div>

        <button type="submit">
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
