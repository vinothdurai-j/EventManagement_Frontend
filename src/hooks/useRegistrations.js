import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    registerForEventApi,
    getMyRegistrationsApi,
    cancelRegistrationApi,
    getEventRegistrationsApi
} from '../api/registrationApi'

export const useMyRegistrations = (enabled = true) =>
    useQuery({
        queryKey: ['registrations', 'my'],
        queryFn: getMyRegistrationsApi,
        enabled
    })

export const useEventRegistrations = (eventId, status) =>
    useQuery({
        queryKey: ['registrations', 'event', eventId, status],
        queryFn: () => getEventRegistrationsApi({ eventId, status }),
        enabled: !!eventId
    })

// Register / cancel panna seats count maarum, so registrations + events rendum refresh
const useRegistrationMutation = (mutationFn) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['registrations'] })
            queryClient.invalidateQueries({ queryKey: ['events'] })
        }
    })
}

export const useRegisterForEvent = () => useRegistrationMutation(registerForEventApi)
export const useCancelRegistration = () => useRegistrationMutation(cancelRegistrationApi)