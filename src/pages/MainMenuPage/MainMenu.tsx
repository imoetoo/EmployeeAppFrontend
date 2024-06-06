import React from "react";
import "./MainMenu.css";
import {useNavigate} from "react-router-dom";
import {EmployeeList} from "../../components/EmployeeList";


const MainMenuPage: React.FC = () => {
  const navigate = useNavigate();

  function navigateHandler(){
    navigate("/add-employee");
  }

  return (
    <div className="main-menu-page">
      <div className="header">
        <h2>Employees</h2>
        <button className="add-employee-button" onClick={navigateHandler}>Add Employee</button>
      </div>
      <div className="employee-list">
        <EmployeeList />
      </div>
    </div>
  );
};

export default MainMenuPage;
