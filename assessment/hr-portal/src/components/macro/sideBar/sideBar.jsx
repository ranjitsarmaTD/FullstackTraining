import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import EventIcon from '@mui/icons-material/Event';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { NavLink } from "react-router-dom";
import './sideBar.css'

function SideBar(){
    const list = [
        {
            title: 'Dashboard',
            link: '/'
        },
        {
            title: 'Employee',
            link: '/employees'
        },
        {
            title: 'My Leaves',
            link: '/my-leaves'
        },
        {
            title: 'Leave Requests',
            link: '/leave-requests'
        }
    ];
    return (
        <Box sx={{ width: 320, height: '100%'}} className="sidebar">
            <List sx={{marginTop: '4rem'}}>
                {
                    list?.map((list, index) => {
                        return (
                            <ListItem key={`list-${index}`}>
                                <ListItemButton 
                                    component={NavLink} 
                                    to={list?.link} 
                                    sx={{
                                        padding: '0.7rem',
                                        paddingY: '0.7rem',
                                        fontSize: '2rem',
                                        borderRadius: '0.5rem',
                                        transition: 'background-color 0.5s ease',
                                        "&.active": {
                                            backgroundColor: '#657fc6',
                                            color: 'white'
                                        },
                                        '&:hover':{
                                            backgroundColor: '#abb3cb70',
                                            color: '#6366F1'
                                        }
                                    }}>
                                    <ListItemIcon>
                                        {
                                            index == 0 && <DashboardCustomizeRoundedIcon 
                                                sx={{
                                                    color: '#1E3A8A'
                                                }}
                                            />
                                        }
                                        {
                                            index == 1 && <PeopleAltRoundedIcon
                                                sx={{
                                                    color: '#1E3A8A'
                                                }}
                                            />
                                        }
                                        {
                                            index == 2 && <EventIcon
                                                sx={{
                                                    color: '#1E3A8A'
                                                }}
                                            />
                                        }
                                        {
                                            index == 3 && <EditCalendarIcon
                                                sx={{
                                                    color: '#1E3A8A'
                                                }}
                                            />
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={list?.title}/>
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    )
}

export default SideBar;