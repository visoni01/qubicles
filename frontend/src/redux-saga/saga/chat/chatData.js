/* eslint-disable complexity */
import _ from 'lodash'
import { takeEvery, put, select } from 'redux-saga/effects'
import { getChatNotificationMessage, getUniqueId } from '../../../utils/common'
import {
  chatDataRequestStart,
  chatDataRequestSuccess,
  chatDataRequestFailed,
  showErrorMessage,
  updateAllChats,
  updateConversations,
  showSuccessMessage,
} from '../../redux/actions'
import Chat from '../../service/chat'

function* chatDataWatcher() {
  yield takeEvery(chatDataRequestStart.type, chatDataWorker)
}

function* chatDataWorker(action) {
  try {
    const {
      requestType, dataType, conversationId, members, candidateId, name, newGroupName, oldGroupName, offset,
    } = action.payload

    switch (requestType) {
      case 'FETCH': {
        switch (dataType) {
          case 'current-chat': {
            const { data } = yield Chat.getChatData({ conversationId })

            yield put(chatDataRequestSuccess({
              requestType, dataType, conversationId, conversationData: data,
            }))
            break
          }

          case 'chat-messages': {
            const { data } = yield Chat.getChatMessages({ conversationId, offset })

            yield put(chatDataRequestSuccess({
              olderMessages: data.messages, more: data.more, offset, conversationId, requestType, dataType,
            }))
            break
          }

          default: break
        }
        break
      }

      case 'UPDATE': {
        switch (dataType) {
          case 'mark-as-read': {
            yield Chat.markChatAsRead({ conversationId })
            yield put(chatDataRequestSuccess({ conversationId, requestType, dataType }))
            yield put(updateAllChats({ dataType, conversationId }))
            break
          }

          case 'add-people': {
            yield Chat.addPeople({
              conversationId,
              user_ids: members && members.map((user) => user.id),
            })

            const { userDetails } = yield select((state) => state.login)

            const newMessage = {
              messageId: getUniqueId(),
              senderId: userDetails && userDetails.user_id,
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

            yield put(chatDataRequestSuccess({
              newMembers: members, dataType, requestType, conversationId,
            }))
            yield put(updateConversations({
              newMessage, dataType: 'new-message', requestType, conversationId,
            }))
            break
          }

          case 'remove-person': {
            yield Chat.removePerson({ conversationId, candidateId })

            const { userDetails } = yield select((state) => state.login)

            const newMessage = {
              messageId: getUniqueId(),
              senderId: userDetails && userDetails.user_id,
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

            yield put(chatDataRequestSuccess({
              removedPersonId: candidateId, dataType, requestType, conversationId,
            }))
            yield put(updateConversations({
              newMessage, dataType: 'new-message', requestType, conversationId,
            }))
            yield put(showSuccessMessage({
              msg: `You have successfully removed ${ name }!`,
            }))

            const { conversations } = yield select((state) => state.chatData)
            const currentCoversation = conversations.find((conversation) => conversation.data.conversationId
              === conversationId)
            const conversationData = currentCoversation?.data

            if (_.isEmpty(conversationData.groupName)) {
              const groupName = conversationData.candidatesInfo?.map((member) => member.name).join(', ')
              yield put(updateAllChats({ dataType: 'change-group-name', conversationId, newGroupName: groupName }))
            }
            break
          }

          case 'change-group-name': {
            yield Chat.changeGroupName({
              conversationId,
              group_title: newGroupName,
            })

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
              messageId: getUniqueId(),
              senderId: userDetails && userDetails.user_id,
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

            yield put(chatDataRequestSuccess({
              newGroupName, dataType, requestType, conversationId,
            }))
            yield put(updateConversations({
              newMessage, dataType: 'new-message', requestType, conversationId,
            }))

            const { conversations } = yield select((state) => state.chatData)
            const chatData = conversations.find((conversation) => conversation.data.conversationId === conversationId)
            const chat = chatData?.data
            const groupName = newGroupName
              || (chat.candidatesInfo && chat.candidatesInfo.map((member) => member.name).join(', '))

            yield put(updateAllChats({ dataType, conversationId, newGroupName: groupName }))
            break
          }

          case 'leave-group': {
            const { userDetails } = yield select((state) => state.login)

            yield Chat.removePerson({ conversationId, candidateId: userDetails && userDetails.user_id })

            const newMessage = {
              messageId: getUniqueId(),
              senderId: userDetails && userDetails.user_id,
              text: getChatNotificationMessage({
                type: 'leave-group',
                payload: {
                  userId: userDetails && userDetails.user_id,
                  userName: userDetails && userDetails.full_name,
                },
              }),
              isNotification: true,
              sentAt: Date.now(),
              isRead: true,
            }

            yield put(chatDataRequestSuccess({
              requestType, dataType, conversationId, newMessage, userId: userDetails && userDetails.user_id,
            }))

            const { conversations } = yield select((state) => state.chatData)
            const currentCoversation = conversations.find((conversation) => conversation.data.conversationId
              === conversationId)
            const conversationData = currentCoversation?.data
            let groupName

            if (_.isEmpty(conversationData.groupName)) {
              groupName = conversationData.candidatesInfo?.map((member) => member.name).join(', ')
            }

            yield put(updateAllChats({
              dataType, conversationId, newMessage, newGroupName: groupName,
            }))
            break
          }

          default: break
        }
        break
      }

      default: break
    }
  } catch (e) {
    yield put(chatDataRequestFailed({ conversationId: action.payload && action.payload.conversationId }))
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default chatDataWatcher
