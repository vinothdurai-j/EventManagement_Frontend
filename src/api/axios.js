import axios from 'axios'
import { getToken, getStoredUser, clearAuth } from '../utilis/storage'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken()

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoginRequest = error.config?.url?.includes('/login')

        if (error.response?.status === 401 && getToken() && !isLoginRequest) {
            const user = getStoredUser()
            clearAuth()

            window.location.href = user?.role === 'admin' ? '/admin/login' : '/login'
        }

        return Promise.reject(error)
    }
)

export default axiosInstance