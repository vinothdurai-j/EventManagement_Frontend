import axiosInstance from './axios'

// User
export const getActiveEventsApi = async (params) => {
    const res = await axiosInstance.get('/event/getActiveEvents', { params })
    return res.data.data
}

// User + Admin
export const getEventByIdApi = async (id) => {
    const res = await axiosInstance.get(`/event/getEventById/${id}`)
    return res.data.data
}

// Admin
export const getAllEventsForAdminApi = async () => {
    const res = await axiosInstance.get('/event/getAllEventsForAdmin')
    return res.data.data
}

export const createEventApi = async (data) => {
    const res = await axiosInstance.post('/event/createEvent', data)
    return res.data.data
}

export const updateEventApi = async ({ id, data }) => {
    const res = await axiosInstance.put(`/event/updateEvent/${id}`, data)
    return res.data.data
}

export const updateEventStatusApi = async ({ id, status }) => {
    const res = await axiosInstance.patch(`/event/updateEventStatus/${id}`, { status })
    return res.data.data
}

export const deleteEventApi = async (id) => {
    const res = await axiosInstance.delete(`/event/deleteEvent/${id}`)
    return res.data
}