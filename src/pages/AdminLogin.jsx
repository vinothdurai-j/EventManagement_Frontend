import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useLoginAdmin } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { getErrorMessage } from '../utilis/format'
import welcomeImg from '../images/welcome6.png'

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path
            fill="#fff"
            d="M16.67 15.47 17.2 12h-3.33V9.75c0-.95.47-1.88 1.96-1.88h1.51V4.92s-1.37-.23-2.68-.23c-2.74 0-4.53 1.66-4.53 4.67V12H7.1v3.47h3.03V24h3.74v-8.53h2.8Z"
        />
    </svg>
)

const GoogleIcon = () => (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65Z" />
        <path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 0 0 0 24c0 3.77.9 7.35 2.56 10.78l7.97-6.19Z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
    </svg>
)

const inputClasses =
    'w-full h-11 rounded-[9px] border border-gray-200 bg-[#F5F6F8] px-4 text-sm text-gray-800 ' +
    'placeholder:text-gray-400 transition focus:outline-none focus:border-[#5B67F8] focus:ring-2 focus:ring-[#5B67F8]/30'

const AdminLogin = () => {
    const toast = useToast()
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)

    const { mutate, isPending } = useLoginAdmin()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
       mutate(form, {
    onSuccess: (data) => toast.success(`Welcome back, ${data.user.name}!`),
    onError: (err) => toast.error(getErrorMessage(err))
})
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F1F1F1] px-4 py-8 font-sans">
<div className="relative flex w-full max-w-[1200px] overflow-hidden rounded-[18px] bg-white p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:p-5 md:w-[88%] md:min-h-[640px] md:p-6 lg:p-8">                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(168,130,255,0.45)_0%,rgba(168,130,255,0)_70%)]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(91,103,248,0.18)_0%,rgba(91,103,248,0)_70%)]"
                />

                <section className="relative z-10 hidden w-[46%] overflow-hidden rounded-[40px] bg-[#5B67F8] md:block">
                    <img
                        src={welcomeImg}
                        alt="Person working at a desk with a computer and laptop"
                        className="absolute inset-0 h-full w-full object-cover object-bottom"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none'
                        }}
                    />
                </section>

                <section className="relative z-10 flex flex-1 items-center justify-center px-2 py-6 sm:px-6 md:px-8">
                    <form onSubmit={handleSubmit} className="w-full max-w-[420px]">
                        <div className="mb-3 flex items-center justify-center gap-2">
                            <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
                                <path
                                    fill="#5B67F8"
                                    d="M16 2a14 14 0 1 0 14 14c0-1.1-.13-2.17-.38-3.2a4.5 4.5 0 0 1-5.4-5.4A13.9 13.9 0 0 0 16 2Zm0 8a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
                                />
                            </svg>
                            <span className="text-lg font-bold text-[#5B67F8]">EventManagement</span>
                        </div>

                        <h1 className="text-center text-2xl font-bold text-black sm:text-[28px]">Welcome Back</h1>
                        <p className="mt-1 text-center text-xs text-gray-500">Please Login to your account</p>

                        <div className="mt-6">
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="Email"
                                autoComplete="email"
                                className={`${inputClasses} mb-4`}
                            />

                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    className={`${inputClasses} pr-11`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gray-400 transition hover:text-gray-600 focus:outline-none focus-visible:text-[#5B67F8]"
                                >
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>

                            <div className="mt-3 text-right">
                                <span className="text-xs text-gray-500">Forgot Password</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="mt-5 h-11 w-full rounded-lg bg-[#5B67F8] text-sm font-semibold text-white transition-colors hover:bg-[#4A56E6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B67F8] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isPending ? 'Logging in...' : 'Login'}
                        </button>

                        <div className="my-6 flex items-center gap-3">
                            <span className="h-px flex-1 bg-gray-200" />
                            <span className="text-xs text-gray-500">or Login with</span>
                            <span className="h-px flex-1 bg-gray-200" />
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <button
                                type="button"
                                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B67F8]/40"
                            >
                                <FacebookIcon />
                                Facebook
                            </button>
                            <button
                                type="button"
                                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B67F8]/40"
                            >
                                <GoogleIcon />
                                Google
                            </button>
                        </div>
<p className="mt-6 text-center text-sm">
    <Link to="/login" className="font-medium text-[#5B67F8] hover:underline">
        Back to User Login
    </Link>
</p>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default AdminLogin