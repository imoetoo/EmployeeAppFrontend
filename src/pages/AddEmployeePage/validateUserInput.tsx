
type Errors={
    name?:string;
    salary?:string;
    department?:string;
}

type userInput = {
    name?:string;
    salary?:number;
    department?:string;
}


export const validate = (values:userInput) =>{
    const newErrors:Errors = {};
    if(!values.name){
        newErrors.name = "Name is required";
    }
    else if(values.name.length < 4){
        newErrors.name = "Name should be atleast 4 characters long";
    }
    else if (values.name.length > 30){
        newErrors.name = "Name should be less than or equals 30 characters long";
    }
    if(!values.salary){
        newErrors.salary = "Salary is required";
    }
    else if(values.salary < 0){
        newErrors.salary = "Salary should be a positive value";
    }
    if(!values.department){
        newErrors.department = "Department is required";
    }
    return newErrors;
}