import { Box, Typography } from "@mui/material";
import LeaveRequestsTable from "../../components/macro/leaveRequests/leaveRequestsTable";
import './leaveRequests.css'

function LeaveRequests(){
    return (
        <Box
            sx={{display: 'flex', flexDirection: 'column'}}
        >
            <Box
                sx={{marginY: '4rem', display: 'flex', flexDirection: 'column', paddingY: '4rem', paddingX: '0rem', marginX: '3rem'}}
            >
                <h2>Leave Requests</h2>
                <Typography className="sub-title">Manage all Leave Requests</Typography>
                <LeaveRequestsTable/>
            </Box>
        </Box>
    )
}

export default LeaveRequests;