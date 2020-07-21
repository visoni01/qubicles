import { axiosInst } from './apiClient'
import { showErrorMessage } from '../redux-saga/redux/snackbar'

export const interceptors = (history, dispatch) => {
  axiosInst.interceptors.response.use((response) => response, (error) => {
    const { response } = error
    const { status, statusText, data } = response
    switch (status) {
      case 401:
        history.push('/login')
        dispatch(showErrorMessage({ msg: `${ statusText }: ${ data && data.message }` || 'You are not authorised' }))
        break
      case 404:
        history.push('/login')
        dispatch(showErrorMessage({ msg: 'Page not found' }))
        break
      case 500:
        dispatch(showErrorMessage({ msg: 'Internal server error' }))
        break
      default:
        dispatch(showErrorMessage({ msg: statusText }))
    }
    return Promise.reject(error)
  })
}

export default interceptors
