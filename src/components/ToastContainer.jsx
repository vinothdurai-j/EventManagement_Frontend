import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeToast } from '../store/toastSlice'
import Toast from './Toast'

const DURATION = 3000

const ToastItem = ({ toast }) => {
    const dispatch = useDispatch()

    // timer: 3 sec-la auto remove (component unmount aana clear aagum)
    useEffect(() => {
        const timer = setTimeout(() => dispatch(removeToast(toast.id)), DURATION)
        return () => clearTimeout(timer)
    }, [dispatch, toast.id])

    return (
        <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => dispatch(removeToast(toast.id))}
        />
    )
}

const ToastContainer = () => {
    const toasts = useSelector((state) => state.toast.toasts)

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <ToastItem toast={toast} />
                </div>
            ))}
        </div>
    )
}

export default ToastContainer