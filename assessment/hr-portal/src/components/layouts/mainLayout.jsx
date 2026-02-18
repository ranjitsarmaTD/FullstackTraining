import { Box } from "@mui/material";
import TopBar from "../macro/topBar/topBar";
import SideBar from "../macro/sideBar/sideBar";


function MainLayout({children}){
    return(
        <Box sx={{ width: '100vw', height: '100vh'}}>
            <TopBar/>
            <Box sx={{height: '100%', display: 'flex', flexDirection: 'row', width: '100%'}}>
                <SideBar/>
                <Box sx={{width: '80%'}}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default MainLayout;