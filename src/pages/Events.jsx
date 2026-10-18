import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, CalendarDays, Users } from 'lucide-react'
import { useActiveEvents } from '../hooks/useEvents'
import { formatDate, getErrorMessage } from '../utilis/format'

const Events = () => {
    // form = typing values, filters = Search click pannina apram API-ku povadhu
    const [form, setForm] = useState({ category: '', location: '' })
    const [filters, setFilters] = useState({})

    const { data: events, isPending, isError, error, isFetching } = useActiveEvents(filters)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const applyFilters = (e) => {
        e.preventDefault()

        const clean = {}
        if (form.category.trim()) clean.category = form.category.trim()
        if (form.location.trim()) clean.location = form.location.trim()

        setFilters(clean)
    }

    const clearFilters = () => {
        setForm({ category: '', location: '' })
        setFilters({})
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Upcoming Events</h1>

                {/* Filters */}
                <form
                    onSubmit={applyFilters}
                    className="flex flex-wrap items-center gap-3 mb-8 bg-white border border-slate-200 rounded-2xl shadow-sm p-4"
                >
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        type="submit"
                        className="px-5 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="px-5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        Clear
                    </button>
                    {isFetching && !isPending && (
                        <span className="self-center text-sm text-slate-500">Updating...</span>
                    )}
                </form>

                {/* States */}
                {isPending && <p className="text-slate-500">Loading events...</p>}

                {isError && (
                    <p className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">{getErrorMessage(error)}</p>
                )}

                {events && events.length === 0 && (
                    <p className="text-slate-500">No events found.</p>
                )}

                {/* List */}
                {events && events.length > 0 && (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => {
                            const seatsLeft = event.maxParticipants - event.registeredCount

                            return (
                                <div
                                    key={event._id}
                                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    <span className="self-start text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 mb-3">
                                        {event.category}
                                    </span>

                                    <h2 className="text-lg font-bold text-slate-900">{event.name}</h2>
                                    <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">{event.description}</p>

                                    <div className="text-sm text-slate-600 mt-4 space-y-2">
                                        <p className="flex items-center gap-2">
                                            <MapPin size={16} className="text-slate-400 shrink-0" />
                                            <span>{event.location}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CalendarDays size={16} className="text-slate-400 shrink-0" />
                                            <span>{formatDate(event.eventDate)}</span>
                                        </p>
                                        <p
                                            className={`flex items-center gap-2 font-medium ${
                                                seatsLeft > 0 ? 'text-green-600' : 'text-red-600'
                                            }`}
                                        >
                                            <Users size={16} className="shrink-0" />
                                            <span>{seatsLeft > 0 ? `${seatsLeft} seats left` : 'Event Full'}</span>
                                        </p>
                                    </div>

                                    <Link
                                        to={`/events/${event._id}`}
                                        className="mt-auto pt-0 text-center"
                                    >
                                        <span className="mt-5 block w-full py-2.5 text-sm font-medium bg-indigo-600 text-white rounded-xl shadow-sm hover:bg-indigo-700 hover:shadow transition-all">
                                            View Details
                                        </span>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Events