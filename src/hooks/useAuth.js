import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { loginUserApi, loginAdminApi, registerUserApi } from '../api/authApi'
import { setCredentials } from '../store/authSlice'

export const useLoginUser = () => {
    const dispatch = useDispatch()

    return useMutation({
        mutationFn: loginUserApi,
        onSuccess: (data) => dispatch(setCredentials(data))
    })
}

export const useLoginAdmin = () => {
    const dispatch = useDispatch()

    return useMutation({
        mutationFn: loginAdminApi,
        onSuccess: (data) => dispatch(setCredentials(data))
    })
}

export const useRegisterUser = () => useMutation({ mutationFn: registerUserApi })