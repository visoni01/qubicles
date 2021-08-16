/* eslint-disable complexity */
import { takeEvery, put, select } from 'redux-saga/effects'
import { getUniqueId } from '../../../utils/common'
import {
  currentChatRequestStart,
  currentChatRequestSuccess,
  currentChatRequestFailed,
  updateAllChats,
  showErrorMessage,
  updateCurrentChat,
} from '../../redux/actions'
import Chat from '../../service/chat'

function* currentChatWatcher() {
  yield takeEvery(currentChatRequestStart.type, currentChatWorker)
}

function* currentChatWorker(action) {
  try {
    const {
      requestType, dataType, conversationId, members, candidateId, name,
    } = action.payload

    switch (requestType) {
      case 'FETCH': {
        switch (dataType) {
          case 'current-chat': {
            const { data } = yield Chat.getChatById({ conversationId })
            const groupName = data.groupName
              || (data.candidatesInfo && data.candidatesInfo.map((item) => item.name).join(', '))

            yield put(currentChatRequestSuccess({ chat: { ...data, groupName } }))
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

            const { userDetails } = yield select((state) => state.login)

            const newMessage = {
              msgId: getUniqueId(),
              candidateId: userDetails && userDetails.user_id,
              text: `<span><b>${ userDetails && userDetails.full_name }</b> added <b>${
                members && members.map((item) => item.name).join(', ') }</b></span>`,
              isNotification: true,
              sentAt: Date.now(),
              isRead: true,
            }

            yield put(currentChatRequestSuccess({ newMembers: members }))
            yield put(updateCurrentChat({ newMessage, dataType: 'new-message' }))
            break
          }

          case 'remove-person': {
            yield Chat.addPeople({ conversationId, candidateId })

            const { userDetails } = yield select((state) => state.login)

            const newMessage = {
              msgId: getUniqueId(),
              candidateId: userDetails && userDetails.user_id,
              text: `<span><b>${ userDetails && userDetails.full_name }</b> removed <b>${ name }</b></span>`,
              isNotification: true,
              sentAt: Date.now(),
              isRead: true,
            }

            yield put(currentChatRequestSuccess({ removedPersonId: candidateId }))
            yield put(updateCurrentChat({ newMessage, dataType: 'new-message' }))
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
