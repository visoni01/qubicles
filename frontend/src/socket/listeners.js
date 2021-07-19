import { showSuccessMessage } from '../redux-saga/redux/utils'
import store from '../redux-saga/store'
import { EVENTS } from '../utils/messages'

const receiveNotification = {
  event: EVENTS.RECEIVE_NOTIFICATION,
  callback: (msg) => {
    // eslint-disable-next-line no-console
    console.log(msg)
    store.dispatch(showSuccessMessage({ msg }))
  },
}

export default [ receiveNotification ]
