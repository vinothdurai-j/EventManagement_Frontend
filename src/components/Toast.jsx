import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

const STYLES = {
    success: {
        wrapper: 'border-green-200 bg-green-50 text-green-800',
        icon: <CheckCircle2 size={20} className="text-green-600 shrink-0" />
    },
    error: {
        wrapper: 'border-red-200 bg-red-50 text-red-800',
        icon: <XCircle size={20} className="text-red-600 shrink-0" />
    },
    info: {
        wrapper: 'border-indigo-200 bg-indigo-50 text-indigo-800',
        icon: <Info size={20} className="text-indigo-600 shrink-0" />
    }
}

const Toast = ({ type = 'info', message, onClose }) => {
    const style = STYLES[type] || STYLES.info

    return (
        <div
            role="alert"
            className={`flex items-start gap-3 w-full max-w-sm rounded-xl border px-4 py-3 shadow-lg ${style.wrapper}`}
        >
            {style.icon}
            <p className="flex-1 text-sm font-medium break-words">{message}</p>
            <button
                type="button"
                onClick={onClose}
                aria-label="Close notification"
                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
                <X size={16} />
            </button>
        </div>
    )
}

export default Toast