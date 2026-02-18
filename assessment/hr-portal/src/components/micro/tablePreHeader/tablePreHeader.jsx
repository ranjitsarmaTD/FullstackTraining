import { Box, Button, Typography } from "@mui/material";
import './tablePreHeader.css';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';

function TablePreHeader({total, openEmpForm}){
    return (
        <Box 
            sx={{
                width: '100%', 
                marginBottom: '1rem'
            }} 
            className='table-pre-header'>
            <Typography 
                className="count"><PeopleOutlineOutlinedIcon sx={{marginRight: '1rem', color: '#F97316'}}/><span>Total Employees:</span> <span>{total}</span>
            </Typography>
            <Box>
                <Button
                    sx={{
                        backgroundColor: '#22C55E',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#16A34A'
                        }
                    }}
                    onClick={openEmpForm}
                >Add new Employee</Button>
            </Box>
        </Box>
    )
}

export default TablePreHeader;