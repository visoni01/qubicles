/* eslint-disable complexity */
import _ from 'lodash'
import { takeEvery, put, select } from 'redux-saga/effects'
import { getChatNotificationMessage, getUniqueId } from '../../../utils/common'
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
      requestType, dataType, conversationId, members, candidateId, name, newGroupName, oldGroupName,
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

            const { userDetails } = yield select((state) => state.login)

            const newMessage = {
              msgId: getUniqueId(),
              candidateId: userDetails && userDetails.user_id,
              text: getChatNotificationMessage({
                type: dataType,
                payload: {
                  userId: userDetails && userDetails.user_id,
                  userName: userDetails && userDetails.full_name,
                  usersName: members && members.map((item) => item.name).join(', '),
                },
              }),
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
              text: getChatNotificationMessage({
                type: dataType,
                payload: {
                  userId: userDetails && userDetails.user_id,
                  userName: userDetails && userDetails.full_name,
                  otherUserId: candidateId,
                  otherUserName: name,
                },
              }),
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

          case 'change-group-name': {
            yield Chat.changeGroupName({ conversationId, newGroupName })

            const { userDetails } = yield select((state) => state.login)

            let type

            if (_.isEmpty(newGroupName)) {
              type = 'remove-group-name'
            } else if (_.isEmpty(oldGroupName)) {
              type = 'add-group-name'
            } else {
              type = 'change-group-name'
            }

            const newMessage = {
              msgId: getUniqueId(),
              candidateId: userDetails && userDetails.user_id,
              text: getChatNotificationMessage({
                type,
                payload: {
                  userId: userDetails && userDetails.user_id,
                  userName: userDetails && userDetails.full_name,
                  newGroupName,
                  oldGroupName,
                },
              }),
              isNotification: true,
              sentAt: Date.now(),
              isRead: true,
            }

            yield put(currentChatRequestSuccess({ newGroupName }))
            yield put(updateCurrentChat({ newMessage, dataType: 'new-message' }))

            const { chat } = yield select((state) => state.currentChat)
            const groupName = newGroupName
              || (chat.candidatesInfo && chat.candidatesInfo.map((member) => member.name).join(', '))

            yield put(updateAllChats({ dataType: 'change-group-name', conversationId, newGroupName: groupName }))
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
