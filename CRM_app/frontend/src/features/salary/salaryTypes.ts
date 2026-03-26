


export type AddSalaryPayload = {
  employeeId: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  month: string;
  year: number;
};





export type Salary = {
  salaryId: string;
  employeeId: string;
  name: string;
  role: string;
  deductions: number;
  netSalary: number;
  month: string;
  year: number;
};


export type MySalary={
    salaryId:string,
    baseSalary:number,
    bonus:number,
    deductions: number,
    netSalary: number,
    month: string,
    year: number,
}

export type SalaryRow = {
  salaryId: string;
  employeeId: string;
  name: string;
  role: string;
  netSalary: number;
};