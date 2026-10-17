import { useState } from 'react'
import { toInputDate } from '../utilis/format'

const emptyForm = {
    name: '',
    description: '',
    category: '',
    location: '',
    eventDate: '',
    maxParticipants: ''
}

const EventForm = ({ initialData, onSubmit, isPending, submitLabel }) => {
    const [form, setForm] = useState(
        initialData
            ? {
                  name: initialData.name,
                  description: initialData.description,
                  category: initialData.category,
                  location: initialData.location,
                  eventDate: toInputDate(initialData.eventDate),
                  maxParticipants: initialData.maxParticipants
              }
            : emptyForm
    )

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        onSubmit({
            ...form,
            eventDate: new Date(form.eventDate).toISOString(),
            maxParticipants: Number(form.maxParticipants)
        })
    }

    const inputClass = 'w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'

    return (
        <form onSubmit={handleSubmit}>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputClass} />

            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className={inputClass} />

            <label className="block mb-1 text-sm font-medium">Category</label>
            <input type="text" name="category" value={form.category} onChange={handleChange} required className={inputClass} />

            <label className="block mb-1 text-sm font-medium">Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} required className={inputClass} />

            <label className="block mb-1 text-sm font-medium">Event Date & Time</label>
            <input type="datetime-local" name="eventDate" value={form.eventDate} onChange={handleChange} required className={inputClass} />

            <label className="block mb-1 text-sm font-medium">Max Participants</label>
            <input type="number" name="maxParticipants" value={form.maxParticipants} onChange={handleChange} required min={1} className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            >
                {isPending ? 'Saving...' : submitLabel}
            </button>
        </form>
    )
}

export default EventForm