import { addNewNotification, deleteNotification } from '../redux-saga/redux/user'
import store from '../redux-saga/store'
import { EVENTS } from '../utils/messages'

const receiveNotification = {
  event: EVENTS.RECEIVE_NOTIFICATION,
  callback: (notification) => {
    store.dispatch(addNewNotification({ notification }))
  },
}

const removeNotification = {
  event: EVENTS.REMOVE_NOTIFICATION,
  callback: (data) => {
    store.dispatch(deleteNotification(data))
  },
}

export default [ receiveNotification, removeNotification ]
