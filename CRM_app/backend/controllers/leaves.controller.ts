import { Request, Response } from "express";
import {
  applyLeaveService,
  approveLeaveService,
  getAllLeavesService,
  getLeaveCountService,
  getUserLeavesService,
  rejectLeaveService,
} from "../services/leaves.service";

interface LeaveDTO {
  leaveId: string;
  employeeId: string;
  leaveType: "sick" | "casual" | "earned";
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;

}


interface LeavesHrDTO {
  leaveId: string;
  employeeId: string;
  name: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}


function mapToLeavesHrDTO(leave: any): LeavesHrDTO {
  return {
    leaveId: leave.leaveId,
    employeeId: leave.user?.employeeId,
    name: leave.user?.name,
    startDate: leave.startDate.toISOString().split("T")[0],
    endDate: leave.endDate.toISOString().split("T")[0],
    reason: leave.reason,
    status: leave.status,
  };
}

function mapToLeaveDTO(leave: any): LeaveDTO {
  return {
    leaveId: leave.leaveId,
    employeeId: leave.employeeId,
    leaveType: leave.leaveType,
    startDate: leave.startDate.toISOString().split("T")[0], 
    endDate: leave.endDate.toISOString().split("T")[0],
    reason: leave.reason,
    status: leave.status,
    approvedBy: leave.approvedBy || undefined,
  };
}


// Apply leave function
export const applyLeaveFunction = async (req: Request, res: Response) => {
  const { leaveType, startDate, endDate, reason } = req.body;

  const employeeId = req.user?.employeeId;
  const userId = req.user?.userId;

  try {
    //service to add leave request to database.

    const response = await applyLeaveService(
      employeeId!,
      leaveType,
      startDate,
      endDate,
      reason,
      userId!,
    );
    
    res.status(201).json({
      success: true,
      status: response.status.toUpperCase(),
      message: "Leave request submitted successfully",
      leaveId: response.leaveId,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


//fetch existing leaves for the USER
export const getLeavesFunction = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  
  

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User not authenticated",
    });
  }

  try {
    const leaves = await getUserLeavesService(userId!);
    const leaveDTOs: LeaveDTO[] = leaves.map(mapToLeaveDTO);

    return res.json({
      success: true,
      message: "Leaves fetched successfully",
      data: leaveDTOs,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


//fetch the count of leave Balance of The USER
export const getLeaveCountFunction = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: User not authenticated",
    });
  }

  try {
    const leaveCount = await getLeaveCountService(userId!);

    return res.json({
      success: true,
      message: "Leave count fetched successfully",
      data: leaveCount,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


//FOR HR 


export const getAllLeavesFunction = async(req:Request,res:Response)=>{
  try {
    console.log("BEFORE CONTROLLER")
    const leaves = await getAllLeavesService();
    console.log("Inside All leaves CONTROLLER",leaves)
    const leavesHrDTOs = leaves.map((leave) => ({
      leaveId: leave.leaveId,
      employeeId: leave.user?.employeeId,
      name: leave.user?.name,
      startDate: leave.startDate.toISOString().split("T")[0],
      endDate: leave.endDate.toISOString().split("T")[0],
      reason: leave.reason,
      status: leave.status,
    }));

    return res.json({
      success: true,
      message: "All leaves fetched successfully",
      data: leavesHrDTOs,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

}


export const approveLeaveController = async (
  req: Request,
  res: Response
) => {
  // const { leaveId } = req.params;
  const leaveId = req.params.leaveId as string;//type assertion

  const hrUserId = req.user?.userId; 

  if (!hrUserId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    await approveLeaveService(leaveId, hrUserId);

    return res.json({
      success: true,
      message: "Leave approved",
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


export const rejectLeaveController = async (
  req: Request,
  res: Response
) => {
  // const { leaveId } = req.params;
  const leaveId = req.params.leaveId as string;//type assertion

  

  const hrEmployeeId = req.user?.employeeId;

  if (!hrEmployeeId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    await rejectLeaveService(leaveId, hrEmployeeId);

    return res.json({
      success: true,
      message: "Leave rejected",
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};