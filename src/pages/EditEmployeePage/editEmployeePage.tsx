import React, { useState } from "react";
import { useUpdateEmployeeMutation } from "../../store/services/employeeApi.ts";
import { useNavigate,useParams,useLocation} from "react-router-dom";


export const EditEmployeePage: React.FC = () => {
  //useLocation fetches the employee data from employeeCard component, which is passed as a prop to the EditEmployeePage component
  const location = useLocation();
  //destructuring the employee object from the state parameter
  let {employee} = location.state;
  /*
  if employee is NOT destructured, it will look like such:
  {
  employee: {
    id: ...,
    name: ...,
    salary: ...,
    department: ...
    }
  }
  */

  const navigate = useNavigate();
  const [name, setName] = useState(employee.name);
  const [department, setDepartment] = useState(employee.department);
  const [salary, setSalary] = useState(employee.salary);
  const [showPopUp, setShowPopUp] = useState(false);
  const [editHandler] = useUpdateEmployeeMutation();
  //use Params retrieves the id number from the URL
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
            placeholder= "name"
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

