import { useProfile } from '../hooks/useProfile'
import { getErrorMessage } from '../utilis/format'

const Profile = () => {
    const { data: profile, isPending, isError, error } = useProfile()

    if (isPending) return <p className="max-w-md mx-auto px-4 py-6 text-gray-500">Loading...</p>

    if (isError) {
        return (
            <div className="max-w-md mx-auto px-4 py-6">
                <p className="p-3 rounded bg-red-100 text-red-700 text-sm">{getErrorMessage(error)}</p>
            </div>
        )
    }

    const rows = [
        ['Name', profile.name],
        ['Email', profile.email],
        ['Phone', profile.phone],
        ['Role', profile.role]
    ]

    return (
        <div className="max-w-md mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>

            <div className="bg-white rounded-xl shadow divide-y">
                {rows.map(([label, value]) => (
                    <div key={label} className="flex justify-between px-5 py-3">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-medium">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Profile