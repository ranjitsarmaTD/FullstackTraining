import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk('auth/loginUser', async (user, { rejectWithValue }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(user);
    
    const res = localStorage.getItem('employees');
    const users = JSON.parse(res);

    const loggedInUser = users.find((u) => u.email === user.email && u.password === user.password)

    console.log(loggedInUser);
    
    if(!loggedInUser){
        return rejectWithValue('Invalid email or password!')
    }
    return loggedInUser;
})

export const setUserFromStorage = createAsyncThunk('auth/setUserFromStorage', async() => {
    await new Promise(resolve => setTimeout(resolve, 800))

    const res = localStorage.getItem('authUser')
    const authUser = JSON.parse(res)

    return authUser;
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async() => {
    await new Promise(resolve => setTimeout(resolve, 800))
    return null
})