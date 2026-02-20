import { Box } from "@mui/material";
import TopBar from "../macro/topBar/topBar";
import SideBar from "../macro/sideBar/sideBar";
import { Outlet } from "react-router-dom";


function MainLayout(){
    return(
        <Box sx={{ width: '100vw', height: '100vh'}}>
            <TopBar/>
            <Box sx={{height: '100%', display: 'flex', flexDirection: 'row', width: '100%'}}>
                <SideBar/>
                <Box sx={{width: '80%'}}>
                    <Outlet/>
                </Box>
            </Box>
        </Box>
    )
}

export default MainLayout;