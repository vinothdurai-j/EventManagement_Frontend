import { createSlice } from '@reduxjs/toolkit'
import { saveAuth, getToken, getStoredUser, clearAuth } from '../utilis/storage'

const initialState = {
    token: getToken(),
    user: getStoredUser()
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload
            saveAuth(token, user)
            state.token = token
            state.user = user
        },
        logout: (state) => {
            clearAuth()
            state.token = null
            state.user = null
        }
    }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer