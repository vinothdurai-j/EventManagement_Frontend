import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEventRegistrations } from '../hooks/useRegistrations'
import { formatDate, getErrorMessage } from '../utilis/format'

const TABS = [
    { label: 'All', value: '' },
    { label: 'Registered', value: 'REGISTERED' },
    { label: 'Cancelled', value: 'CANCELLED' }
]

const AdminRegistrations = () => {
    const { id } = useParams()
    const [status, setStatus] = useState('')

    const { data, isPending, isError, error, isFetching } = useEventRegistrations(id, status)

    const event = data?.event
    const registrations = data?.registrations || []

    const filled = event?.registeredCount || 0
    const max = event?.maxParticipants || 0
    const percent = max > 0 ? Math.min(Math.round((filled / max) * 100), 100) : 0
    const seatsLeft = Math.max(max - filled, 0)

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Link
    to="/admin/dashboard"
    className="inline-flex items-center gap-2 rounded-lg border border-black bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors duration-200 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white"
>
    &larr; Back to dashboard
</Link>

            {isPending && <p className="mt-6 text-gray-500">Loading registrations...</p>}

            {isError && (
                <p className="mt-4 p-3 rounded bg-red-100 text-red-700 text-sm">{getErrorMessage(error)}</p>
            )}

            {event && (
                <>
                    {/* Event header */}
                    <div className="mt-4 bg-white rounded-xl shadow p-6">
                        <p className="text-xs uppercase tracking-wide text-gray-500">Event Registrations</p>
                        <h1 className="text-3xl font-bold mt-1">{event.name}</h1>

                        <div className="grid grid-cols-3 gap-4 mt-5 text-center">
                            <div className="bg-blue-50 rounded-lg py-3">
                                <p className="text-2xl font-bold text-blue-700">{filled}</p>
                                <p className="text-xs text-gray-600">Registered</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg py-3">
                                <p className="text-2xl font-bold text-gray-700">{max}</p>
                                <p className="text-xs text-gray-600">Total Seats</p>
                            </div>
                            <div className={`rounded-lg py-3 ${seatsLeft > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                                <p className={`text-2xl font-bold ${seatsLeft > 0 ? 'text-green-700' : 'text-red-700'}`}>
                                    {seatsLeft}
                                </p>
                                <p className="text-xs text-gray-600">Seats Left</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Seats filled</span>
                                <span>{percent}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${percent >= 100 ? 'bg-red-500' : 'bg-indigo-500'}`}
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex items-center gap-2 mt-6 mb-3">
                        {TABS.map((tab) => (
                            <button
                                key={tab.label}
                                onClick={() => setStatus(tab.value)}
                                className={`px-4 py-1.5 rounded-full text-sm border ${
                                    status === tab.value
                                        ? 'bg-indigo-500 text-white border-blue-600'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}

                        <span className="ml-auto text-sm text-gray-500">
                            {isFetching ? 'Updating...' : `${registrations.length} user(s)`}
                        </span>
                    </div>

                    {/* Table */}
                    {registrations.length === 0 ? (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm py-12 text-center text-gray-500">
                            No registrations found.
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                                        <tr>
                                            <th className="px-5 py-3.5 font-medium whitespace-nowrap w-12">#</th>
                                            <th className="px-5 py-3.5 font-medium whitespace-nowrap">User</th>
                                            <th className="px-5 py-3.5 font-medium whitespace-nowrap">Phone</th>
                                            <th className="px-5 py-3.5 font-medium whitespace-nowrap">Registered At</th>
                                            <th className="px-5 py-3.5 font-medium whitespace-nowrap">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {registrations.map((item, index) => (
                                            <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-5 py-4 text-gray-500">{index + 1}</td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 shrink-0 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold uppercase">
                                                            {item.user?.name?.charAt(0) || '?'}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                {item.user?.name || 'Deleted user'}
                                                            </p>
                                                            <p className="text-xs text-gray-500">{item.user?.email || '-'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                                                    {item.user?.phone || '-'}
                                                </td>
                                                <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                                                    {formatDate(item.registeredAt)}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                                                            item.status === 'REGISTERED'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-red-100 text-red-700'
                                                        }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default AdminRegistrations