import { Link } from 'react-router-dom'
import { useMyRegistrations, useCancelRegistration } from '../hooks/useRegistrations'
import { formatDate, getErrorMessage } from '../utilis/format'

const MyRegistrations = () => {
    const { data: registrations, isPending, isError, error } = useMyRegistrations()
    const cancelMutation = useCancelRegistration()

    const handleCancel = (id) => {
        if (window.confirm('Are you sure you want to cancel this registration?')) {
            cancelMutation.mutate(id)
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">My Registrations</h1>

            {isPending && <p className="text-gray-500">Loading...</p>}

            {isError && (
                <p className="p-3 rounded bg-red-100 text-red-700 text-sm">{getErrorMessage(error)}</p>
            )}

            {cancelMutation.isError && (
                <p className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
                    {getErrorMessage(cancelMutation.error)}
                </p>
            )}

            {registrations && registrations.length === 0 && (
                <p className="text-gray-500">
                    No registrations yet. <Link to="/events" className="text-blue-600 hover:underline">Browse events</Link>
                </p>
            )}

            <div className="space-y-4">
                {registrations?.map((reg) => {
                    const event = reg.event // admin event delete pannina null aagalam
                    const isPast = event && new Date(event.eventDate) <= new Date()
                    const canCancel = reg.status === 'REGISTERED' && !isPast

                    return (
                        <div key={reg._id} className="bg-white rounded-xl shadow p-5 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                {event ? (
                                    <Link to={`/events/${event._id}`} className="text-lg font-semibold hover:underline">
                                        {event.name}
                                    </Link>
                                ) : (
                                    <p className="text-lg font-semibold text-gray-400">Event no longer available</p>
                                )}

                                {event && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        📍 {event.location} &nbsp; 📅 {formatDate(event.eventDate)}
                                    </p>
                                )}

                                <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${reg.status === 'REGISTERED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {reg.status}
                                </span>
                            </div>

                            {canCancel && (
                                <button
                                    onClick={() => handleCancel(reg._id)}
                                    disabled={cancelMutation.isPending}
                                    className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50 disabled:opacity-60"
                                >
                                    {cancelMutation.isPending && cancelMutation.variables === reg._id ? 'Cancelling...' : 'Cancel'}
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyRegistrations