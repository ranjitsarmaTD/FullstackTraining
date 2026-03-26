import { useEffect, useState, type ChangeEvent } from "react";
// import lstyles from "../../../styles/Leave.module.css";
import toast from "react-hot-toast";
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Chip,
  Grid,
  Divider,
  
  type SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { useAppSelector } from "../../../hooks/reduxHooks";
import {
  applyForLeave,
  fetchUserLeaves,
  getLeaveCount,
} from "../../../features/leaves/leaveService";
import { setLeaves } from "../../../features/leaves/leaveSlice";
import type {
  FormDataType,
  FormResponseType,
  LeaveRequest,
} from "../../../features/leaves/LeaveType";
import { setLeaveBalance } from "../../../features/leaves/leaveBalanceSlice";

//type declaration
// type FormDataType = {
//   leaveType: string;
//   startDate: string;
//   endDate: string;
//   reason: string;
// };

// type FormResponseType = {
//   success: boolean;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   message: string;
//   leaveId: string;
// };

// type LeaveBalance = {
//   casualLeave?: number;
//   sickLeave?: number;
//   earnedLeave?: number;

// main exportable function
const LeaveManagement = () => {
  //for current leaves display
  const getStatusColor = (status: string) => {
  if (status === "approved") return "success";
  if (status === "rejected") return "error";
  return "warning";
};

  const dispatch = useAppDispatch();
  const leaveRequests = useAppSelector((state) => state.leavesReducer.leaves);
  const leaveBalance = useAppSelector(
    (state) => state.leavesBalanceReducer.balance,
  );

  const [formData, setFormData] = useState<FormDataType>({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    const loadLeaves = async () => {
      const userLeaves: LeaveRequest[] = await fetchUserLeaves();
      dispatch(setLeaves(userLeaves));
    };

    const loadBalance = async () => {
      const data = await getLeaveCount();
      // console.log("Dispatching leave balance: ", data);
      dispatch(setLeaveBalance(data));
    };

    loadBalance();
    loadLeaves();
  }, [dispatch]);

  //general handler function for form elements
  const handleChange = (
    e:
      | SelectChangeEvent<string>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
//main handle submit func
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.leaveType ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.reason
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.endDate < formData.startDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    try {
      //redux dispatch -apply New leave
      const newLeave: FormResponseType = await applyForLeave(formData);
      const updatedLeaves: LeaveRequest[] = await fetchUserLeaves();
      dispatch(setLeaves(updatedLeaves));

      toast.success(newLeave.message);
    } catch (e) {
      console.log("Leave was not submitted! Error:", e);
      alert("Leave was NOT able to be submitted. Try Again");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(240,240,240)",
        overflow: "auto",
        p: 2,
      }}
    >
      
      <Typography
        variant="h5"
        sx={{ textAlign: "center", mt: 2, fontWeight: 500 }}
      >
        Apply For a Leave
      </Typography>

      
      <Paper
        elevation={0}
        sx={{
          border: "1px solid grey",
          width: "80%",
          mx: "auto",
          p: 3,
          mt: 3,
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontWeight: 600, mb: 2 }}>Leave Balance</Typography>

        <Stack direction="row" justifyContent="center" spacing={3}>
          <Typography>Casual Leaves: {leaveBalance?.casualLeaves}</Typography>
          <Typography>Sick Leaves: {leaveBalance?.sickLeaves}</Typography>
          <Typography>Earned Leaves: {leaveBalance?.earnedLeaves}</Typography>
        </Stack>
      </Paper>

    
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          border: "0.5px solid grey",
          borderRadius: 3,
          boxShadow: "0px 0px 30px rgb(199,198,198)",
          backgroundColor: "white",
          width: "80%",
          mx: "auto",
          mt: 3,
          p: 4,
        }}
      >
        <Stack spacing={4} alignItems="center">
         
          <FormControl sx={{ width: 300 }}>
            <InputLabel>Leave Type</InputLabel>
            <Select
              name="leaveType"
              value={formData.leaveType}
              label="Leave Type"
              onChange={handleChange}
              required
            >
              <MenuItem value="sick">Sick Leave</MenuItem>
              <MenuItem value="vacation">Vacation Leave</MenuItem>
              <MenuItem value="earned">Earned Leave</MenuItem>
            </Select>
          </FormControl>

         
          <Stack direction="row" spacing={2}>
            <TextField
              type="date"
              name="startDate"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              value={formData.startDate}
              onChange={handleChange}
            />

            <TextField
              type="date"
              name="endDate"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              value={formData.endDate}
              onChange={handleChange}
            />
          </Stack>

          <TextField
            name="reason"
            label="Reason for Leave"
            multiline
            rows={4}
            value={formData.reason}
            onChange={handleChange}
            required
            sx={{ width: "80%" }}
          />

 
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "rgb(103,161,249)",
              fontWeight: 600,
              fontSize: "1rem",
              px: 3,
              py: 1,
            }}
          >
            Submit Leave Request
          </Button>
        </Stack>
      </Paper>

     
      <Paper
        sx={{
          border: "0.5px solid grey",
          borderRadius: 3,
          boxShadow: "0px 0px 30px rgb(199,198,198)",
          backgroundColor: "white",
          width: "80%",
          mx: "auto",
          mt: 3,
          p: 3,
          maxHeight: 200,
          overflow: "auto",
        }}
      ><>
    {leaveRequests.length === 0 ? (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="text.secondary">
          No leave requests submitted yet.
        </Typography>
      </Box>
    ) : (
      <Stack spacing={1}>
        {leaveRequests.map((req, index) => (
          <Box key={req.leaveId} sx={{ px: 1, py: 2 }}>
            
            {/* ROW */}
            <Grid container alignItems="center" spacing={2}>
              
              {/* Dates */}
              <Grid item xs={3}>
                <Typography fontWeight={500}>
                  {new Date(req.startDate).toLocaleDateString()} →{" "}
                  {new Date(req.endDate).toLocaleDateString()}
                </Typography>
              </Grid>

              {/* Reason */}
              <Grid item xs={3}>
                <Typography color="text.secondary">
                  {req.reason}
                </Typography>
              </Grid>

              {/* Status */}
              <Grid item xs={2}>
                <Chip
                  label={req.status.toUpperCase()}
                  color={getStatusColor(req.status)}
                  size="small"
                />
              </Grid>

              {/* Message */}
              <Grid item xs={2}>
                {req.status === "pending" && (
                  <Typography color="warning.main">
                    Waiting
                  </Typography>
                )}
                {req.status === "approved" && (
                  <Typography color="success.main">
                    Approved
                  </Typography>
                )}
                {req.status === "rejected" && (
                  <Typography color="error.main">
                    Rejected
                  </Typography>
                )}
              </Grid>

              {/* Approved By */}
              <Grid item xs={2}>
                <Typography variant="body2" color="text.secondary">
                  {req.approvedBy ?? "Not approved"}
                </Typography>
              </Grid>
            </Grid>

            {/* Row Divider (optional, not between columns) */}
            {index !== leaveRequests.length - 1 && (
              <Divider sx={{ mt: 2 }} />
            )}
          </Box>
        ))}
      </Stack>
    )}
  </>
      </Paper>
    </Box>
  );
};

export default LeaveManagement;
