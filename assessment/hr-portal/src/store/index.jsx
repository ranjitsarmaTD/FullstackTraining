import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from './slices/employeeSlice'
import leaveReducer from './slices/leavesSlice'

export const store = configureStore({
    reducer: {
        employees : employeesReducer,
        leave: leaveReducer
    }
})