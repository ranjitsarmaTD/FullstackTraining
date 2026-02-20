import { Box, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function EmployeeProfile(){
    const { user, role } = useSelector(state => state.auth)
    const [ employee, setEmployee ] = useState({})
    
    useEffect(() => {
        const res = localStorage.getItem('employees')
        const employees = JSON.parse(res)

        const employee = employees.find(emp => emp.email == user.email)

        setEmployee(employee || null)
    }, [user.email])
    return (
        <Box
            sx={{display: 'flex', flexDirection: 'column', paddingTop: '4rem', justifyContent: 'center'}}
        >
            <Box
                sx={{display: 'flex', marginTop: '2.5rem', flexDirection: 'column', paddingY: '4rem', paddingX: '1.5rem', marginX: '3rem', boxShadow: '2px 2px 13px 4px #d8d9e8a5'}}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'start'
                    }}
                >
                    <Box 
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'start'
                        }}
                    >
                    <AccountCircleIcon
                        sx={{
                            color: '#b9bbd3a5',
                            width: '200px',
                            height: '200px'
                        }}
                    />
                    <Box
                        sx={{
                            padding: '2rem'
                        }}
                    >
                        <Typography sx={{fontSize: '1.2rem', color: 'grey'}}>Id : {user.id}</Typography>
                        <Typography sx={{fontSize: '1.2rem', color: 'grey'}}>Name : {user.name}</Typography>
                        <Typography sx={{fontSize: '1.2rem', color: 'grey'}}>Email : {user.email}</Typography>
                    </Box>
                    </Box>
                    <Typography
                        sx={{
                            backgroundColor: 'orange',
                            color: 'white',
                            width: '110px',
                            textAlign: 'center',
                            padding: '1px',
                            borderRadius: '3px',
                            fontSize: '18px',
                            marginTop: '2rem',
                            marginRight: '1rem'
                        }}
                    >
                        {role}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'start',
                        justifyContent: 'space-between',
                        margin: '2rem'
                    }}
                >
                    <Box
                        sx={{
                            width: '47%'
                        }}
                    >
                        <Box sx={{ marginBottom: '1.6rem' }}>
                            <Typography
                                sx={{
                                    color: 'grey',
                                    fontSize: '1rem'
                                }}
                            >Name</Typography>
                            <Typography
                                sx={{
                                    fontSize: '1.4rem'
                                }}
                            >{employee.name}</Typography>
                        </Box>
                        <Box sx={{ marginBottom: '1.6rem' }}>
                            <Typography
                                sx={{
                                    color: 'grey',
                                    fontSize: '1rem'
                                }}
                            >Designation</Typography>
                            <Typography
                                sx={{
                                    fontSize: '1.4rem'
                                }}
                            >{employee.designation}</Typography>
                        </Box>
                        <Box sx={{ marginBottom: '1.6rem' }}>
                            <Typography
                                sx={{
                                    color: 'grey',
                                    fontSize: '1rem'
                                }}
                            >Hiring Date</Typography>
                            <Typography
                                sx={{
                                    fontSize: '1.4rem'
                                }}
                            >{employee.hiringDate}</Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: '47%'
                        }}
                    >
                        <Box sx={{ marginBottom: '1.6rem' }}>
                            <Typography
                                sx={{
                                    color: 'grey',
                                    fontSize: '1rem'
                                }}
                            >Email</Typography>
                            <Typography
                                sx={{
                                    fontSize: '1.4rem'
                                }}
                            >{employee.email}</Typography>
                        </Box>
                        <Box sx={{ marginBottom: '1.6rem' }}>
                            <Typography
                                sx={{
                                    color: 'grey',
                                    fontSize: '1rem'
                                }}
                            >Status</Typography>
                            <Typography
                                sx={{
                                    fontSize: '1.4rem'
                                }}
                            >{employee.status}</Typography>
                        </Box>
                        <Box sx={{ marginBottom: '1.6rem' }}>
                            <Typography
                                sx={{
                                    color: 'grey',
                                    fontSize: '1rem'
                                }}
                            >Password</Typography>
                            <Typography
                                sx={{
                                    fontSize: '1.4rem'
                                }}
                            >{employee.password}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default EmployeeProfile;