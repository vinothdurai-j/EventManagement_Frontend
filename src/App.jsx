import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import Register from './pages/Register'

import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import MyRegistrations from './pages/MyRegistrations'
import Profile from './pages/Profile'

import AdminDashboard from './pages/AdminDashboard'
import AdminEventForm from './pages/AdminEventForm'
import AdminRegistrations from './pages/AdminRegistrations'

// Already login panna user login/register page-ku poga koodadhu
const PublicRoute = ({ children }) => {
    const { token, user } = useSelector((state) => state.auth)

    if (token && user) {
        return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/events'} replace />
    }

    return children
}

const App = () => {
    return (
        <>
            <Navbar />

            <Routes>
                {/* Public */}
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/admin/login" element={<PublicRoute><AdminLogin /></PublicRoute>} />

                {/* User only */}
                <Route element={<ProtectedRoute allowedRoles={['user']} />}>
                    <Route path="/events" element={<Events />} />
                    <Route path="/my-registrations" element={<MyRegistrations />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Admin & User (backend getEventById rendu perukum allow) */}
                <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
                    <Route path="/events/:id" element={<EventDetails />} />
                </Route>

                {/* Admin only */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/events/new" element={<AdminEventForm />} />
                    <Route path="/admin/events/:id/edit" element={<AdminEventForm />} />
                    <Route path="/admin/events/:id/registrations" element={<AdminRegistrations />} />
                </Route>

                {/* Default + 404 */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </>
    )
}

export default App