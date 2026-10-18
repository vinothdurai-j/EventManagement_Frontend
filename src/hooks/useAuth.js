import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { loginUserApi, loginAdminApi, registerUserApi } from '../api/authApi'
import { setCredentials } from '../store/authSlice'
import { useToast } from './useToast'

export const useLoginUser = () => {
    const dispatch = useDispatch()
    const toast = useToast()

    return useMutation({
        mutationFn: loginUserApi,
        onSuccess: (data) => {
            dispatch(setCredentials(data))
            toast.success(`Welcome back, ${data.user.name}!`)
        }
    })
}

export const useLoginAdmin = () => {
    const dispatch = useDispatch()
    const toast = useToast()

    return useMutation({
        mutationFn: loginAdminApi,
        onSuccess: (data) => {
            dispatch(setCredentials(data))
            toast.success(`Welcome back, ${data.user.name}!`)
        }
    })
}

export const useRegisterUser = () => useMutation({ mutationFn: registerUserApi })