import { useState } from "react";
import lstyles from "../../../styles/Leave.module.css";
import axios from "axios";

//type declaration
type FormDataType = {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
};

type FormResponseType = {
  success: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message: string;
  reqId: string;
};

type LeavesType = {
  casualLeave?: number;
  sickLeave?: number;
  vacationLeave?: number;
};

type LeaveRequest = {
  reqId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message: string;
};

// main exportable function
const LeaveManagement = () => {
  //temp leaves obj
  const leavesObj: LeavesType = {
    casualLeave: 5,
    sickLeave: 5,
    vacationLeave: 5,
  };

  const [leaves, setLeaves] = useState<LeavesType>(leavesObj);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  const [formData, setFormData] = useState<FormDataType>({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  //general handler function for form elements
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //api call to post formdata
  const sendFormData = async (
    requestPayload: FormDataType,
  ): Promise<FormResponseType> => {
    const api: string = "api/leave-apply/submit";
    const response = await axios.post<FormResponseType>(api, requestPayload);

    return response.data;
  };

  //submit handler on clicking submit

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.leaveType ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.reason
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.endDate < formData.startDate) {
      alert("End date cannot be before start date");
      return;
    }
    //api to sent the data if approved here

    try {
      const res: FormResponseType = await sendFormData(formData);

      if (!res.success) //incase the response was unsuccessful
      {
        throw new Error(res.message);
      }
      console.log("Leave request submitted ", res.message, res.reqId);

      setLeaveRequests((prev) => [
        ...prev,
        {
          reqId: res.reqId!,
          leaveType: formData.leaveType,
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: "PENDING",
          message: res.message,
        },
      ]);
    } catch (e) {
      //this catch block if there was error in processing the sendFormData
      console.log("Leave was not submitted! Error:", e);
      alert("Leave was NOT able to be submitted. Try Again");
    }
    // setLeaves([...leaves, ])
  };

  return (
    <div className={lstyles.leaveManagementContainer}>
      <div className={lstyles.leaveManagementHeader}>
        <h2>Apply For a Leave</h2>
      </div>
      <div className={lstyles.leaveBalance}>
        <p>Leave Balance</p>
        <p>Casual Leaves: {leaves.casualLeave}</p>
        <p>Sick Leaves: {leaves.sickLeave}</p>
        <p>Vacation Leaves: {leaves.vacationLeave}</p>
      </div>
      <form className={lstyles.leaveForm} onSubmit={handleSubmit}>
        <div className={lstyles.leaveType}>
          <label htmlFor="leaveType">Leave Type:</label>
          <select
            id="leaveType"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            required
          >
            <option value="">--Select a Leave Type--</option>
            <option value="sick">Sick Leave</option>
            <option value="vacation">Vacation Leave</option>
            <option value="personal">Personal Leave</option>
          </select>
        </div>

        <div className={lstyles.dateRange}>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            name="startDate"
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <label htmlFor="reason">Reason for Leave:</label>
        <textarea
          id="reason"
          className={lstyles.leaveReason}
          name="reason"
          rows={4}
          cols={50}
          value={formData.reason}
          onChange={handleChange}
          required
        />

        <button type="submit" className={lstyles.submitButton}>
          Submit Leave Request
        </button>
      </form>
      <div className={lstyles.requestStatus}>
        {leaveRequests.map((req) => (
          <div key={req.reqId}>
            <p>Request ID: {req.reqId}</p>
            <p>Status: {req.status}</p>

            {req.status === "PENDING" && (
              <p>Your request is waiting for approval</p>
            )}

            {req.status === "APPROVED" && <p>Approved</p>}

            {req.status === "REJECTED" && <p>Rejected</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveManagement;
