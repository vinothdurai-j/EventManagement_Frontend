import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MapPin, CalendarDays, Users } from 'lucide-react'
import { useEvent } from '../hooks/useEvents'
import { useMyRegistrations, useRegisterForEvent } from '../hooks/useRegistrations'
import { useToast } from '../hooks/useToast'
import { formatDate, getErrorMessage } from '../utilis/format'

const EventDetails = () => {
    const { id } = useParams()
    const toast = useToast()
    const { user } = useSelector((state) => state.auth)
    const isUser = user?.role === 'user'

    const { data: event, isPending, isError, error } = useEvent(id)

    // user mattum: already register pannitaana nu paaka
    const { data: myRegistrations } = useMyRegistrations(isUser)
    const registerMutation = useRegisterForEvent()

    const handleRegister = () => {
        registerMutation.mutate(event._id, {
            onSuccess: () => toast.success('Registered successfully!'),
            onError: (err) => toast.error(getErrorMessage(err))
        })
    }

    if (isPending) {
        return (
            <div className="min-h-screen bg-slate-50">
                <p className="max-w-3xl mx-auto px-4 py-8 text-slate-500">Loading event...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <p className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">{getErrorMessage(error)}</p>
                    <Link to={isUser ? '/events' : '/admin/dashboard'} className="inline-block mt-3 text-indigo-600 hover:underline text-sm">
                        Back
                    </Link>
                </div>
            </div>
        )
    }

    const seatsLeft = event.maxParticipants - event.registeredCount
    const isPast = new Date(event.eventDate) <= new Date()
    const isActive = event.status === 'ACTIVE'

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
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-3xl mx-auto px-4 py-8">
                <Link
                    to={isUser ? '/events' : '/admin/dashboard'}
                    className="inline-flex items-center gap-2 rounded-lg border border-black bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors duration-200 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white"
                >
                    ← Back
                </Link>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mt-4">
                    {/* Category (left) + Status patch (right) */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                            {event.category}
                        </span>

                        <span
                            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                                isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                            {event.status}
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900">{event.name}</h1>
                    <p className="text-slate-500 mt-2">{event.description}</p>

                    <div className="mt-6 space-y-3 text-sm text-slate-600">
                        <p className="flex items-center gap-2">
                            <MapPin size={18} className="text-slate-400 shrink-0" />
                            <span>{event.location}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <CalendarDays size={18} className="text-slate-400 shrink-0" />
                            <span>{formatDate(event.eventDate)}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <Users size={18} className="text-slate-400 shrink-0" />
                            <span>{event.registeredCount} / {event.maxParticipants} registered</span>
                        </p>
                        <p className={`font-medium ${seatsLeft > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {seatsLeft > 0 ? `${seatsLeft} seats left` : 'Event Full'}
                        </p>
                    </div>

                    {isUser && (
                        <button
                            onClick={handleRegister}
                            disabled={!canRegister || registerMutation.isPending}
                            className="mt-6 w-full py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {buttonLabel()}
                        </button>
                    )}

                    {user?.role === 'admin' && (
                        <div className="mt-6 flex gap-3">
                            <Link
                                to={`/admin/events/${event._id}/edit`}
                                className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                Edit
                            </Link>
                            <Link
                                to={`/admin/events/${event._id}/registrations`}
                                className="px-5 py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl shadow-sm hover:bg-indigo-700 transition-colors"
                            >
                                View Registrations
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EventDetails