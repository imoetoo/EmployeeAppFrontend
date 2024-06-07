import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee } from "../../models/Employee";

// interface EmployeeState {
//   employees: Employee[];
//   loading: boolean;
//   error: String | null;
// }

// let initialEmployeeState: EmployeeState = {
//   employees: [],
//   loading: false,
//   error: null,
// };

type APIResponse<T> = {
    data: T;
    status: string;
    message: string;
}

type APIPaginationResponse<K> = {
  data: K;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  status: string;
  message: string;
}

// const employeeSlice = createSlice({
//     name: 'employee',
//     initialState: initialEmployeeState,
//     reducers:{
//         //every reducer function in Redux has access to both 'state' and 'action'
//         setLoading(state, action: PayloadAction<boolean>){
//             state.loading = action.payload;
//         },
//         setEmployees(state, action: PayloadAction<Employee[]>){
//             state.employees = action.payload;
//         },
//         setError(state, action: PayloadAction<string|null>){
//             state.error = action.payload;
//         }

//     }

// })

//providesTags refreshes the data in the cache when the mutation is called, to properly refresh the page upon changes

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    //expected response is an array of Employee objects. The 2nd parameter is for argument passed to query function. The query does not take any arguments(just fetching) so use void to indicate no params needed
    getEmployees: builder.query<APIPaginationResponse<Employee[]>, {page:number}>({
      query: ({page}) => `employees?page=${page}`,
      providesTags:['Employees']
    }),
    //first argument is the expected return type, the 2nd is the parameter types inputted
    getEmployee: builder.query<APIResponse<Employee>, number>({
        query: (id) => `employees/${id}`,
    }),
    //expected response is ONE Employee object. argument passed to mutation function is a partial Employee object, which allows for providing some or all properties of the 'employee' interface when creating a new employee
    //Omit ensures the id field is excluded from the data object passed to the addEmployee mutation
    addEmployee: builder.mutation<APIResponse<Employee>, {data: Employee}>({
      query: ({data}) => ({
        url: `employees`,
        method: "POST",
        body: data,
      }),
      invalidatesTags:['Employees'],
    }),
    updateEmployee: builder.mutation<APIResponse<Employee>, {data: Employee}>({
      query: ({data }) => ({
        url: `employees/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags:['Employees'],
    }),
    deleteEmployee: builder.mutation<Employee, number>({
      query: (id) => ({
        url: `employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['Employees'],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
