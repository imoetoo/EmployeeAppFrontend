// can omit in newer react files : import React from 'react';
import "./App.css";
import React from 'react';
import MainMenuPage from './pages/MainMenuPage/MainMenu.tsx';    
import {Router,Routes,Route} from "react-router-dom";
import {AddEmployeeForm} from "./pages/AddEmployeePage/addEmployeeForm.tsx";
import { EditEmployeePage } from "./pages/AddEmployeePage/editEmployeePage.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainMenuPage />} />
        <Route path="/add-employee" element={<AddEmployeeForm />} />
        <Route path = "/update-employee/:id" element = {<EditEmployeePage/>} />
      </Routes>
    </div>

  );
}

export default App;
