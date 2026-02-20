import { createSlice } from "@reduxjs/toolkit";
import { applyLeave, approveLeave, fetchBalance, fetchLeaveHistory, fetchLeaveRequests, rejectLeave } from "../thunks/leaveThunk";
import { setLeaveRequests, setLeaveHistory, setLeaveBalance } from "../../utils/localStorage";

const LeavesSlice = createSlice({
    name: 'leave',
    initialState: {
        balance: [],
        requests: [],
        leaveHistory: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchLeaveRequests.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchLeaveRequests.fulfilled, (state, action) => {
            state.requests = action.payload;
            state.loading = false;
        })
        .addCase(fetchLeaveRequests.rejected, (state) => {
            state.error = "Failed to fetch";
            state.loading = false;
        })

        .addCase(fetchLeaveHistory.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchLeaveHistory.fulfilled, (state, action) => {
            state.leaveHistory = action.payload;
            state.loading = false;
        })
        .addCase(fetchLeaveHistory.rejected, (state) => {
            state.error = "Failed to fetch";
            state.loading = false;
        })

        .addCase(fetchBalance.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchBalance.fulfilled, (state, action) => {
            state.balance = action.payload;
            state.loading = false;
        })
        .addCase(fetchBalance.rejected, (state) => {
            state.error = "Failed to fetch";
            state.loading = false;
        })

        .addCase(applyLeave.fulfilled, (state, action) => {
            state.requests.push(action.payload);
            setLeaveRequests(state.requests);
        })

        .addCase(approveLeave.fulfilled, (state, action) => {
            state.leaveHistory.push({
                ...action.payload,
                status: 'Approved'
            });
            const request = state.requests.find((req) => req.id == action.payload.id)
            if(request){
                request.status = 'Approved'
            }
            const leave = state.balance.find((leave) => leave.leaveType == action.payload.leaveType)
            if(leave){
                leave.used = leave.used + action.payload.days
                leave.remaining = leave.remaining - action.payload.days
            }
            setLeaveRequests(state.requests)
            setLeaveHistory(state.leaveHistory)
            setLeaveBalance(state.balance)
        })

        .addCase(rejectLeave.fulfilled, (state, action) => {
            state.requests = action.payload
        })
    }
})

export default LeavesSlice.reducer;