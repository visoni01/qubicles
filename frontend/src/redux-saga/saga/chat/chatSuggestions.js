/* eslint-disable complexity */
import { takeEvery, put } from 'redux-saga/effects'
import {
  chatSuggestionsFetchStart,
  chatSuggestionsFetchSuccess,
  chatSuggestionsFetchFailed,
  showErrorMessage,
} from '../../redux/actions'
import Chat from '../../service/chat'

function* chatSuggestionsWatcher() {
  yield takeEvery(chatSuggestionsFetchStart.type, chatSuggestionsWorker)
}

function* chatSuggestionsWorker(action) {
  try {
    const { offset, searchKeyword } = action.payload
    const { data } = yield Chat.getChatSuggestions({ offset, searchKeyword })
    yield put(chatSuggestionsFetchSuccess({ users: data.users, count: data.count }))
  } catch (e) {
    yield put(chatSuggestionsFetchFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default chatSuggestionsWatcher
