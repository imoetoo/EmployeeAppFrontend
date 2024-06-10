import React, { useState } from "react";
import { useAddEmployeeMutation } from "../../store/services/employeeApi.ts";
import "./addEmployeeForm.css";
import { validate } from "./validateUserInput.tsx";
import { EmployeeForm } from "../../components/EmployeeForm.tsx";
import { PopUp } from "../../components/popUp.tsx";

export const AddEmployeeForm: React.FC = () => {
  const [submitHandler] = useAddEmployeeMutation();
  const [showPopUp, setShowPopUp] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    department?: string;
    salary?: string;
  }>({});

  const employeeValues = async (userInput:{name:string; salary:number; department:string;}) => {
    const validationErrors = validate(userInput);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      submitHandler({ data: { ...userInput } });
      setShowPopUp(true);
    }
  };

  return (
    <div className="form-container">
      <EmployeeForm userInputValues={employeeValues} errors={errors} isEdit = {false}/>
      {showPopUp && (
        <PopUp message = {"Employee Added"} onClose = {() => setShowPopUp(false)}/>
      )}
    </div>
  );
};
