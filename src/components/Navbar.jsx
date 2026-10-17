import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQueryClient } from '@tanstack/react-query'
import { logout } from '../store/authSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { token, user } = useSelector((state) => state.auth)

    // login pannala na navbar venam
    if (!token || !user) return null

    const handleLogout = () => {
        const loginPath = user.role === 'admin' ? '/admin/login' : '/login'

        dispatch(logout())
        queryClient.clear() // munnaadhu user data next user-ku kaattaama irukka
        navigate(loginPath, { replace: true })
    }

    const linkClass = ({ isActive }) =>
        `px-3 py-2 rounded text-sm ${isActive ? 'bg-blue-700' : 'hover:bg-blue-500'}`

    return (
        <nav className="bg-blue-600 text-white">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                <Link to={user.role === 'admin' ? '/admin/dashboard' : '/events'} className="font-bold text-lg">
                    Event Manager
                </Link>

                <div className="flex items-center gap-1">
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

                    <span className="hidden sm:inline text-sm mx-3 opacity-80">{user.name}</span>

                    <button
                        onClick={handleLogout}
                        className="px-3 py-1.5 bg-white text-blue-600 rounded text-sm font-medium hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar