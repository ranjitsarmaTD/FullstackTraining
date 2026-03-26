import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Button, Chip, Typography } from "@mui/material";
import { useEffect } from "react";
// import type { LeavesHr } from "../../features/leaves/LeaveType";
import {
  approveLeaveService,
  getAllLeavesHr,
  rejectLeaveService,
} from "../../features/leaves/leaveService";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
// import { useUser } from "../../context/useUser";
import {
  approveLeaveHr,
  rejectLeaveHr,
  setLeavesHr,
} from "../../features/leaves/leaveSlice";

const ApproveLeavePage = () => {
  const dispatch = useAppDispatch();
  const leavesHr = useAppSelector((state) => state.leavesReducer.leavesHr);
  //   const { user } = useUser();

  useEffect(() => {
    const loadLeaves = async () => {
      const leavesRows = await getAllLeavesHr();
      dispatch(setLeavesHr(leavesRows));
    };
    loadLeaves();
  }, [dispatch]);

  // APPROVE
  const handleApprove = async (id: string) => {
    try {
      await approveLeaveService(id);

      dispatch(approveLeaveHr({ id }));
    } catch (err) {
      console.error(err);
    }
  };

  // REJECT
  const handleReject = async (id: string) => {
    try {
      await rejectLeaveService(id);

      dispatch(rejectLeaveHr({ id }));
    } catch (err) {
      console.error(err);
    }
  };

  const columns: GridColDef[] = [
    { field: "employeeId", headerName: "Employee ID", flex: 1 },

    { field: "name", headerName: "Name", flex: 1.5 },

    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
    },

    {
      field: "reason",
      headerName: "Reason",
      flex: 2,
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const status = params.value;

        const color =
          status === "approved"
            ? "success"
            : status === "rejected"
              ? "error"
              : "warning";

        return <Chip label={status.toUpperCase()} color={color} size="small" />;
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      renderCell: (params) => {
        const { leaveId, status } = params.row;

        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              disabled={status !== "pending"}
              onClick={() => handleApprove(leaveId)}
            >
              Approve
            </Button>

            <Button
              variant="contained"
              color="error"
              size="small"
              disabled={status !== "pending"}
              onClick={() => handleReject(leaveId)}
            >
              Reject
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%", p: 2 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ mb: 5, textAlign: "center" }}
      >
        Leave Approval Portal
      </Typography>
      <DataGrid
        rows={leavesHr}
        columns={columns}
        getRowId={(row) => row.leaveId}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ApproveLeavePage;
