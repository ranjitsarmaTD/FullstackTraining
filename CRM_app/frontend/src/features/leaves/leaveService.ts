import { api } from "../../api/axios";
import type { FormDataType, FormResponseType, LeaveRequest, LeavesHr, LeavesType } from "./LeaveType";
import toast from "react-hot-toast";

export const fetchUserLeaves = async (): Promise<LeaveRequest[]> => {
  try {
    const res = await api.get("/leaves/get-leaves");

    return res.data.data || [];


  } catch (err) {
    console.error("Error fetching leaves: ", err);
    toast.error("Failed to fetch submitted leaves");
    return [];
  }
};

export const applyForLeave = async (
  formData: FormDataType,
): Promise<FormResponseType> => {
  try {
    const response = await api.post<FormResponseType>(
      "leaves/apply-leave",
      formData,
    );

    if (!response.data.success) //incase the response was unsuccessful
    {
      throw new Error(
        "Failed to submit leave request: " + response.data.message,
      );
    }
    return response.data;
  } catch (err) {
    console.error("Error applying for leave: ", err);
    throw err;
  }
};



export const getLeaveCount = async (): Promise<LeavesType> => {
  try {
    const res = await api.get("/leaves/leave-count");
    // console.log("Fetched leave balance: ", res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("Error fetching leave count: ", err);
    throw err;
  }
};


//FOR HR

export const getAllLeavesHr = async():Promise<LeavesHr[]>=>{
  try {
    console.log("BEFOREEEEEEEEEEEE FRONTEND SERVICE")
    const res = await api.get("/leaves/all-leaves")
    console.log("Frontend service:" ,res.data.data)
    return res.data.data;
  }
  catch(err){
    console.error("Error fetching leaves for HR",err)
    throw err;
  }
}


export const approveLeaveService = async (
  leaveId: string
) => {
  console.log("about to patch ,",leaveId)
  if(!leaveId)
  {
    throw("LeaveId not found")
  }
  const res = await api.patch(`/leaves/${leaveId}/approve`);
  return res.data;
};

export const rejectLeaveService = async (
  leaveId: string
) => {
  const res = await api.patch(`/leaves/${leaveId}/reject`);
  return res.data;
};