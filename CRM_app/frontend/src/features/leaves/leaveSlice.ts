import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type LeaveRequest, type LeavesHr } from "./LeaveType";

//type
interface LeaveState {
  leaves: LeaveRequest[];
  leavesHr: LeavesHr[];
}

//initial state of array of leaves
const initialState: LeaveState = {
  leaves: [],
  leavesHr: [],
};

//slice containing the reducers
const LeaveSlice = createSlice({
  name: "Leaves",
  initialState,
  reducers: {
    setLeaves: (state, action: PayloadAction<LeaveRequest[]>) => {
      state.leaves = action.payload;
    },
    setLeavesHr: (state, action: PayloadAction<LeavesHr[]>) => {
      state.leavesHr = action.payload;
    },
    approveLeaveHr: (state, action: PayloadAction<{ id: string }>) => {
      const leave = state.leavesHr.find((l) => l.leaveId === action.payload.id);
      if (leave) {
        leave.status = "approved";
        // leave.approvedBy = action.payload.hrId;
      }
    },

    rejectLeaveHr: (state, action: PayloadAction<{ id: string }>) => {
      const leave = state.leavesHr.find((l) => l.leaveId === action.payload.id);
      if (leave) {
        leave.status = "rejected";
        // leave.approvedBy = action.payload.hrId;
      }
    },
  },
});

export const { setLeaves, setLeavesHr,approveLeaveHr,rejectLeaveHr } = LeaveSlice.actions;
export default LeaveSlice.reducer;
