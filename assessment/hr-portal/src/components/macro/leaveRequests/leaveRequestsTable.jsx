import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveLeave, fetchLeaveRequests } from "../../../store/thunks/leaveThunk";
import './leaveRequestsTable.css';

function LeaveRequestsTable(){
    const dispatch = useDispatch();
    const { requests } = useSelector(state => state.leave);

    const columns = [
        { field: 'id', headerName: 'S.no', width: 70 },
        { field: 'name', headerName: 'Name', width: 120 },
        { field: 'department', headerName: 'Department', width: 120 },
        { field: 'leaveType', headerName: 'Leave Type', width: 120 },
        { field: 'fromDate', headerName: 'From Date', width: 120 },
        { field: 'toDate', headerName: 'To Date', width: 120 },
        { field: 'days', headerName: 'Days', width: 70 },
        { field: 'reason', headerName: 'Reason', width: 120 },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'appliedAt', headerName: 'Applied At', width: 120 },
        { field: 'actions', type: 'actions', headerName: 'Actions' , width: 120, getActions: (params) => [
            <GridActionsCellItem
                icon={<span>Approve</span>}
                label="Approve"
                onClick={() => handleLeaveApprove(params.row)}
                showInMenu={false}
            />
        ] }
    ]

    useEffect(() => {
        dispatch(fetchLeaveRequests())
    }, [dispatch])

    function handleLeaveApprove(leaveReq){
        dispatch(approveLeave({
            ...leaveReq,
            approvedAt: new Date().toISOString()
        }))
    }

    return (
        <DataGrid
            rows={requests}
            columns={columns}
            pageSizeOptions={[3]}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 3,
                        page: 0
                    }
                }
            }}
        >
        </DataGrid>
    )
}

export default LeaveRequestsTable;