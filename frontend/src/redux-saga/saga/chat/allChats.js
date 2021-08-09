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
      requestType, dataType, title, members,
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
          case 'new-group': {
            const { data } = yield Chat.createNewGroup({ title, members })
            yield put(allChatsRequestSuccess({
              newChat: {
                id: data && data.conversationId,
                name: title,
                imageUrl: '',
                time: null,
                isGroup: true,
                latestMessage: null,
                allRead: true,
              },
            }))
            yield put(updateCurrentChat({
              currentChat: {
                conversationId: data && data.conversationId,
                isGroup: true,
                data: [],
                candidatesInfo: members,
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
