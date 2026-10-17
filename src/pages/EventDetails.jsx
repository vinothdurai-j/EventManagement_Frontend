import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEvent } from '../hooks/useEvents'
import { useMyRegistrations, useRegisterForEvent } from '../hooks/useRegistrations'
import { formatDate, getErrorMessage } from '../utilis/format'

const EventDetails = () => {
    const { id } = useParams()
    const { user } = useSelector((state) => state.auth)
    const isUser = user?.role === 'user'

    const { data: event, isPending, isError, error } = useEvent(id)

    // user mattum: already register pannitaana nu paaka
    const { data: myRegistrations } = useMyRegistrations(isUser)
    const registerMutation = useRegisterForEvent()

    if (isPending) return <p className="max-w-3xl mx-auto px-4 py-6 text-gray-500">Loading event...</p>

    if (isError) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-6">
                <p className="p-3 rounded bg-red-100 text-red-700 text-sm">{getErrorMessage(error)}</p>
                <Link to={isUser ? '/events' : '/admin/dashboard'} className="text-blue-600 hover:underline text-sm">
                    Back
                </Link>
            </div>
        )
    }

    const seatsLeft = event.maxParticipants - event.registeredCount
    const isPast = new Date(event.eventDate) <= new Date()

    const isRegistered = myRegistrations?.some(
        (r) => r.event?._id === event._id && r.status === 'REGISTERED'
    )

    const canRegister = isUser && !isRegistered && !isPast && event.status === 'ACTIVE' && seatsLeft > 0

    const buttonLabel = () => {
        if (registerMutation.isPending) return 'Registering...'
        if (isRegistered) return 'Already Registered'
        if (isPast) return 'Registration Closed'
        if (seatsLeft <= 0) return 'Event Full'
        return 'Register'
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            <Link to={isUser ? '/events' : '/admin/dashboard'} className="text-blue-600 hover:underline text-sm">
                ← Back
            </Link>

            <div className="bg-white rounded-xl shadow p-6 mt-3">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">{event.category}</span>
                    <span className={`text-xs px-2 py-1 rounded ${event.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                        {event.status}
                    </span>
                </div>

                <h1 className="text-2xl font-bold">{event.name}</h1>
                <p className="text-gray-600 mt-2">{event.description}</p>

                <div className="mt-4 space-y-1 text-gray-700">
                    <p>📍 {event.location}</p>
                    <p>📅 {formatDate(event.eventDate)}</p>
                    <p>👥 {event.registeredCount} / {event.maxParticipants} registered</p>
                    <p className={seatsLeft > 0 ? 'text-green-600' : 'text-red-600'}>
                        {seatsLeft > 0 ? `${seatsLeft} seats left` : 'Event Full'}
                    </p>
                </div>

                {registerMutation.isError && (
                    <p className="mt-4 p-3 rounded bg-red-100 text-red-700 text-sm">
                        {getErrorMessage(registerMutation.error)}
                    </p>
                )}

                {registerMutation.isSuccess && (
                    <p className="mt-4 p-3 rounded bg-green-100 text-green-700 text-sm">
                        Registered successfully!
                    </p>
                )}

                {isUser && (
                    <button
                        onClick={() => registerMutation.mutate(event._id)}
                        disabled={!canRegister || registerMutation.isPending}
                        className="mt-6 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {buttonLabel()}
                    </button>
                )}

                {user?.role === 'admin' && (
                    <div className="mt-6 flex gap-3">
                        <Link to={`/admin/events/${event._id}/edit`} className="px-4 py-2 border rounded hover:bg-gray-100">
                            Edit
                        </Link>
                        <Link to={`/admin/events/${event._id}/registrations`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            View Registrations
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EventDetails