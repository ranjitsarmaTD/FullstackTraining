import { Box } from "@mui/material";
import LeaveRequestsTable from "../../components/macro/leaveRequests/leaveRequestsTable";

function LeaveRequests(){
    return (
        <Box
            sx={{display: 'flex', flexDirection: 'column'}}
        >
            <Box
                sx={{marginY: '4rem', display: 'flex', flexDirection: 'column', paddingY: '4rem', paddingX: '1.5rem', marginX: '3rem'}}
            >
                <LeaveRequestsTable/>
            </Box>
        </Box>
    )
}

export default LeaveRequests;