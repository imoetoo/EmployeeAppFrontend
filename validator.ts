import {EmployeeSchema} from '../model/Employee.ts';
import { RequestHandler } from "express";


const validateEmployee :RequestHandler = (req, res, next) => {
    const {error} = EmployeeSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            status: "error",
            message: "Bad request",
            details: error.details,
          });
    }
    next();
};

export default validateEmployee;
