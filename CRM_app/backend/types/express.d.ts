//Overriding the REQ object's parameter type by adding user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        employeeId: string; 
        name: string;
        email: string;
        role: "hr" | "admin" | "employee";  
      };
    }
  }
}

export {};