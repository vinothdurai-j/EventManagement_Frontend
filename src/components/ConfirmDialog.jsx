import { useDispatch, useSelector } from 'react-redux'
import { AlertTriangle } from 'lucide-react'
import { closeConfirm } from '../store/confirmSlice'

const ConfirmDialog = () => {
    const dispatch = useDispatch()
    const { open, title, message, confirmText, onConfirm } = useSelector((state) => state.confirm)

    if (!open) return null

    const handleConfirm = () => {
        if (onConfirm) onConfirm()
        dispatch(closeConfirm())
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
            onClick={() => dispatch(closeConfirm())}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle size={20} className="text-red-600" />
                    </div>
                    <div>
                        <h2 id="confirm-title" className="text-base font-semibold text-slate-900">
                            {title}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500 break-words">{message}</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => dispatch(closeConfirm())}
                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog