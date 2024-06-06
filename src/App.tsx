// can omit in newer react files : import React from 'react';
import "./App.css";
import React from "react";
import MainMenuPage from "./pages/MainMenuPage/MainMenu.tsx";
import { Router, Routes, Route, Navigate } from "react-router-dom";
import { AddEmployeeForm } from "./pages/AddEmployeePage/addEmployeeForm.tsx";
import { EditEmployeePage } from "./pages/AddEmployeePage/editEmployeePage.tsx";
/*

The line <Route path="/" element={<Navigate to="/search?page=1" replace />} /> in the React Router configuration is used to automatically redirect users from the root URL (i.e., http://localhost:3001/) to another URL with query parameters (http://localhost:3001/search?page=1).
*/
//Navigate is a React Router component used to navigate to a different location in the application. The to prop specifies the URL to navigate to.
//The replace prop specifies whether the current URL should be replaced in the history stack instead of adding a new entry.
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/search?page=1" replace />} />
        <Route path="/search" element={<MainMenuPage />} />
        <Route path="/add-employee" element={<AddEmployeeForm />} />
        <Route path="/update-employee/:id" element={<EditEmployeePage />} />
      </Routes>
    </div>
  );
}

export default App;
