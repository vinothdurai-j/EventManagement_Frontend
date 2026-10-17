import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLoginAdmin } from '../hooks/useAuth'
import { getErrorMessage } from '../utilis/format'

const AdminLogin = () => {
    const [form, setForm] = useState({ email: '', password: '' })

    const { mutate, isPending, isError, error } = useLoginAdmin()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        mutate(form)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow">
                <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

                {isError && (
                    <p className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">{getErrorMessage(error)}</p>
                )}

                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                />

                <label className="block mb-1 text-sm font-medium">Password</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-2 bg-gray-900 text-white rounded hover:bg-gray-700 disabled:opacity-60"
                >
                    {isPending ? 'Logging in...' : 'Login'}
                </button>

                <p className="mt-4 text-sm text-center">
                    <Link to="/login" className="text-blue-600 hover:underline">Back to User Login</Link>
                </p>
            </form>
        </div>
    )
}

export default AdminLogin