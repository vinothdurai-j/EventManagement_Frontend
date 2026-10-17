export const getErrorMessage = (error) =>
    error?.response?.data?.message || error?.message || 'Something went wrong'


export const formatDate = (date) =>
    new Date(date).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
    })


    // ISO date -> <input type="datetime-local"> value (local timezone)
export const toInputDate = (date) => {
    const d = new Date(date)
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}