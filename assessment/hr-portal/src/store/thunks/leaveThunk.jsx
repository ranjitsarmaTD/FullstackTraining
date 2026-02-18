import { createAsyncThunk } from "@reduxjs/toolkit";
import leaveBalance from '../../mock/leaveBalance.json';
import { loadLeaveHistory, loadLeaveRequests } from "../../utils/localStorage";

export const fetchLeaveRequests = createAsyncThunk('leave/fetchLeaveRequests', async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const leaveRequests = loadLeaveRequests()

    return leaveRequests;
})

export const fetchLeaveHistory = createAsyncThunk('leave/fetchLeaveHistory', async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const leaveHistory = loadLeaveHistory();
    
    return leaveHistory;
})

export const fetchBalance = createAsyncThunk('leave/fetchBalance', async () => {
    await new Promise(resolve => setTimeout(resolve, 800))

    return leaveBalance;
})

export const applyLeave = createAsyncThunk('leave/applyLeave', async (leave) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    return leave;
})

export const approveLeave = createAsyncThunk('leave/approveLeave', async (leave) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    console.log(leave);
    
    return leave;
})

export const rejectLeave = createAsyncThunk('leave/rejectLeave', async (employee) => {
    await new Promise(resolve => setTimeout(resolve, 800))

    return employee;
})

