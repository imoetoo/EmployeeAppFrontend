import React from "react";
import { useGetEmployeesQuery } from "../store/services/employeeApi";
import { EmployeeCard } from "./EmployeeCard";
import { Employee } from "../models/Employee";
import "./EmployeeList.css";

export const EmployeeList: React.FC = () => {
const { data, error, isLoading} = useGetEmployeesQuery();

//parse the data to only get the data needed, and remove status, messages
const employees: Employee[] = data?.data || [];



if (isLoading) {
    return <div>Loading...</div>;
}

  if (error) {
    console.log(error);
    if ('message' in error) {
      return <div>Error: {error.message}</div>;
    }
    return <div>An unknown error occurred.</div>;
  }

  if (!employees || employees.length === 0) {
    return <div>No Employees Found</div>;
  }

  return (
    <ul className = "employeeList">
      {employees.map((employee: Employee) => (
        <li key={employee.id} className = "employeeCard">
          <EmployeeCard employee={employee}/>
        </li>
      ))}
    </ul>
  );
};