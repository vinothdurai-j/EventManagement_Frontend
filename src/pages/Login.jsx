import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLoginUser } from '../hooks/useAuth'
import { getErrorMessage } from '../utilis/format'

const Login = () => {
    const location = useLocation()
    const [form, setForm] = useState({ email: '', password: '' })

    const { mutate, isPending, isError, error } = useLoginUser()

    const successMessage = location.state?.message

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        mutate(form)
        // success aana token Redux-la set aagum, PublicRoute automatic-ah role-ku match page-ku redirect pannum
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow">
                <h1 className="text-2xl font-bold text-center mb-6">User Login</h1>

                {successMessage && (
                    <p className="mb-4 p-3 rounded bg-green-100 text-green-700 text-sm">{successMessage}</p>
                )}

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
                    className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <label className="block mb-1 text-sm font-medium">Password</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                >
                    {isPending ? 'Logging in...' : 'Login'}
                </button>

                <p className="mt-4 text-sm text-center">
                    New user? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
                <p className="mt-2 text-sm text-center">
                    <Link to="/admin/login" className="text-gray-500 hover:underline">Admin Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Login