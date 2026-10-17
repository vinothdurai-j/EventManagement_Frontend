import axiosInstance from './axios'

export const getProfileApi = async () => {
    const res = await axiosInstance.get('/user/getProfile')
    return res.data.data
}