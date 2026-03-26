import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MySalary, Salary } from "./salaryTypes";

interface SalaryState {
  mySalaries: MySalary|null;
  allSalaries: Salary[];

  loading: boolean;
  error: string | null;
}

const initialState: SalaryState = {
  mySalaries: null,
  allSalaries: [],
  loading: false,
  error: null,
};

const salarySlice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    setSalaryStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    setMySalarySuccess: (state, action: PayloadAction<MySalary|null>) => {
      state.loading = false;
      state.mySalaries = action.payload;
    },

    setAllSalarySuccess: (state, action: PayloadAction<Salary[]>) => {
      state.loading = false;
      state.allSalaries = action.payload;
    },

    setSalaryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addSalary: (state, action: PayloadAction<Salary>) => {
      state.allSalaries.unshift(action.payload);
    },
  },
});

export const {
  setSalaryStart,
  setMySalarySuccess,
  setAllSalarySuccess,
  setSalaryFailure,
  addSalary,
} = salarySlice.actions;

export default salarySlice.reducer;