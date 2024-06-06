import React, { useState } from "react";
import { useUpdateEmployeeMutation } from "../../store/services/employeeApi.ts";
import { useNavigate,useParams} from "react-router-dom";
import "./addEmployeeForm.css";


export const EditEmployeePage: React.FC = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  const [editHandler] = useUpdateEmployeeMutation();
  let {id} = useParams<{id:string}>();


  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault(); //prevents triggering the default behaviour of the form
          editHandler({ data: { id: Number(id), name, salary, department } });
        }}
      >
        <div className="form-input">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-input">
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
        <div className="form-input">
          <input
            type="text"
            placeholder="salary"
            value={salary}
            onChange={(e) => setSalary(+e.target.value)}
          />
        </div>

        <button type="submit" onClick={() => setShowPopUp(true)}>
          Update Employee
        </button>
      </form>
      {showPopUp && (
        <div className="popup">
          <div>Employee Changed</div>
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

