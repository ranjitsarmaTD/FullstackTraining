import { Box, Button, Divider, Drawer, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import './newEmpForm.css';
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { addEmployees, updateEmployees } from "../../../store/thunks/employeeThunks";

const roles = ['HR', 'Manager', 'IT'];

function NewEmployeeForm({ closeEmpForm, isEmpFormOpen, editRowData, edit}){
    const dispatch = useDispatch(addEmployees())
    const [ formControl, setFormControl ] = useState({
        name: editRowData?.name || "",
        email: editRowData?.email || "",
        role: editRowData?.role || "",
        status: editRowData?.status || "",
        hiringDate: editRowData?.hiringDate
            ? dayjs(editRowData.hiringDate)
            : dayjs()
    })

    const handleFormControl = (e) => {
        if(e.$y && e.$D && e.$M){
            setFormControl({
                ...formControl,
                hiringDate: e
            })
        }
        if(e.target?.value && (e.target?.value == 'active' || e.target?.value == 'inactive') && !e.$y){
            console.log(e.target.value);
            setFormControl({
                ...formControl,
                status: e.target.value
            });
        }
        if(e.type == 'click' && e.target?.value != 'active' && e.target?.value != 'inactive' && !e.$y){
            const { name, value } = e.target;
            console.log(name, value);
            setFormControl({
                ...formControl,
                [name]: value
            });
        }
        if(e.target && e.target?.type && e.target?.value != 'active' && e.target?.value != 'inactive' && !e.$y){
            const { name, value } = e.target;
            console.log(name, value);
            setFormControl({
                ...formControl,
                [name]: value
            })
        }
    }

    const addNewEmployee = () => {
        dispatch(addEmployees({
            ...formControl,
            hiringDate: formControl?.hiringDate?.toISOString(),
            id: Date.now()
        }))
        closeEmpForm()
    }
    
    const updateEmployee = () => {
        dispatch(updateEmployees({
            ...formControl,
            hiringDate: formControl?.hiringDate?.toISOString(),
            id: editRowData?.id
        }))
        closeEmpForm()
    }

    return (
        <Drawer
            open={isEmpFormOpen}
            onClose={closeEmpForm}
            anchor="right"
        >
            <Box>
                <Typography
                    className="form-title"
                >Add New Employee</Typography>
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
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    variant="standard"
                    fullWidth
                    sx={{
                        marginTop: '1rem'
                    }}
                    value={formControl.email}
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
                    label="Role"
                    select
                    name="role"
                    variant="standard"
                    sx={{
                        width: '47%'
                    }}
                    value={formControl.role}
                    onChange={handleFormControl}
                >
                    {
                        roles.map((role, index) => {
                            return (
                                <MenuItem value={role} key={`role-${index}`}>{role}</MenuItem>
                            )
                        })
                    }
                </TextField>
                <DatePicker
                    sx={{
                        width: '47%',
                    }}
                    label="HiringDate"
                    value={formControl.hiringDate}
                    onChange={handleFormControl}
                />
                </Box>
                <ToggleButtonGroup
                    exclusive
                    value={formControl.status}
                    onChange={handleFormControl}
                    sx={{
                        width: '47%',
                        marginTop: '2rem'
                    }}
                >
                    <ToggleButton
                        value="active"
                        sx={
                            {
                                width: '50%'
                            }
                        }
                    >
                        Active
                    </ToggleButton>
                    <ToggleButton
                        value="inactive"
                        sx={{
                            width: '50%'
                        }}
                    >
                        Inactive
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {
                edit && 
                <Button
                    sx={{
                        marginTop: '4rem',
                        backgroundColor: '#22C55E',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#16A34A'
                        }
                    }}
                    onClick={updateEmployee}
                >Save Changes</Button>
            }
            {
                !edit &&
                <Button
                    sx={{
                        marginTop: '4rem',
                        backgroundColor: '#22C55E',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#16A34A'
                        }
                    }}
                    onClick={addNewEmployee}
                >Add</Button>
            }
        </Drawer>
    )
}

export default NewEmployeeForm;