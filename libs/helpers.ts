import { AppDispatch } from './../src/store/store'
import { ERROR, SUCCESS } from '../src/store/dom'

export const showError = (dispatch: any) => {
    dispatch(ERROR())
    setTimeout(() => {
        dispatch(ERROR())
    }, 2000)
}

export const showSuccess = (dispatch: any) => {
    dispatch(SUCCESS())
    setTimeout(() => {
        dispatch(SUCCESS())
    }, 2700)
}
