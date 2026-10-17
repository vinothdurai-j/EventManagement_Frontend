import axiosInstance from './axios'

// User
export const registerForEventApi = async (eventId) => {
    const res = await axiosInstance.post('/eventRegister/register', { eventId })
    return res.data.data
}

export const getMyRegistrationsApi = async () => {
    const res = await axiosInstance.get('/eventRegister/getMyRegistrations')
    return res.data.data
}

export const cancelRegistrationApi = async (id) => {
    const res = await axiosInstance.patch(`/eventRegister/cancelRegistration/${id}`)
    return res.data.data
}

// Admin
export const getEventRegistrationsApi = async ({ eventId, status }) => {
    const res = await axiosInstance.get(`/eventRegister/getEventRegistrations/${eventId}`, {
        params: status ? { status } : {}
    })
    return res.data.data
}