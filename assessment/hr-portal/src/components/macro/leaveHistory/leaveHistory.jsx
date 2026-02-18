import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaveHistory } from "../../../store/thunks/leaveThunk";


function LeaveHistory(){
    const dispatch = useDispatch()
    const { leaveHistory, loading } = useSelector(state => state.leave);

    useEffect(() => {
        dispatch(fetchLeaveHistory())
    }, [dispatch])

    const columns = [
        { field: "id", headerName: "S.no", width: 90 },
        { field: "leaveType", headerName: "Leave Type", width: 120 },
        { field: "fromDate", headerName: "From Date", width: 120 },
        { field: "toDate", headerName: "To Date", width: 120 },
        { field: "days", headerName: "Days", width: 120 },
        { field: "reason", headerName: "Reason", width: 120},
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'appliedAt', headerName: 'Applied At', width: 120 },
        { field: 'approvedAt', headerName: 'Approved At', width: 120 }
    ];

    if(loading){
        return (
            <div>Loading</div>
        )
    }

    return (
        <DataGrid
            sx={{width: '100%', marginTop: '1.7rem'}}
            rows={leaveHistory}
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
        ></DataGrid>
    )
}

export default LeaveHistory;