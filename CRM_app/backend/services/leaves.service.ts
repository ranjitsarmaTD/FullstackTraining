import { AppDataSource } from "../dataSource";
import { LeaveBalance } from "../entity/LeaveBalance";
import { Leaves } from "../entity/Leaves";
import { User } from "../entity/User";

const leavesRepo = AppDataSource.getRepository(Leaves);
const userRepo = AppDataSource.getRepository(User);
const leaveBalanceRepo = AppDataSource.getRepository(LeaveBalance);

export async function applyLeaveService(
  employeeId: string,
  leaveType: string,
  startDate: string,
  endDate: string,
  reason: string,
  userId: string,
) {
  //check if the user exists first
  // const user = await userRepo.findOneBy({ employeeId });

  // if (!user) {
  //     throw new Error("User not found");
  // }

  const leave = leavesRepo.create({
    employeeId: employeeId,
    leaveType: leaveType as "sick" | "casual" | "earned",
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    reason,
    status: "pending",
    user: { id: userId },
  });
  console.log("Leave entity created:", leave); // Debug log to check the created leave entity

  const savedLeave = await leavesRepo.save(leave);

  console.log("Saved leave:", savedLeave); // Debug log to check the saved leave entity

  return savedLeave;
}

export async function getUserLeavesService(userId: string) {
  try {
    const leaves = await leavesRepo.find({
      where: { user: { id: userId } },
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
    console.log("Leaves fetched for user:", leaves); // Debug log to check the fetched leaves
    return leaves;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getLeaveCountService(userId: string) {
  try {
    let leaveCount = await leaveBalanceRepo.findOne({
      where: { user: { id: userId } },
    });

    if (!leaveCount) {
      const user = await userRepo.findOneBy({ id: userId });

      if (!user) {
        throw new Error("User not found");
      }

      leaveCount = leaveBalanceRepo.create({
        user: user,
        sickLeaves: 3,
        casualLeaves: 3,
        earnedLeaves: 1,
      });

      await leaveBalanceRepo.save(leaveCount);
    }
    return leaveCount;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

//For hR

export async function getAllLeavesService() {
  try {
    const leaves = await leavesRepo.find({
      relations: ["user"],
      order: { createdAt: "DESC" },
    });

    return leaves;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export const approveLeaveService = async (
  leaveId: string,
  hrUserId: string,
) => {
  const leave = await leavesRepo.findOne({
    where: { leaveId },
    relations: ["user"],
  });

  if (!leave) {
    throw new Error("Leave not found");
  }
  const hr = await userRepo.findOne({
    select: ["name"],
    where: { id: hrUserId },
  });
  if (!hr) {
    throw new Error("HR user not found");
  }

  leave.status = "approved";
  leave.approvedBy = hr?.name;

  return await leavesRepo.save(leave);
};

export const rejectLeaveService = async (leaveId: string, hrUserId: string) => {
  const leave = await leavesRepo.findOne({
    where: { leaveId },
    relations: ["user"],
  });

  if (!leave) {
    throw new Error("Leave not found");
  }
  const hr = await userRepo.findOne({
    select: ["name"],
    where: { id: hrUserId },
  });
   if (!hr) {
    throw new Error("HR user not found");
  }

  leave.status = "rejected";
  leave.approvedBy = hr?.name;

  return await leavesRepo.save(leave);
};
