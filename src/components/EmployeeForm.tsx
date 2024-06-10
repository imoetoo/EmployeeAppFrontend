import React, { useState } from "react";

interface EmployeeFormProps {
    submitFunction:(userInput: {name: string, department: string, salary: number})=>void;
    errors:{
        name?: string;
        department?: string;
        salary?: string;
    };
    initialValues?:{name:string, department:string, salary:number};
    isEdit: boolean;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({submitFunction,errors,initialValues,isEdit}) => {
  const [name, setName] = useState(initialValues?.name || "");
  const [department, setDepartment] = useState(initialValues?.department ||"");
  const [salary, setSalary] = useState(initialValues?.salary || 0);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitFunction({name, department, salary});
  }

  return (
    <form onSubmit = {handleSubmit}>
      <div>
        <div className="form-input">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="error">{errors.name}</div>}
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
          {errors.department && (
            <div className="error">{errors.department}</div>
          )}
        </div>
        <div className="form-input">
          <input
            type="text"
            placeholder="salary"
            value={salary}
            onChange={(e) => setSalary(+e.target.value)}
          />
          {errors.salary && <div className="error">{errors.salary}</div>}
        </div>
        {isEdit && <button type="submit">Update Employee</button>}
        {!isEdit && <button type="submit">Add Employee</button>}
      </div>
    </form>
  );
};
