import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, setUserFromStorage } from '../thunks/authThunk';

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: {
            id: 1,
            name: '',
            email: '',
            password: '',
        },
        role: null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.role = null
            state.isLoggedIn = false

            localStorage.removeItem('authUser')
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null
            state.isLoggedIn = false
            state.role = null

            localStorage.removeItem('authUser')
            
        })
        .addCase(setUserFromStorage.fulfilled, (state, action) => {
            state.loading = false
            state.role = action.payload?.role
            state.user = {
                name: action.payload?.user.name,
                email: action.payload?.user.email,
                id: action.payload?.user.id,
                password: action.payload?.user.password
            }
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.isLoggedIn = true
            state.role = action.payload.role
            state.user = {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password
            }

            localStorage.setItem('authUser', JSON.stringify(state))
        })
        .addCase(loginUser.rejected, (state) => {
            state.loading = false
            state.error = 'Failed to Login'
        })
    }
})

export default AuthSlice.reducer;