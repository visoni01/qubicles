import { takeEvery, put } from 'redux-saga/effects'
import { notificationsFetchStart, notificationsFetchSuccessful, notificationsFetchFailure } from '../../redux/actions'
import User from '../../service/user'
import { showErrorMessage } from '../../redux/utils/snackbar'
import { REQUEST_TYPES } from '../../../utils/constants'

function* notificationsWatcher() {
  yield takeEvery(notificationsFetchStart.type, notificationsWorker)
}

function* notificationsWorker(action) {
  try {
    const {
      requestType, offset, notificationId, notificationIds,
    } = action.payload

    switch (requestType) {
      case REQUEST_TYPES.FETCH: {
        const { data } = yield User.getAllNotifications({ offset })
        yield put(notificationsFetchSuccessful({
          notifications: data.notifications,
          count: data.count,
          allRead: data.allRead,
        }))
        break
      }
      case REQUEST_TYPES.UPDATE: {
        const { data } = yield User.updateNotificationsReadStatus({ notificationIds })
        yield put(notificationsFetchSuccessful({
          notificationIds,
          allRead: data.allRead,
        }))
        break
      }
      case REQUEST_TYPES.DELETE: {
        const { data } = yield User.deleteNotification({ notificationId, offset: offset + 4 })
        yield put(notificationsFetchSuccessful({
          notificationId,
          offset: data.notification ? offset : (offset && offset - 1),
          allRead: data.allRead,
          newNotification: data.notification,
        }))
        break
      }
      default:
        break
    }
  } catch (e) {
    yield put(notificationsFetchFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default notificationsWatcher
