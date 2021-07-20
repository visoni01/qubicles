import { addNewNotification } from '../redux-saga/redux/user'
import store from '../redux-saga/store'
import { EVENTS } from '../utils/messages'

const receiveNotification = {
  event: EVENTS.RECEIVE_NOTIFICATION,
  callback: (notification) => {
    store.dispatch(addNewNotification({ notification }))
  },
}

export default [ receiveNotification ]
