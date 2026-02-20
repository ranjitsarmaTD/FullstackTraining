import { Box, Card, Typography } from "@mui/material";
import InfoCard from "../../components/shared/infoCard/infoCard";
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import './employeeDashboard.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchEmployees } from "../../store/thunks/employeeThunks";

function EmployeeDashboard(){
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth);
    const { data } = useSelector(state => state.employees)

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [])

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{marginY: '4rem', display: 'flex', flexDirection: 'column', paddingY: '4rem', paddingX: '1.5rem', marginX: '3rem'}}>
                <Box sx={{marginBottom: '4rem'}}>
                    <p className="page-title">Hi {user.name},</p>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <h1 sx={{}}>Welcome back</h1>
                        <WavingHandOutlinedIcon sx={{marginLeft: '1rem', fontSize: '3rem', color: '#FFCC4D'}}/>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <InfoCard title='Employees' prefix="Total" count={data.length} />
                </Box>
            </Box>
        </Box>
    )
}

export default EmployeeDashboard;