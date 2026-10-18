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

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                            <tr>
                                <th className="px-5 py-3.5 font-medium whitespace-nowrap">Field</th>
                                <th className="px-5 py-3.5 font-medium whitespace-nowrap">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rows.map(([label, value]) => (
                                <tr key={label} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{label}</td>
                                    <td className="px-5 py-4 font-medium text-gray-900">
                                        {label === 'Role' ? (
                                            <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">
                                                {value}
                                            </span>
                                        ) : (
                                            value || '-'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Profile