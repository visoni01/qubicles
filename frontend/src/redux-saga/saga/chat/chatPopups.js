/* eslint-disable complexity */
import { takeEvery, put } from 'redux-saga/effects'
import {
  chatPopupsRequestStart,
  chatPopupsRequestSuccess,
  chatPopupsRequestFailed,
  showErrorMessage,
} from '../../redux/actions'
import Chat from '../../service/chat'

function* chatPopupsWatcher() {
  yield takeEvery(chatPopupsRequestStart.type, chatPopupsWorker)
}

function* chatPopupsWorker(action) {
  try {
    const {
      requestType, conversationId, dataType,
    } = action.payload

    switch (requestType) {
      case 'ADD': {
        const response = yield Chat.createNewPopup({ conversationId })
        yield put(chatPopupsRequestSuccess({ data: response, requestType }))
        break
      }

      case 'FETCH': {
        // WIP
        yield put(chatPopupsRequestSuccess({ data: {}, requestType }))
        break
      }

      case 'UPDATE': {
        switch (dataType) {
          case 'mark-as-read': {
            yield Chat.markChatAsRead({ conversationId })
            yield put(chatPopupsRequestSuccess({ conversationId, requestType, dataType }))
            break
          }

          default: break
        }
        break
      }

      default: break
    }
  } catch (e) {
    yield put(chatPopupsRequestFailed({ conversationId: action.payload && action.payload.conversationId }))
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default chatPopupsWatcher
