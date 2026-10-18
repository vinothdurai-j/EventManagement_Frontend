import { useDispatch } from 'react-redux'
import { openConfirm } from '../store/confirmSlice'

export const useConfirm = () => {
    const dispatch = useDispatch()

    return ({ title, message, confirmText, onConfirm }) =>
        dispatch(openConfirm({ title, message, confirmText, onConfirm }))
}