import React, { useEffect, useState } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Typography,
  Divider,
} from '@mui/material'
import {
  ExpandLess,
  ExpandMore,
  Email as EmailIcon,
  // Phone as PhoneIcon,
  // CalendarMonth as CalendarIcon,
  // Cake as CakeIcon,
  
} from '@mui/icons-material'
import { api } from '../../api/axios'




interface UserProfileResponse {
    employeeId: string;
    name: string;
    email: string;
    role: string;
}

// Helper for the detailed rows
const ProfileDetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <ListItem disablePadding sx={{ py: 0.75 }}>
    <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>
      {icon}
    </ListItemIcon>
    <ListItemText
      primary={value}
      secondary={label}
      primaryTypographyProps={{ variant: 'body2', fontSize: '0.875rem' }}
      secondaryTypographyProps={{ variant: 'caption', fontSize: '0.75rem' }}
    />
  </ListItem>
)

// The User Profile Dropdown Component
const UserProfileDropdown: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserProfileResponse | null>(null)
  

  useEffect(() => {
    //feth user data
    const fetchUserData = async () => {
      
        const res = await api.get("/users/profile");
        setUserData(res.data.userProfileResponse);
        // console.log("User data fetched:", res.data.userProfileResponse);
    };

    fetchUserData();
  }, []);

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ width: '100%', border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: 2, overflow: 'hidden' }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        {/* The Main "Button" / Trigger Area */}
        <ListItemButton
          onClick={handleToggle}
          sx={{
            px: 2.5,
            py: 2,
            minHeight: 80,
            transition: 'background-color 0.2s',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          {/* Avatar and Name */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Avatar
              alt={userData?.name || "User Avatar"}
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
              sx={{ width: 48, height: 48, mr: 2 }}
            />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" noWrap={false} fontWeight="800" sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
              {userData?.name || "User Name"}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {userData?.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : "Role"}
              </Typography>
            </Box>
            {/* Arrow Icon */}
            {open ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
          </Box>
        </ListItemButton>
      </ListItem>

      {/* The Expanded Details */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ bgcolor: 'action.hover', px: 3, py: 2, }}>
          <List disablePadding dense>
            <ProfileDetailItem
              icon={<EmailIcon fontSize="small" />}
              label="Email"
              value={userData?.email || "Email"}
            />
            <ProfileDetailItem
              icon="#" // Placeholder for employee ID icon
              label="Employee ID"
              value={userData?.employeeId || "Employee ID"}
            />
            {/* <ProfileDetailItem
              icon={<CalendarIcon fontSize="small" />}
              label="Joined"
              value="March 15, 2022"
            />
            <ProfileDetailItem
              icon={<CakeIcon fontSize="small" />}
              label="Birthday"
              value="August 24"
            /> */}
          </List>
        </Box>
        <Divider />
      </Collapse>
    </Box>
  )
}

export default function App() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width:'100%', minHeight: 'auto', minWidth:'auto', bgcolor: '#7755c0', p: 1}}>
      <UserProfileDropdown />
    </Box>
  )
}