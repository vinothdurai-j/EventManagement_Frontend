import { useQuery } from '@tanstack/react-query'
import { getProfileApi } from '../api/userApi'

export const useProfile = () =>
    useQuery({
        queryKey: ['profile'],
        queryFn: getProfileApi
    })