import { Box, Button, Typography } from "@mui/material";
import BalanceLeave from "../../components/macro/balanceLeave/balanceLeave";
import LeaveHistory from "../../components/macro/leaveHistory/leaveHistory";
import { useState } from "react";
import LeaveForm from "../../components/macro/form/leaveForm";

function MyLeaves(){
    const [ isLeaveFormOpen, setLeaveFormOpen ] = useState(false)

    function closeLeaveForm(){
        setLeaveFormOpen(false)
    }

    function openLeaveForm(){
        setLeaveFormOpen(true)
    }

    return (
        <Box
            sx={{display: 'flex', flexDirection: 'column'}}
        >
            <Box
                sx={{ display: 'flex', flexDirection: 'column', paddingY: '4rem', paddingX: '1.5rem', alignItems: 'center'}}
            >
                <Box
                    sx={{
                        width: '100%',
                        marginTop: '1.5rem',
                        marginBottom: '-0.5rem'
                    }}
                >
                    <h2>Leave Balance</h2>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Typography
                        className="sub-title"
                    >Leave booked this year : {}</Typography>
                    <Button
                        onClick={openLeaveForm}
                    >Apply Leave</Button>
                </Box>
                <BalanceLeave/>
                <Box
                    sx={{
                        width: '100%',
                        marginTop: '1.5rem',
                        marginBottom: '-0.2rem'
                    }}
                >
                    <h3>My Leaves</h3>
                </Box>
                <LeaveHistory/>
            </Box>
            {
                isLeaveFormOpen && <LeaveForm closeLeaveForm={closeLeaveForm} isLeaveFormOpen={isLeaveFormOpen}/>
            }
        </Box>
    )
}

export default MyLeaves;