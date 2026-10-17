import axiosInstance from './axios'

export const loginUserApi = async (credentials) => {
    const res = await axiosInstance.post('/user/login', credentials)
    return res.data.data
}

export const loginAdminApi = async (credentials) => {
    const res = await axiosInstance.post('/admin/login', credentials)
    return res.data.data
}

export const registerUserApi = async (formData) => {
    const res = await axiosInstance.post('/user/register', formData)
    return res.data.data
}