import {combineReducers} from "@reduxjs/toolkit";
import {employeeApi} from "./employeeApi.ts";

const rootReducer = combineReducers({
    [employeeApi.reducerPath]: employeeApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;