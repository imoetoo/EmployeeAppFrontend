import React, {useState, useEffect} from "react";
import "./MainMenu.css";
import {useNavigate,useLocation} from "react-router-dom";
import {EmployeeList} from "../../components/EmployeeList";

/*
The useNavigate() hook can help trigger a navigation event 
from within a component. In other words, the useNavigate() hook 
allows you to programmatically navigate to a different URL 
within a functional component.

useParams() is a hook from React Router that returns an object,
that allows access to the URL parameters of a Route.

useLocation() is a hook from React Router that returns the
location object representing the current URL.
eg:
https://www.example.com/?key1=value1&key2=value2#section1

location object: 3 parameters, pathname, search and hash. If you want, u can also have a state parameter
location ={
  pathname: "/",
  search: "?key1=value1&key2=value2",
  hash: "#section1",
  state : passed from navigate function: look at employeeCard.tsx for more details
}
  This means that location.search will give the value of "?key1=value1&key2=value2"
*/


const MainMenuPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get("page"); //this gets the value of page. if url is http://localhost:3001/search?page=2 then this returns 2
  const [page,setPage] = useState(pageParam ? +pageParam : 1);


  function navigateHandler(){
    navigate("/add-employee");
  }

  //useEffect is a hook that runs side effects in function components, re-rendering
  //whenever there are changes in the URL query parameters
  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get("page");
    setPage(pageParam ? +pageParam : 1);
  },[location.search]);



  function pageChangeHandler(newPage:number){
    setPage(newPage);
    navigate(`/search?page=${newPage}`);
  };

  //Navigates to the previous page if the number of employees after deletion is 0
  function setEmployeeCount(count:number){
    if(count === 0){
      const newPage = Math.max(1,page-1);
      navigate(`/search?page=${newPage}`);
    }
  }

  return (
    <div className="main-menu-page">
      <div className="header">
        <h2>Employees</h2>
        <button className="add-employee-button" onClick={navigateHandler}>Add Employee</button>
      </div>
      <div className="employee-list">
        <EmployeeList currentPage={page} onPageChange = {pageChangeHandler} onEmployeeCountChange= {setEmployeeCount}/>
      </div>
    </div>
  );
};

export default MainMenuPage;
