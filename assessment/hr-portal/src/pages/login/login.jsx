import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import './login.css';
import { setEmployees } from "../../utils/localStorage";
import employees from '../../mock/employees.json';
import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../store/thunks/authThunk";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/thunks/authThunk";

function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, role } = useSelector(state => state.auth)
    const [ formControl, setFormControl ] = useState({
        email: '',
        password: '',
        saveCredentials: false
    })

    useEffect(() => {
        setEmployees(employees);

        const res = localStorage.getItem('authUser');
        const data = JSON.parse(res);
        
        if(isLoggedIn && data && role == 'Admin'){
            navigate('/admin/dashboard')
        }
        if(isLoggedIn && data && role == 'Employee'){
            navigate('/employee/dashboard')
        }
    }, [isLoggedIn])

    function handleFormControl(e){
        console.log(e.target.value, e.target.name);
        setFormControl({
            ...formControl,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(){
        dispatch(loginUser(formControl))
    }


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh'
            }}
        >
            <Box
                className='login-form'
            >
                <Box
                    className="header-cont"
                >
                    <h1>Welcome Back</h1>
                    <Typography
                        className="sub-title"
                    >
                        Enter your credentials to access your account
                    </Typography>
                </Box>
                <TextField
                    label='Email'
                    type="email"
                    name="email"
                    variant="standard"
                    value={formControl.email}
                    fullWidth
                    sx={{
                        width: '90%',
                        marginBottom: '1rem',
                        fontSize: 'medium'
                    }}
                    onChange={handleFormControl}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    variant="standard"
                    value={formControl.password}
                    fullWidth
                    sx={{
                        width: '90%',
                        marginBottom: '2rem'
                    }}
                    onChange={handleFormControl}
                />
                <Box
                    className="extra-cont"
                >
                    <FormControlLabel
                        className="checkbox-content"
                        control={
                            <Checkbox
                                aria-label="re"
                                checked={formControl.saveCredentials}
                                onChange={handleFormControl}
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                    >Forgot your Password?</Button>
                </Box>
                <Button
                    className="sub-button"
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </Box>
        </Box>
    )
}

export default Login;