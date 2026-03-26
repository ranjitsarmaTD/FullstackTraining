import { Request, Response } from "express";
import { addSalaryService, getAllSalariesService, getMySalaryService } from "../services/salary.service";

export const getMySalaryController = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const salary = await getMySalaryService(userId);

    return res.json({
      success: true,
      data: salary,
    });
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};




//HR side

export const addSalaryController = async (
  req: Request,
  res: Response
) => {
  const {
    employeeId,
    baseSalary,
    bonus,
    deductions,
    month,
    year,
  } = req.body;

  try {
    console.log("Entering salary controller")
    const salary = await addSalaryService(
      employeeId,
      Number(baseSalary),
      Number(bonus),
      Number(deductions),
      month,
      Number(year)
    );
    console.log("Exiting salary controller",salary)


    return res.status(201).json({
      success: true,
      message: "Salary added successfully",
      data: salary,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};



export const getAllSalariesController = async (
  req: Request,
  res: Response
) => {
  try {
    const salaries = await getAllSalariesService();

    return res.json({
      success: true,
      data: salaries,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};