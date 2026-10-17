import { useState } from 'react'
import { Link } from 'react-router-dom'
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
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>

            {/* Filters */}
            <form onSubmit={applyFilters} className="flex flex-wrap gap-3 mb-6">
                <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Search
                </button>
                <button type="button" onClick={clearFilters} className="px-4 py-2 border rounded hover:bg-gray-100">
                    Clear
                </button>
                {isFetching && !isPending && <span className="self-center text-sm text-gray-500">Updating...</span>}
            </form>

            {/* States */}
            {isPending && <p className="text-gray-500">Loading events...</p>}

            {isError && (
                <p className="p-3 rounded bg-red-100 text-red-700 text-sm">{getErrorMessage(error)}</p>
            )}

            {events && events.length === 0 && (
                <p className="text-gray-500">No events found.</p>
            )}

            {/* List */}
            {events && events.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => {
                        const seatsLeft = event.maxParticipants - event.registeredCount

                        return (
                            <div key={event._id} className="bg-white rounded-xl shadow p-5 flex flex-col">
                                <span className="self-start text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 mb-2">
                                    {event.category}
                                </span>

                                <h2 className="text-lg font-semibold">{event.name}</h2>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>

                                <div className="text-sm text-gray-700 mt-3 space-y-1">
                                    <p>📍 {event.location}</p>
                                    <p>📅 {formatDate(event.eventDate)}</p>
                                    <p className={seatsLeft > 0 ? 'text-green-600' : 'text-red-600'}>
                                        {seatsLeft > 0 ? `${seatsLeft} seats left` : 'Event Full'}
                                    </p>
                                </div>

                                <Link
                                    to={`/events/${event._id}`}
                                    className="mt-4 text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    View Details
                                </Link>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Events