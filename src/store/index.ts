import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./services/rootReducer";
import { employeeApi } from "./services/employeeApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware),
});

export default store;
