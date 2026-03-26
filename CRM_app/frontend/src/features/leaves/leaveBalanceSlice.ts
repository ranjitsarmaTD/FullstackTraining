import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LeavesType } from "./LeaveType";






interface LeaveBalanceState {
  balance: LeavesType | null;
}

const initialState: LeaveBalanceState = {
  balance: null,
};

const leaveBalanceSlice = createSlice({
  name: "leaveBalance",
  initialState,
  reducers: {
    setLeaveBalance: (state, action: PayloadAction<LeavesType | null>) => {
      state.balance = action.payload;
      // console.log("Leave balance set in state: ", state.balance);

    }
  },
});

export const { setLeaveBalance } = leaveBalanceSlice.actions;

export default leaveBalanceSlice.reducer;