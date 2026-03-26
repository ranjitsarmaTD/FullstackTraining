export interface Leave {
  leaveId: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}





//apply leave form data types
export type FormDataType = {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
};

//form submit response type NOT fetch type
export type FormResponseType = {
  success: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message: string;
  leaveId: string;
};


//fetched leaves of the user - type
export type LeaveRequest = {
  leaveId: string;
  employeeId: string;
  leaveType: "sick" | "casual" | "earned";
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
};

//for hR approval list
export type LeavesHr={
  leaveId: string;
  employeeId: string;
  name: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

//fetched Leave Balance of User
export type LeavesType = {
  id: string;
  casualLeaves?: number;
  sickLeaves?: number;
  earnedLeaves?: number;
};


