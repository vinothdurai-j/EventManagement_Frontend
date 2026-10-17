import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ allowedRoles }) => {
    const { token, user } = useSelector((state) => state.auth)

    // login pannala -> login page
    if (!token || !user) {
        return <Navigate to="/login" replace />
    }

    // role match aagala -> avanga home page
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/events'} replace />
    }

    return <Outlet />
}

export default ProtectedRoute