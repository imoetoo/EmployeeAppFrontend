import React, { useState } from "react";
import { useUpdateEmployeeMutation } from "../../store/services/employeeApi.ts";
import { useNavigate,useParams,useLocation} from "react-router-dom";
import {EmployeeForm} from "../../components/EmployeeForm.tsx";
import { validate } from "../AddEmployeePage/validateUserInput.tsx";
import { PopUp } from "../../components/popUp.tsx";

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
  // const [name, setName] = useState(employee.name);
  // const [department, setDepartment] = useState(employee.department);
  // const [salary, setSalary] = useState(employee.salary);
  const [showPopUp, setShowPopUp] = useState(false);
  const [editHandler] = useUpdateEmployeeMutation();
  //use Params retrieves the id number from the URL
  let {id} = useParams<{id:string}>();
  const [errors, setErrors] = useState<{
    name?: string;
    department?: string;
    salary?: string;
  }>({});


  const submitForm = async (userInput:{name:string, salary:number, department:string}) => {
    const validationErrors = validate(userInput);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      editHandler({ data: { id: Number(id), ...userInput } });
      setShowPopUp(true);
    }
  };

  return (
    <div>
    <EmployeeForm submitFunction = {submitForm} errors = {errors} initialValues = {employee} isEdit = {true}/>
      {showPopUp && (
        <PopUp message = {"Employee Changed"} onClose = {() => setShowPopUp(false)}/>
      )}
    </div>
  );
};

