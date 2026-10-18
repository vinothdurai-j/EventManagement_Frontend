import { createSlice } from '@reduxjs/toolkit'

const confirmSlice = createSlice({
    name: 'confirm',
    initialState: {
        open: false,
        title: '',
        message: '',
        confirmText: 'Confirm',
        onConfirm: null
    },
    reducers: {
        openConfirm: (state, action) => {
            state.open = true
            state.title = action.payload.title
            state.message = action.payload.message
            state.confirmText = action.payload.confirmText || 'Confirm'
            state.onConfirm = action.payload.onConfirm
        },
        closeConfirm: (state) => {
            state.open = false
            state.onConfirm = null
        }
    }
})

export const { openConfirm, closeConfirm } = confirmSlice.actions
export default confirmSlice.reducer