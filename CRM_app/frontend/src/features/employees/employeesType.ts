

export type Employee = {
  id:string;
  employeeId: string;
  name: string;
  email: string;
  password: string;
  role: "hr" | "admin" | "employee";
  dob: string;
  joiningDate: string;
  location: string;
};

