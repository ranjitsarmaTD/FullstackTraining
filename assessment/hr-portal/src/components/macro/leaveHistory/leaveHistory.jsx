import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaveHistory } from "../../../store/thunks/leaveThunk";
import { Box, Skeleton } from "@mui/material";


function LeaveHistory(){
    const dispatch = useDispatch()
    const { leaveHistory, loading } = useSelector(state => state.leave);
    const { user } = useSelector(state => state.auth);
    const [ myLeaves, setMyLeaves ] = useState([]);

    useEffect(() => {
        dispatch(fetchLeaveHistory())
    }, [dispatch])

    useEffect(() => {
        
        const tempLeaves = leaveHistory.filter((leave) => {
            if(leave.employeeId == user.id){
                return leave;
            }
        })
        
        if(tempLeaves){
            setMyLeaves(tempLeaves)
        }
    }, [leaveHistory])

    const columns = [
        { field: "id", headerName: "S.no", width: 90 },
        { field: "leaveType", headerName: "Leave Type", width: 100 },
        { field: "fromDate", headerName: "From Date", width: 100 },
        { field: "toDate", headerName: "To Date", width: 100 },
        { field: "days", headerName: "Days", width: 100 },
        { field: "reason", headerName: "Reason", width: 100},
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'appliedAt', headerName: 'Applied At', width: 100 },
        { field: 'approvedAt', headerName: 'Approved At', width: 100 }
    ];

    if(loading){
        return (
            <Skeleton
                variant="rectangular"
                width="100%"
                height={250}
                animation='wave'
            ></Skeleton>
        )
    }

    return (
        <DataGrid
            sx={{
                width: '100%',
                marginTop: '1.5rem'
            }}
            rows={myLeaves}
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