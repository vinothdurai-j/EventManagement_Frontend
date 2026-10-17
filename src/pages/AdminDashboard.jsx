import { Link } from 'react-router-dom'
import { useAdminEvents, useUpdateEventStatus, useDeleteEvent } from '../hooks/useEvents'
import { formatDate, getErrorMessage } from '../utilis/format'

const AdminDashboard = () => {
    const { data: events, isPending, isError, error } = useAdminEvents()
    const statusMutation = useUpdateEventStatus()
    const deleteMutation = useDeleteEvent()

    // backend events illa na 404 "Events Not Found" throw pannum, adhu error illa, empty state
    const isEmpty = isError && error.response?.status === 404
    const realError = isError && !isEmpty

    const handleToggle = (event) => {
        statusMutation.mutate({
            id: event._id,
            status: event.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
        })
    }

    const handleDelete = (event) => {
        if (window.confirm(`Delete "${event.name}"? This cannot be undone.`)) {
            deleteMutation.mutate(event._id)
        }
    }

    const actionError = statusMutation.isError
        ? getErrorMessage(statusMutation.error)
        : deleteMutation.isError
          ? getErrorMessage(deleteMutation.error)
          : null

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">All Events</h1>
                <Link to="/admin/events/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    + Create Event
                </Link>
            </div>

            {isPending && <p className="text-gray-500">Loading events...</p>}

            {realError && (
                <p className="p-3 rounded bg-red-100 text-red-700 text-sm">{getErrorMessage(error)}</p>
            )}

            {actionError && (
                <p className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">{actionError}</p>
            )}

            {isEmpty && <p className="text-gray-500">No events yet. Create your first event.</p>}

            {events && events.length > 0 && (
                <div className="bg-white rounded-xl shadow overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Seats</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {events.map((event) => (
                                <tr key={event._id}>
                                    <td className="px-4 py-3 font-medium">
                                        <Link to={`/events/${event._id}`} className="hover:underline">{event.name}</Link>
                                    </td>
                                    <td className="px-4 py-3">{event.category}</td>
                                    <td className="px-4 py-3">{formatDate(event.eventDate)}</td>
                                    <td className="px-4 py-3">{event.registeredCount} / {event.maxParticipants}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs px-2 py-1 rounded ${event.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-wrap gap-2">
                                            <Link to={`/admin/events/${event._id}/registrations`} className="px-2 py-1 border rounded hover:bg-gray-100">
                                                Registrations
                                            </Link>
                                            <Link to={`/admin/events/${event._id}/edit`} className="px-2 py-1 border rounded hover:bg-gray-100">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleToggle(event)}
                                                disabled={statusMutation.isPending && statusMutation.variables?.id === event._id}
                                                className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-60"
                                            >
                                                {event.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event)}
                                                disabled={deleteMutation.isPending && deleteMutation.variables === event._id}
                                                className="px-2 py-1 border border-red-500 text-red-600 rounded hover:bg-red-50 disabled:opacity-60"
                                            >
                                                {deleteMutation.isPending && deleteMutation.variables === event._id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminDashboard