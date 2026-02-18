import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useState } from "react";
import './topBar.css';

function TopBar(){
    const [ isModalOpen, setModal ] = useState(false)
    function openLogoutModal(){
        setModal(true)
    }
    function closeLogoutModal(){
        setModal(false)
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
                        onClick={openLogoutModal}>
                        <AccountCircleOutlinedIcon sx={{fontSize: '2rem'}}/>
                    </Box>
                </Box>
                {/* <Modal> */}
                    {/* <Typography>Are you sure? You want to Logout</Typography>
                    <Box>
                        <button>Log out</button>
                        <button>Cancel</button>
                    </Box> */}
                {/* </Modal> */}
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;