import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
import { logout } from '../store/authSlice'
import { useConfirm } from '../hooks/useConfirm'
import { useToast } from '../hooks/useToast'
import { UserCircle } from 'lucide-react'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const confirm = useConfirm()
    const toast = useToast()
    const { token, user } = useSelector((state) => state.auth)

    // login pannala na navbar venam
    if (!token || !user) return null

    const doLogout = () => {
        const loginPath = user.role === 'admin' ? '/admin/login' : '/login'

        dispatch(logout())
        queryClient.clear() // munnaadhu user data next user-ku kaattaama irukka
        navigate(loginPath, { replace: true })
        toast.success('Logged out successfully')
    }

    const handleLogout = () => {
        confirm({
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            confirmText: 'Logout',
            onConfirm: doLogout
        })
    }

    const linkClass = ({ isActive }) =>
        `relative py-2 text-[15px] font-medium whitespace-nowrap transition-colors
         after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:transition-colors
         ${isActive
            ? 'text-indigo-600 after:bg-indigo-600'
            : 'text-slate-700 hover:text-indigo-600 after:bg-transparent'}`

    return (
        <nav className="bg-[] px-3 py-4 sm:px-6  ">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl bg-slate-50 px-5 py-3 shadow-lg shadow-black/30 sm:px-10 md:h-[76px] md:py-0">
                <Link
                    to={user.role === 'admin' ? '/admin/dashboard' : '/events'}
                    className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900"
                >
                    <svg
                        viewBox="0 0 32 32"
                        className="h-7 w-7 shrink-0"
                        aria-hidden="true"
                    >
                        <path
                            fill="#5B67F8"
                            d="M16 2a14 14 0 1 0 14 14c0-1.1-.13-2.17-.38-3.2a4.5 4.5 0 0 1-5.4-5.4A13.9 13.9 0 0 0 16 2Zm0 8a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
                        />
                    </svg>

                    Event Manager
                </Link>

                <div className="flex w-full items-center md:w-auto md:flex-1">
                    <div className="flex flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-1 sm:gap-x-7 lg:gap-x-10">
                        {user.role === 'user' && (
                            <>
                                <NavLink to="/events" className={linkClass}>Events</NavLink>
                                <NavLink to="/my-registrations" className={linkClass}>My Registrations</NavLink>
                                <NavLink to="/profile" className={linkClass}>Profile</NavLink>
                            </>
                        )}

                        {user.role === 'admin' && (
                            <>
                                <NavLink to="/admin/dashboard" className={linkClass}>Dashboard</NavLink>
                                <NavLink to="/admin/events/new" className={linkClass}>Create Event</NavLink>
                            </>
                        )}
                    </div>

<span className="hidden sm:inline-flex items-center gap-2 text-sm mx-4 font-medium text-slate-500 capitalize">
    <UserCircle size={20} className="text-slate-400 shrink-0" />
    {user.name}
</span>
                    <button
                        onClick={handleLogout}
                        className="ml-3 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 sm:ml-0"
                    >
                        Logout
                    </button>
          </div>
            </div>
        </nav>
    )
}

export default Navbar