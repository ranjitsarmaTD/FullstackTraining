import {configureStore} from "@reduxjs/toolkit";
import leavesReducer from "../features/leaves/leaveSlice";
import leavesBalanceReducer from "../features/leaves/leaveBalanceSlice";
import employeesReducer from "../features/employees/employeesSlice"
import salaryReducer from "../features/salary/salarySlice"

export const store =configureStore({
    reducer:{
        leavesReducer: leavesReducer,
        leavesBalanceReducer:leavesBalanceReducer,
        employeesReducer:employeesReducer,
        salaryReducer:salaryReducer
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
