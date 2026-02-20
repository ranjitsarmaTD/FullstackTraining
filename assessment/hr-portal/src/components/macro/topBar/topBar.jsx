import { AppBar, Box, Button, MenuItem, Modal, Toolbar, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState } from "react";
import './topBar.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/thunks/authThunk";

function TopBar(){
    const [ isSubMenuOpen, setSubMenuOpen ] = useState(false)
    const [ isLogoutOpen, setLogoutOpen ] = useState(false)
    const { role } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function openSubMenu(){
        setSubMenuOpen(true)
    }
    function closeSubMenu(){
        setSubMenuOpen(false)
    }
    function openLogOut(){
        setLogoutOpen(true)
        setSubMenuOpen(false)
    }
    function closeLogOut(){
        setLogoutOpen(false)
    }
    function handleLogout(){
        dispatch(logoutUser())
    }
    function gotoProfile(){
        if(role == "Admin"){
            navigate('/admin/profile')
        }
        if(role == "Employee"){
            navigate('/employee/profile')
        }
        setSubMenuOpen(false)
    }
    return (
        <AppBar>
            <Toolbar 
                className="nav-toolbar">
                <Typography sx={{fontSize: '2rem'}}>LOGO</Typography>
                <Box>
                    {/* <Typography>Name</Typography> */}
                    <Box 
                        sx={{cursor: 'pointer'}} 
                        onClick={openSubMenu}>
                        <AccountCircleOutlinedIcon sx={{fontSize: '2rem'}}/>
                    </Box>
                </Box>
                {
                    isSubMenuOpen &&
                    <Box
                        className="sub-menu"
                    >
                        <MenuItem
                            onClick={openLogOut}
                        >Logout</MenuItem>
                        <MenuItem
                            onClick={gotoProfile}
                        >Profile</MenuItem>
                    </Box>
                }
                {
                    isLogoutOpen &&
                    <Modal
                        open={isLogoutOpen}
                        onClose={closeLogOut}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box
                            sx={{
                                width: '400px',
                                height: '200px',
                                backgroundColor: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                padding: '2rem',
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '1rem'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '1.2rem'
                                }}
                            >Are you sure you want to Logout?</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '80%'
                                }}
                            >
                                <Button
                                    onClick={closeLogOut}
                                >Cancel</Button>
                                <Button
                                    onClick={handleLogout}
                                >Logout</Button>
                            </Box>
                        </Box>    
                    </Modal>
                }
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;