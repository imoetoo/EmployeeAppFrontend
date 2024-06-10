import React, { useEffect } from "react";
import { useGetEmployeesQuery } from "../store/services/employeeApi";
import { EmployeeCard } from "./employeeCard";
import { Employee } from "../models/Employee";
import "./EmployeeList.css";

interface EmployeeListProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  onEmployeeCountChange: (count: number) => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({
  currentPage,
  onPageChange,
  onEmployeeCountChange,
}) => {
  const { data, error, isLoading } = useGetEmployeesQuery({
    page: currentPage,
  });

  //Pagination information:
  //parse the data to only get the data needed, and remove status, messages
  const employees: Employee[] = data?.data || [];
  const totalPages = data?.totalPages || 1; //default to 1 if no totalPages is returned
  const totalEmployees = data?.totalItems || 0;
  const itemsPerPage = 10;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalEmployees);

  //To allow main menu page to know the number of employees on the page, to redirect to tthe previous page if number of employees is 0
  useEffect(() => {
    onEmployeeCountChange(employees.length);
  }, [employees.length,]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    if ("message" in error) {
      return <div>Error: {error.message}</div>;
    }
    return <div>An unknown error occurred.</div>;
  }

  if (!employees || employees.length === 0) {
    return <div>No Employees Found</div>;
  }

  return (
    <div>
      <ul className="employeeList">
        {employees.map((employee: Employee) => (
          <li key={employee.id} className="employeeCard">
            <EmployeeCard employee={employee} />
          </li>
        ))}
      </ul>
      <div className="paginator-container">
        <span className="pagniator-text">
          <span>
            Showing {startItem} - {endItem} out of {totalEmployees} entries
          </span>
        </span>
        <span className="paginator">
          <button
            className="previous-button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            className="next-button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </span>
      </div>
    </div>
  );
};
