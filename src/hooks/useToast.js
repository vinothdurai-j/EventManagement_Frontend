import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { addToast, removeToast } from '../store/toastSlice'

let toastId = 0
const DURATION = 3000

export const useToast = () => {
    const dispatch = useDispatch()

    return useMemo(() => {
        const show = (type, message) => {
            const id = ++toastId
            dispatch(addToast({ id, type, message }))
            setTimeout(() => dispatch(removeToast(id)), DURATION)
        }

        return {
            success: (message) => show('success', message),
            error: (message) => show('error', message),
            info: (message) => show('info', message)
        }
    }, [dispatch])
}