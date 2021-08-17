/* eslint-disable complexity */
import _ from 'lodash'
import { takeEvery, put, select } from 'redux-saga/effects'
import { getUniqueId } from '../../../utils/common'
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
            const { userDetails } = yield select((state) => state.login)
            const { settings: agentSettings } = yield select((state) => state.agentDetails)
            const { settings: clientSettings } = yield select((state) => state.clientDetails)

            const newMessages = [
              {
                msgId: getUniqueId(),
                candidateId: userDetails && userDetails.user_id,
                text: `<span><b>${ userDetails && userDetails.full_name }</b> created the group <b>${
                  title || '' }</b></span>`,
                isNotification: true,
                sentAt: Date.now(),
                isRead: true,
              },
              {
                msgId: getUniqueId(),
                candidateId: userDetails && userDetails.user_id,
                text: `<span><b>${ userDetails && userDetails.full_name }</b> added <b>${
                  members && members.map((item) => item.name).join(', ') }</b></span>`,
                isNotification: true,
                sentAt: Date.now(),
                isRead: true,
              },
            ]

            let loggedInUser = {
              id: userDetails && userDetails.user_id,
              userCode: userDetails && userDetails.user_code,
            }

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

            const { data } = yield Chat.createNewGroup({ title, members: [ loggedInUser, ...members ] })

            yield put(allChatsRequestSuccess({
              newChat: {
                id: data && data.conversationId,
                name: title || (members && [ loggedInUser, ...members ].map((item) => item.name).join(', ')),
                imageUrl: '',
                time: Date.now(),
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
                groupName: title,
                data: [ ...newMessages ],
                candidatesInfo: [ loggedInUser, ...members ],
              },
            }))
            break
          }

          case 'new-chat': {
            const { data } = yield Chat.createNewChat({ candidate })
            const { userDetails } = yield select((state) => state.login)

            const newMessage = {
              msgId: getUniqueId(),
              candidateId: userDetails && userDetails.user_id,
              text: `<span><b>${ userDetails && userDetails.full_name }</b> started a new chat</span>`,
              isNotification: true,
              sentAt: Date.now(),
              isRead: true,
            }

            yield put(allChatsRequestSuccess({
              newChat: {
                id: data && data.conversationId,
                name: candidate.name,
                imageUrl: candidate.profilePic,
                time: Date.now(),
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
                data: data.messages ? [ ...data.messages ] : [ newMessage ],
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
