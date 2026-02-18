import { createAsyncThunk } from "@reduxjs/toolkit";
import employees from '../../mock/employees.json'

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {

    await new Promise(resolve => setTimeout(resolve, 800));
    return employees;
})

export const addEmployees = createAsyncThunk('employees/addEmployees', async (employee) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return employee;
})

export const updateEmployees = createAsyncThunk('employees/updateEmployees', async (employee) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return employee;
})

export const deleteEmployees = createAsyncThunk('employees/deleteEmployees', async (employee) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return employee;
})