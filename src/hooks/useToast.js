import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { addToast } from '../store/toastSlice'

let toastId = 0

export const useToast = () => {
    const dispatch = useDispatch()

    return useMemo(() => {
        const show = (type, message) =>
            dispatch(addToast({ id: ++toastId, type, message }))

        return {
            success: (message) => show('success', message),
            error: (message) => show('error', message),
            info: (message) => show('info', message)
        }
    }, [dispatch])
}