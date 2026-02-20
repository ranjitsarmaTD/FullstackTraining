import { createAsyncThunk } from "@reduxjs/toolkit";
import leaveBalancejson from '../../mock/leaveBalance.json';
import leaveHistoryjson from '../../mock/leaveHistory.json';
import leaveRequestsjson from '../../mock/leaveRequests.json';
import { loadLeaveBalance, loadLeaveHistory, loadLeaveRequests } from "../../utils/localStorage";

export const fetchLeaveRequests = createAsyncThunk('leave/fetchLeaveRequests', async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const leaveRequests = loadLeaveRequests()

    if(leaveRequests){
        return leaveRequests;
    }
    return leaveRequestsjson;
})

export const fetchLeaveHistory = createAsyncThunk('leave/fetchLeaveHistory', async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const leaveHistory = loadLeaveHistory();
    
    if(leaveHistory){
        return leaveHistory;
    }
    return leaveHistoryjson;
})

export const fetchBalance = createAsyncThunk('leave/fetchBalance', async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    const leaveBalance = loadLeaveBalance();

    if(leaveBalance){
        return leaveBalance;
    }
    return leaveBalancejson;
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

