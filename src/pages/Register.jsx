import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUser } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { getErrorMessage } from '../utilis/format'
import welcomeImg from '../images/welcome5.png'


const Register = () => {
    const navigate = useNavigate()
    const toast = useToast()

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    const { mutate, isPending } = useRegisterUser()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (form.password !== form.confirmPassword) {
            return toast.error('Password and Confirm Password do not match')
        }

        // confirmPassword backend-ku anuppa venam
        const { confirmPassword, ...payload } = form

        mutate(payload, {
            onSuccess: () => {
                toast.success('Registered successfully. Please login.')
                navigate('/login', { replace: true })
            },
            onError: (err) => toast.error(getErrorMessage(err))
        })
    }

    const inputClass = 'w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="relative w-full max-w-md overflow-hidden bg-white rounded-xl shadow">
    <img
        src={welcomeImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-bottom"
    />
    <div className="absolute inset-0 bg-white/60" />

    <div className="relative z-10 p-8">
                
                <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

                <label className="block mb-1 text-sm font-medium">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputClass} />

                <label className="block mb-1 text-sm font-medium">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} />

                <label className="block mb-1 text-sm font-medium">Phone</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required maxLength={10} className={inputClass} />

                <label className="block mb-1 text-sm font-medium">Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} className={inputClass} />

                <label className="block mb-1 text-sm font-medium">Confirm Password</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
                >
                    {isPending ? 'Registering...' : 'Register'}
                </button>

                <p className="mt-4 text-sm text-center">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
                </div>
            </form>
        </div>
    )
}

export default Register