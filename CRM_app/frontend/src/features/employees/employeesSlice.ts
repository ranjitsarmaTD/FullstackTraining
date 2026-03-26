import { type PayloadAction,createSlice } from "@reduxjs/toolkit";
import type { Employee } from "./employeesType";


type EmployeesState = {
  employees: Employee[];
  filteredEmployees: Employee[];
  selectedEmployee: Employee | null;
};



const initialState: EmployeesState = {
  employees: [],
  filteredEmployees: [],
  selectedEmployee: null,
}

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
      state.filteredEmployees = action.payload; 
    },

    filterEmployees: (state, action: PayloadAction<string>) => {
      const search = action.payload.toLowerCase();

      state.filteredEmployees = state.employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(search) ||
          emp.employeeId.toLowerCase().includes(search)
      );
    },

    setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.selectedEmployee = action.payload;
    },

    
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
      state.filteredEmployees.push(action.payload);
    },

    removeEmployee: (state, action: PayloadAction<string>) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
      state.filteredEmployees = state.filteredEmployees.filter(
        (emp) => emp.id!== action.payload
      );

      if (state.selectedEmployee?.id === action.payload) {
        state.selectedEmployee = null;
      }
    },
  },
});

export const {
  setEmployees,
  filterEmployees,
  setSelectedEmployee,
  addEmployee,
  removeEmployee,
} = employeesSlice.actions;

export default employeesSlice.reducer;