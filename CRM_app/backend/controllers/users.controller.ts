import { Request, Response } from "express";
import {
  userProfile,
  fetchAllEmpService,
  deleteEmployee,
} from "../services/users.service";

interface UserProfileResponse {
  employeeId: string;
  name: string;
  email: string;
  role: string;
}

export async function fetchUserProfile(req: Request, res: Response) {
  const id = req.user?.userId; //req.user is set by the authenticate middleware

  try {
    const user = await userProfile(id!);

    //filtered the data required for profile
    const userProfileResponse: UserProfileResponse = {
      employeeId: user.employeeId,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.json({
      userProfileResponse,
      message: "User profile fetched successfully",
    });
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
}

export async function fetchAllEmployees(req: Request, res: Response) {
  try {
    const userRole = req.user?.role;
    const allEmployees = await fetchAllEmpService();
    if (userRole === "employee" || "hr") {
      const limited = allEmployees.map((u) => ({
        id: u.id,
        employeeId: u.employeeId,
        name: u.name,
        location: u.location,
        dob: u.dob,
        joiningDate: u.joiningDate,
      }));
      return res.status(200).json({
        success: true,
        data: limited,
        message: "Fetched all employees",
      });
    }

    //send password as well for admin
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
}

export async function deleteEmployeeFunction(req: Request, res: Response) {
  try {
    const { id } = req.params;
    //type guard
    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid employee id" });
    }

    const deletedUser = await deleteEmployee(id);

    return res.status(200).json({
      message: "Employee deleted successfully",
      user: deletedUser,
    });
  } catch (error: any) {
    console.error("Delete error:", error);

    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
  }
}
