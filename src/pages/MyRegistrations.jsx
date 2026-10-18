import { Link } from 'react-router-dom'
import { MapPin, CalendarDays } from 'lucide-react'
import { useMyRegistrations, useCancelRegistration } from '../hooks/useRegistrations'
import { useToast } from '../hooks/useToast'
import { formatDate, getErrorMessage } from '../utilis/format'
import { useConfirm } from '../hooks/useConfirm'
const MyRegistrations = () => {
    const toast = useToast()
    const { data: registrations, isPending, isError, error } = useMyRegistrations()
    const cancelMutation = useCancelRegistration()
const confirm = useConfirm()

    // const handleCancel = (id) => {
    //     if (window.confirm('Are you sure you want to cancel this registration?')) {
    //         cancelMutation.mutate(id, {
    //             onSuccess: () => toast.success('Registration cancelled successfully'),
    //             onError: (err) => toast.error(getErrorMessage(err))
    //         })
    //     }
    // }

    const handleCancel = (id) => {
    confirm({
        title: 'Cancel Registration',
        message: 'Are you sure you want to cancel this registration?',
        confirmText: 'Yes, Cancel',
        onConfirm: () =>
            cancelMutation.mutate(id, {
                onSuccess: () => toast.success('Registration cancelled successfully'),
                onError: (err) => toast.error(getErrorMessage(err))
            })
    })
}
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">My Registrations</h1>

                {isPending && <p className="text-slate-500">Loading...</p>}

                {isError && (
                    <p className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">{getErrorMessage(error)}</p>
                )}

                {registrations && registrations.length === 0 && (
                    <p className="text-slate-500">
                        No registrations yet. <Link to="/events" className="text-indigo-600 hover:underline">Browse events</Link>
                    </p>
                )}

                <div className="space-y-4">
                    {registrations?.map((reg) => {
                        const event = reg.event // admin event delete pannina null aagalam
                        const isPast = event && new Date(event.eventDate) <= new Date()
                        const canCancel = reg.status === 'REGISTERED' && !isPast
                        const isRegistered = reg.status === 'REGISTERED'

                        return (
                            <div
                                key={reg._id}
                                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                            >
                                {/* Category (left) + Status (right) */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    {event?.category ? (
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                                            {event.category}
                                        </span>
                                    ) : (
                                        <span />
                                    )}

                                    <span
                                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                                            isRegistered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${isRegistered ? 'bg-green-500' : 'bg-red-500'}`} />
                                        {reg.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-end justify-between gap-4">
                                    <div>
                                        {event ? (
                                            <Link
                                                to={`/events/${event._id}`}
                                                className="text-lg font-bold text-slate-900 hover:text-indigo-600 hover:underline"
                                            >
                                                {event.name}
                                            </Link>
                                        ) : (
                                            <p className="text-lg font-bold text-slate-400">Event no longer available</p>
                                        )}

                                        {event && (
                                            <div className="text-sm text-slate-600 mt-3 space-y-2">
                                                <p className="flex items-center gap-2">
                                                    <MapPin size={16} className="text-slate-400 shrink-0" />
                                                    <span>{event.location}</span>
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <CalendarDays size={16} className="text-slate-400 shrink-0" />
                                                    <span>{formatDate(event.eventDate)}</span>
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {canCancel && (
                                        <button
                                            onClick={() => handleCancel(reg._id)}
                                            disabled={cancelMutation.isPending}
                                            className="px-5 py-2.5 text-sm font-medium border border-red-500 text-red-600 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {cancelMutation.isPending && cancelMutation.variables === reg._id ? 'Cancelling...' : 'Cancel'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MyRegistrations