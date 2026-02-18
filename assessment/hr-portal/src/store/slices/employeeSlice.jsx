import { createSlice } from "@reduxjs/toolkit";
import { addEmployees, deleteEmployees, fetchEmployees, updateEmployees } from "../thunks/employeeThunks";
import { setEmployees } from "../../utils/localStorage";

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchEmployees.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchEmployees.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            setEmployees(state.data);
        })
        .addCase(fetchEmployees.rejected, (state) => {
            state.error = "Failed to fetch";
            state.loading = false;
        })

        .addCase(addEmployees.fulfilled, (state, action) => {
            state.data.push(action.payload);
            setEmployees(state.data);
        })

        .addCase(updateEmployees.fulfilled, (state, action) => {
            const index = state.data.findIndex(
                emp => emp.id == action.payload.id
            )
            if(index !== -1){
                state.data[index] = action.payload
                setEmployees(state.data);
            }
        })

        .addCase(deleteEmployees.fulfilled, (state, action) => {
            state.data = state.data.filter(
                emp => emp.id !== action.payload.id
            )
            setEmployees(state.data);
        })
    }
})

export default employeesSlice.reducer;