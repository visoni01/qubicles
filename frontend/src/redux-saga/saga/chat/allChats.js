/* eslint-disable complexity */
import _ from 'lodash'
import { takeEvery, put, select } from 'redux-saga/effects'
import WebSocket from '../../../socket'
import { formatConversationRoomId, getFormattedChatNotificationMessage } from '../../../utils/common'
import {
  allChatsRequestStart,
  allChatsRequestSuccess,
  allChatsRequestFailed,
  showErrorMessage,
  updateCurrentChatId,
  updateConversations,
} from '../../redux/actions'
import Chat from '../../service/chat'

function* allChatsWatcher() {
  yield takeEvery(allChatsRequestStart.type, allChatsWorker)
}

function* allChatsWorker(action) {
  try {
    const {
      requestType, dataType, title, members, conversationId, candidate, offset, searchKeyword,
    } = action.payload

    switch (requestType) {
      case 'FETCH': {
        switch (dataType) {
          case 'chats-list': {
            const { data } = yield Chat.getAllChats({ offset, search_keyword: searchKeyword })
            yield put(allChatsRequestSuccess({ chats: data?.chatsList, more: data?.more, offset }))

            if (offset === 0 && data?.chatsList?.length && data?.chatsList[ 0 ]) {
              yield put(updateCurrentChatId({ conversationId: data.chatsList[ 0 ].id }))
            }

            break
          }

          default: break
        }
        break
      }

      case 'UPDATE': {
        switch (dataType) {
          case 'mark-as-unread': {
            yield Chat.markChatAsUnread({ conversationId })
            yield put(allChatsRequestSuccess({ conversationId, allRead: false }))
            yield put(updateConversations({ requestType, dataType, conversationId }))
            break
          }

          default: break
        }
        break
      }

      case 'CREATE': {
        switch (dataType) {
          case 'new-group': {
            const { userDetails } = yield select((state) => state.login)
            const { settings: agentSettings } = yield select((state) => state.agentDetails)
            const { settings: clientSettings } = yield select((state) => state.clientDetails)

            const userId = userDetails && userDetails.user_id
            let loggedInUser = {
              id: userId,
              userCode: userDetails && userDetails.user_code,
            }

            const { data } = yield Chat.createNewGroup({
              group_title: title,
              user_ids: [ loggedInUser, ...members ].map((item) => item.id),
            })

            const newMessages = [
              getFormattedChatNotificationMessage({
                senderId: userId,
                type: dataType,
                payload: {
                  userId,
                  userName: userDetails && userDetails.full_name,
                  groupName: title || '',
                },
              }),
              getFormattedChatNotificationMessage({
                senderId: userId,
                type: 'add-people',
                addOneMillisecond: true,
                payload: {
                  userId,
                  userName: userDetails && userDetails.full_name,
                  usersName: members?.map((item) => item.name).join(', '),
                },
              }),
            ]

            if (userDetails && _.isEqual(userDetails.user_code, 'agent')) {
              let location = agentSettings.city || ''
              location = location + agentSettings.state || ''
              loggedInUser = {
                ...loggedInUser,
                profilePic: agentSettings.profilePic,
                name: agentSettings.fullName,
                title: agentSettings.title,
                location,
              }
            } else {
              let location = clientSettings.city || ''
              location = location + clientSettings.state || ''
              loggedInUser = {
                ...loggedInUser,
                profilePic: clientSettings.profilePic,
                name: clientSettings.companyName,
                title: clientSettings.title,
                location,
              }
            }

            const roomId = formatConversationRoomId(data)
            const newChat = {
              id: data,
              name: title || (members && [ loggedInUser, ...members ].map((item) => item.name).join(', ')),
              imageUrl: '',
              dateTime: Date.now(),
              isGroup: true,
              latestMessage: null,
              allRead: true,
            }
            const newConversation = {
              requestType,
              dataType: 'add-conversation',
              newChat: {
                conversationId: data,
                isGroup: true,
                groupName: title,
                chatData: {
                  chats: [ ...newMessages ],
                  more: false,
                  offset: 2,
                },
                candidatesInfo: [ loggedInUser, ...members ],
                allRead: true,
              },
            }

            WebSocket.joinChatRoom(roomId)

            WebSocket.joinChatRoomForOtherUsers({
              userIds: members?.map((user) => user.id?.toString()),
              roomId,
              senderId: userId?.toString(),
              messageToBeSent: {
                to: roomId,
                from: userId,
                messages: newMessages?.map((message) => ({
                  ...message,
                  isRead: false,
                })),
                dataType: 'new-group',
                payload: {
                  userIds: members?.map((user) => user.id),
                  newChat: {
                    ...newChat,
                    allRead: false,
                  },
                  newConversation: {
                    ...newConversation,
                    newChat: {
                      ...newConversation.newChat,
                      allRead: false,
                    },
                  },
                },
              },
            })

            yield put(allChatsRequestSuccess({ newChat }))
            yield put(updateConversations(newConversation))
            yield put(updateCurrentChatId({ conversationId: data }))
            break
          }

          case 'new-chat': {
            const { data } = yield Chat.createNewChat({ candidate_id: candidate?.id })
            const { chatsList } = yield select((state) => state.allChats)

            const newConversationId = data?.conversationId
            const exists = _.findIndex(chatsList, { id: newConversationId }) !== -1

            if (!exists) {
              const roomId = formatConversationRoomId(newConversationId)

              WebSocket.joinChatRoom(roomId)

              WebSocket.joinChatRoomForOtherUsers({
                userIds: [ candidate?.id?.toString() ],
                roomId,
              })

              yield put(allChatsRequestSuccess({
                newChat: {
                  id: newConversationId,
                  name: candidate.name,
                  imageUrl: candidate.profilePic,
                  dateTime: data?.messages[data.messages.length - 1]?.sentAt || Date.now(),
                  isGroup: false,
                  latestMessage: data?.messages[data.messages.length - 1]?.text,
                  allRead: data?.allRead,
                },
              }))
            } else {
              yield put(allChatsRequestSuccess())
            }

            yield put(updateConversations({
              requestType,
              dataType: 'add-conversation',
              newChat: {
                conversationId: newConversationId,
                isGroup: false,
                chatData: {
                  chats: data.messages ? [ ...data.messages ] : [],
                  more: data?.more,
                  offset: 0,
                },
                candidatesInfo: [ candidate ],
                allRead: data?.allRead,
              },
            }))
            yield put(updateCurrentChatId({ conversationId: newConversationId }))
            break
          }

          default: break
        }
        break
      }

      default: break
    }
  } catch (e) {
    yield put(allChatsRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default allChatsWatcher
