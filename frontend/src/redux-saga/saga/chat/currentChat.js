import { takeEvery, put } from 'redux-saga/effects'
import {
  currentChatRequestStart,
  currentChatRequestSuccess,
  currentChatRequestFailed,
  showErrorMessage,
} from '../../redux/actions'
import Chat from '../../service/chat'

function* currentChatWatcher() {
  yield takeEvery(currentChatRequestStart.type, currentChatWorker)
}

function* currentChatWorker(action) {
  try {
    const { requestType, dataType, conversationId } = action.payload

    switch (requestType) {
      case 'FETCH': {
        switch (dataType) {
          case 'current-chat': {
            const { data } = yield Chat.getChatById({ conversationId })
            yield put(currentChatRequestSuccess({ chat: data }))
            break
          }

          default: break
        }
        break
      }

      case 'UPDATE': {
        switch (dataType) {
          default: break
        }
        break
      }

      default: break
    }
  } catch (e) {
    yield put(currentChatRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default currentChatWatcher
