import { showSuccessMessage } from '../redux-saga/redux/utils'
import store from '../redux-saga/store'
import { EVENTS } from '../utils/messages'

const receiveNotification = {
  event: EVENTS.RECEIVE_NOTIFICATION,
  callback: (notification) => {
    // eslint-disable-next-line no-console
    console.log(notification)
    store.dispatch(showSuccessMessage({ msg: notification.message }))
  },
}

export default [ receiveNotification ]
