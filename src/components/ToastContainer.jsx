import { useDispatch, useSelector } from 'react-redux'
import { removeToast } from '../store/toastSlice'
import Toast from './Toast'

const ToastContainer = () => {
    const dispatch = useDispatch()
    const toasts = useSelector((state) => state.toast.toasts)

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <Toast
                        type={toast.type}
                        message={toast.message}
                        onClose={() => dispatch(removeToast(toast.id))}
                    />
                </div>
            ))}
        </div>
    )
}

export default ToastContainer