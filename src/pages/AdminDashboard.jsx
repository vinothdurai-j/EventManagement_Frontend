import { Link } from 'react-router-dom'
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useAdminEvents, useUpdateEventStatus, useDeleteEvent } from '../hooks/useEvents'
import { useToast } from '../hooks/useToast'
import { formatDate, getErrorMessage } from '../utilis/format'
import { useConfirm } from '../hooks/useConfirm'
const AdminDashboard = () => {
    const toast = useToast()
    const { data: events, isPending, isError, error } = useAdminEvents()
    const statusMutation = useUpdateEventStatus()
    const deleteMutation = useDeleteEvent()

    // backend events illa na 404 "Events Not Found" throw pannum, adhu error illa, empty state
    const isEmpty = isError && error.response?.status === 404
    const realError = isError && !isEmpty

    const handleToggle = (event) => {
        const nextStatus = event.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'

        statusMutation.mutate(
            {
                id: event._id,
                status: nextStatus
            },
            {
                onSuccess: () =>
                    toast.success(
                        nextStatus === 'ACTIVE'
                            ? 'Event activated successfully'
                            : 'Event deactivated successfully'
                    ),
                onError: (err) => toast.error(getErrorMessage(err))
            }
        )
    }
const confirm = useConfirm()

    // const handleDelete = (event) => {
    //     if (window.confirm(`Delete "${event.name}"? This cannot be undone.`)) {
    //         deleteMutation.mutate(event._id, {
    //             onSuccess: () => toast.success('Event deleted successfully'),
    //             onError: (err) => toast.error(getErrorMessage(err))
    //         })
    //     }
    // }
    const handleDelete = (event) => {
    confirm({
        title: 'Delete Event',
        message: `Delete "${event.name}"? This cannot be undone.`,
        confirmText: 'Delete',
        onConfirm: () =>
            deleteMutation.mutate(event._id, {
                onSuccess: () => toast.success('Event deleted successfully'),
                onError: (err) => toast.error(getErrorMessage(err))
            })
    })
}

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">All Events</h1>
                <Link to="/admin/events/new" className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-blue-700">
                    + Create Event
                </Link>
            </div>

            {isPending && <p className="text-gray-500">Loading events...</p>}

            {realError && (
                <p className="p-3 rounded bg-red-100 text-red-700 text-sm">{getErrorMessage(error)}</p>
            )}

            {isEmpty && <p className="text-gray-500">No events yet. Create your first event.</p>}

            {events && events.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                                <tr>
                                    <th className="px-5 py-3.5 font-medium whitespace-nowrap">Name</th>
                                    <th className="px-5 py-3.5 font-medium whitespace-nowrap">Category</th>
                                    <th className="px-5 py-3.5 font-medium whitespace-nowrap">Date</th>
                                    <th className="px-5 py-3.5 font-medium whitespace-nowrap">Seats</th>
                                    <th className="px-5 py-3.5 font-medium whitespace-nowrap">Status</th>
                                    <th className="px-5 py-3.5 font-medium whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {events.map((event) => {
                                    const isActive = event.status === 'ACTIVE'
                                    const isToggling =
                                        statusMutation.isPending && statusMutation.variables?.id === event._id
                                    const isDeleting =
                                        deleteMutation.isPending && deleteMutation.variables === event._id

                                    return (
                                        <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-4 font-medium text-gray-900">
                                                <Link to={`/events/${event._id}`} className="hover:underline hover:text-blue-600">
                                                    {event.name}
                                                </Link>
                                            </td>
                                            <td className="px-5 py-4 text-gray-600">{event.category}</td>
                                            <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                                                {formatDate(event.eventDate)}
                                            </td>
                                            <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                                                {event.registeredCount} / {event.maxParticipants}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'
                                                        }`}
                                                >
                                                    {event.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    {/* Active / Inactive toggle */}
                                                    <button
                                                        type="button"
                                                        role="switch"
                                                        aria-checked={isActive}
                                                        aria-label={
                                                            isActive
                                                                ? `Deactivate ${event.name}`
                                                                : `Activate ${event.name}`
                                                        }
                                                        title={isActive ? 'Active (click to deactivate)' : 'Inactive (click to activate)'}
                                                        onClick={() => handleToggle(event)}
                                                        disabled={isToggling}
                                                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${isActive
                                                                ? 'bg-green-400 focus-visible:ring-green-500'
                                                                : 'bg-red-400 focus-visible:ring-red-500'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0.5'
                                                                }`}
                                                        />
                                                    </button>

                                                    {/* View registrations */}
                                                    <Link
                                                        to={`/admin/events/${event._id}/registrations`}
                                                        aria-label="View Registrations"
                                                        title="View Registrations"
                                                        className="ml-2 p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                    >
                                                        <FiEye size={18} />
                                                    </Link>

                                                    {/* Edit */}
                                                    <Link
                                                        to={`/admin/events/${event._id}/edit`}
                                                        aria-label="Edit Event"
                                                        title="Edit Event"
                                                        className="p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                                                    >
                                                        <FiEdit2 size={18} />
                                                    </Link>

                                                    {/* Delete */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(event)}
                                                        disabled={isDeleting}
                                                        aria-label="Delete Event"
                                                        title="Delete Event"
                                                        className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                                    >
                                                        <FiTrash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminDashboard