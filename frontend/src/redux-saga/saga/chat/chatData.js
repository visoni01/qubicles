/* eslint-disable complexity */
import _ from 'lodash'
import { takeEvery, put, select } from 'redux-saga/effects'
import { CHAT_ROUTE } from '../../../routes/routesPath'
import WebSocket from '../../../socket'
import {
  formatConversationRoomId, getFormattedChatNotificationMessage, playNotificationAudio,
} from '../../../utils/common'
import {
  chatDataRequestStart,
  chatDataRequestSuccess,
  chatDataRequestFailed,
  showErrorMessage,
  updateAllChats,
  updateConversations,
  updateChatPopups,
  showSuccessMessage,
  updateCurrentChatId,
} from '../../redux/actions'
import Chat from '../../service/chat'

function* chatDataWatcher() {
  yield takeEvery(chatDataRequestStart.type, chatDataWorker)
}

function* chatDataWorker(action) {
  try {
    const {
      requestType, dataType, conversationId, members, candidateId, name, newGroupName, oldGroupName, offset,
      updateAllChat,
    } = action.payload

    switch (requestType) {
      case 'FETCH': {
        switch (dataType) {
          case 'current-chat': {
            const { data } = yield Chat.getChatData({ conversationId })

            yield put(chatDataRequestSuccess({
              requestType, dataType, conversationId, conversationData: data,
            }))

            const { conversations } = yield select((state) => state.chatData)
            const currentCoversation = conversations.find((conversation) => (
            conversation?.data?.conversationId === conversationId
            ))
            const conversationData = currentCoversation?.data

            if (conversations?.length === 1) {
              yield put(updateCurrentChatId({ conversationId }))
            }

            if (updateAllChat) {
              if (conversationData && window.location.pathname === CHAT_ROUTE) {
                const {
                  isGroup, groupName, candidatesInfo, chatData, allRead, isRemoved,
                } = conversationData
                const lastMessage = chatData?.chats && chatData?.chats[chatData?.chats?.length - 1]

                yield put(updateAllChats({
                  dataType: 'new-chat',
                  newChat: {
                    id: conversationId,
                    name: isGroup
                      ? groupName || candidatesInfo?.map((item) => item.name).join(', ')
                      : candidatesInfo && candidatesInfo[ 0 ].name,
                    isGroup,
                    allRead,
                    isRemoved,
                    imageUrl: isGroup ? null : candidatesInfo && candidatesInfo[ 0 ].profilePic,
                    dateTime: lastMessage?.sentAt,
                    latestMessage: lastMessage?.text,
                    isNotification: lastMessage?.isNotification,
                    isImage: !!lastMessage?.imageUrl,
                  },
                }))
              }

              if (window.location.pathname !== CHAT_ROUTE) {
                yield put(updateChatPopups({
                  requestType: 'ADD',
                  conversationId,
                }))
              }

              playNotificationAudio()
            }
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
            yield Chat.addPeople({ conversationId, user_ids: members?.map((user) => user.id) })

            const { userDetails } = yield select((state) => state.login)
            const { conversations } = yield select((state) => state.chatData)

            const currentCoversation = conversations.find((conversation) => conversation?.data?.conversationId
              === conversationId)
            const conversationData = currentCoversation?.data
            const userId = userDetails && userDetails.user_id
            const roomId = formatConversationRoomId(conversationId)
            const newMessage = getFormattedChatNotificationMessage({
              senderId: userId,
              type: dataType,
              payload: {
                userId,
                userName: userDetails && userDetails.full_name,
                usersName: members?.map((item) => item.name).join(', '),
              },
            })

            WebSocket.joinChatRoomForOtherUsers({
              userIds: members?.map((user) => user.id?.toString()),
              roomId,
              senderId: userId?.toString(),
              messageToBeSent: {
                to: roomId,
                from: userId,
                messages: [ { ...newMessage, isRead: false } ],
                dataType: 'add-people',
                payload: {
                  userIds: [
                    ...conversationData.candidatesInfo,
                    ...members,
                  ].map((user) => user.id).filter((id) => id !== userId),
                  newMembers: members,
                },
              },
            })

            yield put(chatDataRequestSuccess({
              newMembers: members, dataType, requestType, conversationId,
            }))
            yield put(updateConversations({
              newMessage, dataType: 'new-message', requestType, conversationId,
            }))
            yield put(updateAllChats({
              dataType: 'add-people',
              conversationId,
              newGroupName: _.isEmpty(conversationData.groupName) && [
                ...conversationData.candidatesInfo,
                ...members,
              ].map((member) => member.name).join(', '),
              latestMessage: newMessage?.text,
            }))

            break
          }

          case 'remove-person': {
            yield Chat.removePerson({ conversationId, candidateId })

            const { userDetails } = yield select((state) => state.login)
            const { conversations } = yield select((state) => state.chatData)

            const currentCoversation = conversations.find((conversation) => conversation?.data?.conversationId
              === conversationId)
            const conversationData = currentCoversation?.data
            const userId = userDetails && userDetails.user_id
            const roomId = formatConversationRoomId(conversationId)
            const newMessage = getFormattedChatNotificationMessage({
              senderId: userId,
              type: dataType,
              payload: {
                userId,
                userName: userDetails && userDetails.full_name,
                otherUserId: candidateId,
                otherUserName: name,
              },
            })

            WebSocket.sendMessage({
              to: roomId,
              from: userId,
              messages: [ { ...newMessage, isRead: false } ],
              dataType: 'remove-person',
              payload: {
                userIds: conversationData?.candidatesInfo?.map((user) => user.id)?.filter((id) => id !== userId),
                removedPersonId: candidateId,
              },
            })

            WebSocket.leaveChatRoomForOtherUser({
              userId: candidateId?.toString(),
              roomId,
            })

            yield put(chatDataRequestSuccess({
              removedPersonId: candidateId, dataType, requestType, conversationId,
            }))
            yield put(updateConversations({
              newMessage, dataType: 'new-message', requestType, conversationId,
            }))
            yield put(showSuccessMessage({
              msg: `You have successfully removed ${ name }!`,
            }))

            if (_.isEmpty(conversationData.groupName)) {
              yield put(updateAllChats({
                dataType: 'change-group-name',
                conversationId,
                newGroupName: conversationData.candidatesInfo?.filter((user) => user.id !== candidateId)
                  .map((member) => member.name).join(', '),
              }))
            }
            break
          }

          case 'change-group-name': {
            yield Chat.changeGroupName({
              conversationId,
              group_title: newGroupName,
            })

            const { userDetails } = yield select((state) => state.login)
            const { conversations } = yield select((state) => state.chatData)

            let type
            const currentCoversation = conversations.find((conversation) => conversation?.data?.conversationId
              === conversationId)
            const conversationData = currentCoversation?.data
            const userId = userDetails && userDetails.user_id

            if (_.isEmpty(newGroupName)) {
              type = 'remove-group-name'
            } else if (_.isEmpty(oldGroupName)) {
              type = 'add-group-name'
            } else {
              type = 'change-group-name'
            }

            const newMessage = getFormattedChatNotificationMessage({
              senderId: userId,
              type,
              payload: {
                userId,
                userName: userDetails && userDetails.full_name,
                newGroupName,
                oldGroupName,
              },
            })

            WebSocket.sendMessage({
              to: formatConversationRoomId(conversationId),
              from: userId,
              messages: [ { ...newMessage, isRead: false } ],
              dataType: 'change-group-name',
              payload: {
                userIds: conversationData?.candidatesInfo?.map((user) => user.id)?.filter((id) => id !== userId),
                newGroupName: newGroupName
                  || (conversationData?.candidatesInfo.map((member) => member.name).join(', ')),
              },
            })

            yield put(chatDataRequestSuccess({
              newGroupName, dataType, requestType, conversationId,
            }))
            yield put(updateConversations({
              newMessage, dataType: 'new-message', requestType, conversationId,
            }))
            yield put(updateAllChats({
              dataType,
              conversationId,
              newGroupName: newGroupName
                || (conversationData?.candidatesInfo.map((member) => member.name).join(', ')),
              latestMessage: newMessage?.text,
              isNotification: true,
            }))
            break
          }

          case 'leave-group': {
            const { userDetails } = yield select((state) => state.login)
            const { conversations } = yield select((state) => state.chatData)

            const currentCoversation = conversations.find((conversation) => conversation?.data?.conversationId
              === conversationId)
            const conversationData = currentCoversation?.data
            const userId = userDetails && userDetails.user_id

            yield Chat.removePerson({ conversationId, candidateId: userId })

            const roomId = formatConversationRoomId(conversationId)
            const newMessage = getFormattedChatNotificationMessage({
              senderId: userId,
              type: 'leave-group',
              payload: {
                userId,
                userName: userDetails && userDetails.full_name,
              },
            })

            WebSocket.sendMessage({
              to: roomId,
              from: userId,
              messages: [ { ...newMessage, isRead: false } ],
              dataType: 'remove-person',
              payload: {
                userIds: conversationData?.candidatesInfo?.map((user) => user.id)?.filter((id) => id !== userId),
                removedPersonId: userId,
              },
            })

            WebSocket.leaveChatRoom(roomId)

            yield put(chatDataRequestSuccess({
              requestType, dataType, conversationId, newMessage, userId,
            }))
            yield put(updateAllChats({
              dataType,
              conversationId,
              newMessage: newMessage?.text,
              newGroupName: _.isEmpty(conversationData.groupName)
                && conversationData.candidatesInfo?.filter((user) => user.id !== userId)
                  .map((member) => member.name).join(', '),
            }))
            break
          }

          case 'delete-chat': {
            const { data } = yield Chat.deleteChat({ conversationId })

            yield put(chatDataRequestSuccess({
              requestType, dataType, conversationId, latestDeletedMessageId: data,
            }))

            const { conversations } = yield select((state) => state.chatData)
            const conversationData = conversations?.find((conversation) => (
              conversation?.data?.conversationId === conversationId
            ))

            if (conversationData?.data?.chatData?.chats?.length === 0) {
              yield put(updateAllChats({
                dataType: 'delete-chat',
                conversationId,
              }))

              yield put(showSuccessMessage({ msg: 'Chat deleted successfully!' }))
            }
            break
          }

          default: break
        }
        break
      }

      default: break
    }
  } catch (e) {
    yield put(chatDataRequestFailed({ conversationId: action.payload?.conversationId }))
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default chatDataWatcher
