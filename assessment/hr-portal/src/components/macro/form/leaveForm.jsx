import { Box, Button, Divider, Drawer, MenuItem, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { applyLeave } from "../../../store/thunks/leaveThunk";

const departments = ['HR', 'Manager', 'IT'];
const leaveType = ['Casual', 'Annual', 'Sick', 'Paid']

function LeaveForm({ closeLeaveForm, isLeaveFormOpen }){
    const dispatch = useDispatch()
    
    const [ formControl, setFormControl ] = useState({
        name: '',
        department: '',
        leaveType: '',
        fromDate: dayjs(),
        toDate: dayjs(),
        days: 0,
        reason: ''
    }) 

    function handleLeaveApply(){
        dispatch(applyLeave({
            ...formControl,
            fromDate: formControl.fromDate.toISOString(),
            toDate: formControl.toDate.toISOString(),
            id: new Date().toISOString()
        }))
        closeLeaveForm()
    }

    function handleFormControl(e){
        if(e.type == 'click' && !e.$y){
            const { name, value } = e.target;
            console.log(name, value);
            setFormControl({
                ...formControl,
                [name]: value
            });
        }
        if(e.target && e.target?.type && !e.$y){
            const { name, value } = e.target;
            console.log(name, value);
            setFormControl({
                ...formControl,
                [name]: value
            })
        }
        
    }

    return (
        <Drawer
            open={isLeaveFormOpen}
            onClose={closeLeaveForm}
            anchor="right"
        >
            <Box>
                <Typography
                    className="form-title"
                >
                    Apply for Leave
                </Typography>
            </Box>
            <Divider/>
            <Box
                sx={{
                    marginTop: '2rem'
                }}
            >
                <TextField
                    label="Name"
                    type="name"
                    name="name"
                    variant="standard"
                    fullWidth
                    sx={{
                        marginTop: '1rem'
                    }}
                    value={formControl.name}
                    onChange={handleFormControl}
                />
                <Box
                    sx={{
                        marginTop: '1.5rem',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'end'
                    }}
                >
                    <TextField
                        label='Department'
                        select
                        name='department'
                        variant='standard'
                        value={formControl.department}
                        onChange={handleFormControl}
                        sx={{
                            width: '47%'
                        }}
                    >
                        {
                            departments?.map((dept, index) => {
                                return (
                                    <MenuItem value={dept} key={`dept-${index}`}>{dept}</MenuItem>
                                )
                            })
                        }
                    </TextField>
                    <TextField
                        label='Leave Type'
                        select
                        name="leaveType"
                        variant="standard"
                        value={formControl.leaveType}
                        onChange={handleFormControl}
                        sx={{
                            width: '47%'
                        }}
                    >
                        {
                            leaveType?.map((type, index) => {
                                return (
                                    <MenuItem value={type}
                                    key={`type-${index}`}>{type}</MenuItem>
                                )
                            })
                        }
                    </TextField>
                </Box>
                <Box
                    sx={{
                        marginTop: '1.5rem',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'end'
                    }}
                >
                    <DatePicker
                        label='From Date'
                        variant='standard'
                        value={formControl.fromDate}
                        onChange={(e1) => {
                            setFormControl({
                                ...formControl,
                                fromDate: e1
                            })
                        }}
                        sx={{
                            width: '47%'
                        }}
                    />
                    <DatePicker
                        label='To Date'
                        value={formControl.toDate}
                        onChange={(toDate) => {
                            setFormControl({
                                ...formControl,
                                toDate: toDate
                            })
                        }}
                        sx={{
                            width: '47%'
                        }}
                    />
                </Box>
                <TextField
                    label="Days"
                    type="number"
                    name="days"
                    fullWidth
                    value={formControl.days}
                    onChange={handleFormControl}
                    sx={{
                        marginTop: '1.5rem'
                    }}
                />
                <TextField
                    label="Reason"
                    name="reason"
                    type="reason"
                    fullWidth
                    value={formControl.reason}
                    onChange={handleFormControl}
                    sx={{
                        marginTop: '1.5rem'
                    }}
                />
            </Box>
            <Button
                sx={{
                    marginTop: '4rem',
                    backgroundColor: '#22C55E',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#16A34A'
                    }
                }}
                onClick={handleLeaveApply}
            >Apply</Button>
        </Drawer>
    )
}

export default LeaveForm;