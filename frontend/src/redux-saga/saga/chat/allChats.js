/* eslint-disable complexity */
import { takeEvery, put } from 'redux-saga/effects'
import {
  allChatsRequestStart,
  allChatsRequestSuccess,
  allChatsRequestFailed,
  showErrorMessage,
  updateCurrentChat,
} from '../../redux/actions'
import Chat from '../../service/chat'

function* allChatsWatcher() {
  yield takeEvery(allChatsRequestStart.type, allChatsWorker)
}

function* allChatsWorker(action) {
  try {
    const {
      requestType, dataType, title, members, conversationId, candidate,
    } = action.payload

    switch (requestType) {
      case 'FETCH': {
        switch (dataType) {
          case 'chats-list': {
            const { data } = yield Chat.getAllChats()
            yield put(allChatsRequestSuccess({ chats: data }))
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
            yield put(allChatsRequestSuccess({
              conversationId,
            }))
            break
          }

          case 'mark-as-read': {
            yield Chat.markChatAsRead({ conversationId })
            yield put(allChatsRequestSuccess({
              conversationId,
            }))
            break
          }

          default: break
        }
        break
      }

      case 'CREATE': {
        switch (dataType) {
          case 'new-group': {
            const { data } = yield Chat.createNewGroup({ title, members })
            const groupName = title || (members && members.map((item) => item.name).join(', '))
            yield put(allChatsRequestSuccess({
              newChat: {
                id: data && data.conversationId,
                name: groupName,
                imageUrl: '',
                time: null,
                isGroup: true,
                latestMessage: null,
                allRead: true,
              },
            }))
            yield put(updateCurrentChat({
              dataType: 'open-chat',
              currentChat: {
                conversationId: data && data.conversationId,
                isGroup: true,
                groupName,
                data: [],
                candidatesInfo: members,
              },
            }))
            break
          }

          case 'new-chat': {
            const { data } = yield Chat.createNewChat({ candidate })
            yield put(allChatsRequestSuccess({
              newChat: {
                id: data && data.conversationId,
                name: candidate.name,
                imageUrl: candidate.profilePic,
                time: null,
                isGroup: false,
                latestMessage: null,
                allRead: true,
              },
            }))
            yield put(updateCurrentChat({
              dataType: 'open-chat',
              currentChat: {
                conversationId: data && data.conversationId,
                isGroup: false,
                data: [],
                candidatesInfo: [ candidate ],
              },
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
    yield put(allChatsRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default allChatsWatcher
