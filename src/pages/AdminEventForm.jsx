import { Link, useNavigate, useParams } from 'react-router-dom'
import EventForm from '../components/EventForm'
import { useEvent, useCreateEvent, useUpdateEvent } from '../hooks/useEvents'
import { getErrorMessage } from '../utilis/format'

const AdminEventForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id

    // edit mode-la mattum fetch (id illa na query disabled)
    const { data: event, isPending: loadingEvent, isError: loadError, error: loadErr } = useEvent(id)

    const createMutation = useCreateEvent()
    const updateMutation = useUpdateEvent()
    const mutation = isEdit ? updateMutation : createMutation

    const handleSubmit = (data) => {
        const options = { onSuccess: () => navigate('/admin/dashboard') }

        if (isEdit) {
            updateMutation.mutate({ id, data }, options)
        } else {
            createMutation.mutate(data, options)
        }
    }

    return (
        <div className="max-w-xl mx-auto px-4 py-6">
<Link
    to="/admin/dashboard"
    className="inline-flex items-center gap-2 rounded-lg border border-black bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors duration-200 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white"
>
    ← Back
</Link>
            <div className="bg-white rounded-xl shadow p-6 mt-3">
                <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Event' : 'Create Event'}</h1>

                {mutation.isError && (
                    <p className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">{getErrorMessage(mutation.error)}</p>
                )}

                {isEdit && loadingEvent && <p className="text-gray-500">Loading...</p>}

                {isEdit && loadError && (
                    <p className="p-3 rounded bg-red-100 text-red-700 text-sm">{getErrorMessage(loadErr)}</p>
                )}

                {/* edit: data vandhadhum mattum form render aagum, key vachu fresh state */}
                {isEdit && event && (
                    <EventForm
                        key={event._id}
                        initialData={event}
                        onSubmit={handleSubmit}
                        isPending={mutation.isPending}
                        submitLabel="Update Event"
                    />
                )}

                {!isEdit && (
                    <EventForm
                        onSubmit={handleSubmit}
                        isPending={mutation.isPending}
                        submitLabel="Create Event"
                    />
                )}
            </div>
        </div>
    )
}

export default AdminEventForm