import { api } from "../../api/axios";
import type { MySalary, Salary } from "./salaryTypes";

// EMPLOYEE  get my salary history
export const getMySalaryService = async (): Promise<MySalary> => {
  const res = await api.get("/salary/my-salary");
  return res.data.data;
};

// HR  get all current salaries
export const getAllSalaryService = async (): Promise<Salary[]> => {
  const res = await api.get("/salary/all");
  return res.data.data;
};

// HR add salary
export const addSalaryService = async (payload: {
  employeeId: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  month: string;
  year: number;
}) => {
  try {
    const res = await api.post("/salary/add-salary", payload);
    return res.data.data;
  } catch (err) {
    console.log("Unable to add salary",err)
  }
};
