import { api } from "../../api/axios";
import type { Employee } from "./employeesType";


export const getEmployees = async ():Promise<Employee[]> => {
    try {
        const response = await api.get("/users/all-employees");   
        return response.data.data;//only the users obj
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }       

};


export const addEmployeeService = async (employeeData:Employee) => {
    try {
        const response = await api.post("/auth/register", employeeData);        
        console.log(response.data.message)
        return response.data;//mesage,userId,employeeId returned
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }   

};



export const deleteEmployee = async (id: string) => {
  try {
    const response = await api.delete(`/users/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

