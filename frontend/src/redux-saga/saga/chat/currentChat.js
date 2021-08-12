import { takeEvery, put } from 'redux-saga/effects'
import {
  currentChatRequestStart,
  currentChatRequestSuccess,
  currentChatRequestFailed,
  updateAllChats,
  showErrorMessage,
} from '../../redux/actions'
import Chat from '../../service/chat'

function* currentChatWatcher() {
  yield takeEvery(currentChatRequestStart.type, currentChatWorker)
}

function* currentChatWorker(action) {
  try {
    const {
      requestType, dataType, conversationId, members, candidateId,
    } = action.payload

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
          case 'add-people': {
            yield Chat.addPeople({ conversationId, members })
            yield put(currentChatRequestSuccess({ newMembers: members }))
            break
          }

          case 'remove-person': {
            yield Chat.addPeople({ conversationId, candidateId })
            yield put(currentChatRequestSuccess({ removedPersonId: candidateId }))
            break
          }

          case 'mark-as-read': {
            yield Chat.markChatAsRead({ conversationId })
            yield put(currentChatRequestSuccess())
            yield put(updateAllChats({ dataType: 'mark-as-read', conversationId }))
            break
          }

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
