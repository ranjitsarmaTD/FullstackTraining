import { Box, Card, Typography } from "@mui/material";
import './infoCard.css';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

function InfoCard({ title, prefix, count}){
    return (
        <Card sx={{width: '340px'}} className="info-card">
            <Box>
                <Typography className="prefix">{prefix}</Typography>
                <h2>{title}</h2>
                <h1>{count}</h1>
            </Box>
            <Box>
                {
                    title == 'Employees' && <PeopleOutlineOutlinedIcon sx={{fontSize: '1.7rem', color: '#FACC15'}}/>
                }
                {
                    title == 'Job Openings' && <WorkOutlineOutlinedIcon sx={{fontSize: '1.7rem', color: '#F97316'}}/>
                }
            </Box>
        </Card>
    )
}

export default InfoCard;