import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from './slices/employeeSlice'
import leaveReducer from './slices/leavesSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        employees : employeesReducer,
        leave: leaveReducer,
        auth: authReducer
    }
})