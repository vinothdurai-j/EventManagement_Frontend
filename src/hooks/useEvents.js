import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import {
    getActiveEventsApi,
    getEventByIdApi,
    getAllEventsForAdminApi,
    createEventApi,
    updateEventApi,
    updateEventStatusApi,
    deleteEventApi
} from '../api/eventApi'

// ---------- Queries ----------

export const useActiveEvents = (filters) =>
    useQuery({
        queryKey: ['events', 'active', filters],
        queryFn: () => getActiveEventsApi(filters),
        placeholderData: keepPreviousData
    })

export const useEvent = (id) =>
    useQuery({
        queryKey: ['events', 'detail', id],
        queryFn: () => getEventByIdApi(id),
        enabled: !!id
    })

export const useAdminEvents = () =>
    useQuery({
        queryKey: ['events', 'admin'],
        queryFn: getAllEventsForAdminApi
    })

// ---------- Mutations (success aana ellaa events cache-um refresh aagum) ----------

const useEventMutation = (mutationFn) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] })
    })
}

export const useCreateEvent = () => useEventMutation(createEventApi)
export const useUpdateEvent = () => useEventMutation(updateEventApi)
export const useUpdateEventStatus = () => useEventMutation(updateEventStatusApi)
export const useDeleteEvent = () => useEventMutation(deleteEventApi)