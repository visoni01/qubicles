/* eslint-disable complexity */
import _ from 'lodash'
import { takeEvery, put, select } from 'redux-saga/effects'
import WebSocket from '../../../socket'
import Chat from '../../service/chat'
import { CHAT_ROUTE } from '../../../routes/routesPath'
import { REQUEST_TYPES, CHAT_NOTIFICATION_MESSAGES } from '../../../utils/constants'
import {
  formatConversationRoomId, getFormattedChatNotificationMessage, playNotificationAudio,
} from '../../../utils/common'
import {
  ADD_PEOPLE, CHANGE_GROUP_NAME, CHAT_MESSAGES, CURRENT_CHAT, DELETE_CHAT, LEAVE_GROUP, MARK_AS_READ, NEW_CHAT,
  NEW_MESSAGE, REMOVE_PERSON,
} from '../../redux/constants'
import {
  chatDataRequestStart, chatDataRequestSuccess, chatDataRequestFailed, showErrorMessage, updateAllChats,
  updateConversations, updateChatPopups, showSuccessMessage, updateCurrentChatId,
} from '../../redux/actions'

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
      case REQUEST_TYPES.FETCH: {
        switch (dataType) {
          case CURRENT_CHAT: {
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
                  dataType: NEW_CHAT,
                  newChat: {
                    id: conversationId,
                    name: isGroup
                      ? groupName || candidatesInfo?.map((item) => item.name).join(', ')
                      : candidatesInfo && candidatesInfo[ 0 ].name,
                    isGroup,
                    imageUrl: isGroup ? null : candidatesInfo && candidatesInfo[ 0 ].profilePic,
                    latestMessage: lastMessage?.text,
                    isRemoved,
                    allRead,
                    isImage: !!lastMessage?.imageUrl,
                    isNotification: lastMessage?.isNotification,
                    dateTime: lastMessage?.sentAt,
                  },
                }))
              }

              if (window.location.pathname !== CHAT_ROUTE) {
                yield put(updateChatPopups({
                  requestType: REQUEST_TYPES.ADD,
                  conversationId,
                }))
              }

              playNotificationAudio()
            }
            break
          }

          case CHAT_MESSAGES: {
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

      /* eslint-disable camelcase */
      case REQUEST_TYPES.UPDATE: {
        switch (dataType) {
          case MARK_AS_READ: {
            yield Chat.markChatAsRead({ conversationId })
            yield put(chatDataRequestSuccess({ conversationId, requestType, dataType }))
            yield put(updateAllChats({ dataType, conversationId, allRead: true }))
            break
          }

          case ADD_PEOPLE: {
            yield Chat.addPeople({ conversationId, user_ids: members?.map((user) => user.id) })

            const { userDetails } = yield select((state) => state.login)
            const { conversations } = yield select((state) => state.chatData)

            const currentCoversation = conversations.find((conversation) => conversation?.data?.conversationId
              === conversationId)
            const conversationData = currentCoversation?.data
            const userId = userDetails?.user_id
            const roomId = formatConversationRoomId(conversationId)
            const newMessage = getFormattedChatNotificationMessage({
              senderId: userId,
              type: CHAT_NOTIFICATION_MESSAGES.ADD_PEOPLE,
              payload: {
                userId,
                userName: userDetails?.full_name,
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
                dataType,
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
              newMessage, dataType: NEW_MESSAGE, requestType, conversationId,
            }))
            yield put(updateAllChats({
              dataType,
              conversationId,
              newGroupName: _.isEmpty(conversationData.groupName) && [
                ...conversationData.candidatesInfo,
                ...members,
              ].map((member) => member.name).join(', '),
              latestMessage: newMessage.text,
              allRead: true,
              isImage: false,
              isNotification: true,
              dateTime: newMessage.sentAt,
            }))
            break
          }

          case REMOVE_PERSON: {
            const { userDetails } = yield select((state) => state.login)
            const { conversations } = yield select((state) => state.chatData)

            const currentCoversation = conversations.find((conversation) => conversation?.data?.conversationId
              === conversationId)
            const conversationData = currentCoversation?.data
            const userId = userDetails?.user_id
            const roomId = formatConversationRoomId(conversationId)
            const newMessage = getFormattedChatNotificationMessage({
              senderId: userId,
              type: CHAT_NOTIFICATION_MESSAGES.REMOVE_PERSON,
              payload: {
                userId,
                userName: userDetails?.full_name,
                otherUserId: candidateId,
                otherUserName: name,
              },
            })

            yield Chat.removePerson({ conversationId, candidateId, updatedOn: newMessage.sentAt })

            WebSocket.sendMessage({
              to: roomId,
              from: userId,
              messages: [ { ...newMessage, isRead: false } ],
              dataType,
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
              newMessage, dataType: NEW_MESSAGE, requestType, conversationId,
            }))
            yield put(showSuccessMessage({
              msg: `You have successfully removed ${ name }!`,
            }))

            yield put(updateAllChats({
              dataType,
              conversationId,
              newGroupName: _.isEmpty(conversationData.groupName)
                && conversationData.candidatesInfo?.filter((user) => user.id !== candidateId)
                .map((member) => member.name).join(', '),
              latestMessage: newMessage.text,
              allRead: true,
              isImage: false,
              isNotification: true,
              dateTime: newMessage.sentAt,
            }))
            break
          }

          case CHANGE_GROUP_NAME: {
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
            const userId = userDetails?.user_id

            if (_.isEmpty(newGroupName)) {
              type = CHAT_NOTIFICATION_MESSAGES.REMOVE_GROUP_NAME
            } else if (_.isEmpty(oldGroupName)) {
              type = CHAT_NOTIFICATION_MESSAGES.ADD_GROUP_NAME
            } else {
              type = CHAT_NOTIFICATION_MESSAGES.CHANGE_GROUP_NAME
            }

            const newMessage = getFormattedChatNotificationMessage({
              senderId: userId,
              type,
              payload: {
                userId,
                userName: userDetails?.full_name,
                newGroupName,
                oldGroupName,
              },
            })

            WebSocket.sendMessage({
              to: formatConversationRoomId(conversationId),
              from: userId,
              messages: [ { ...newMessage, isRead: false } ],
              dataType,
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
              newMessage, dataType: NEW_MESSAGE, requestType, conversationId,
            }))
            yield put(updateAllChats({
              dataType,
              conversationId,
              newGroupName: newGroupName
                || (conversationData?.candidatesInfo.map((member) => member.name).join(', ')),
              latestMessage: newMessage.text,
              allRead: true,
              isImage: false,
              isNotification: true,
              dateTime: newMessage.sentAt,
            }))
            break
          }

          case LEAVE_GROUP: {
            const { userDetails } = yield select((state) => state.login)
            const { conversations } = yield select((state) => state.chatData)

            const currentCoversation = conversations.find((conversation) => conversation?.data?.conversationId
              === conversationId)
            const conversationData = currentCoversation?.data
            const userId = userDetails?.user_id

            const roomId = formatConversationRoomId(conversationId)
            const newMessage = getFormattedChatNotificationMessage({
              senderId: userId,
              type: CHAT_NOTIFICATION_MESSAGES.LEAVE_GROUP,
              payload: {
                userId,
                userName: userDetails?.full_name,
              },
            })

            yield Chat.removePerson({ conversationId, candidateId: userId, updatedOn: newMessage.sentAt })

            WebSocket.sendMessage({
              to: roomId,
              from: userId,
              messages: [ { ...newMessage, isRead: false } ],
              dataType: REMOVE_PERSON,
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
              newGroupName: _.isEmpty(conversationData.groupName)
                && conversationData.candidatesInfo?.filter((user) => user.id !== userId)
                .map((member) => member.name).join(', '),
              latestMessage: newMessage.text,
              isRemoved: true,
              allRead: true,
              isImage: false,
              isNotification: true,
              dateTime: newMessage.sentAt,
            }))
            break
          }

          case DELETE_CHAT: {
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
                dataType,
                conversationId,
                latestMessage: '',
                allRead: true,
                isImage: false,
                isNotification: false,
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
