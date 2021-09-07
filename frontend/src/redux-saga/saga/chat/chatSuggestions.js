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
    const { offset, searchKeyword, conversationId } = action.payload
    const { data } = yield Chat.getChatSuggestions({
      offset,
      search_keyword: searchKeyword,
      conversation_id: conversationId,
    })
    yield put(chatSuggestionsFetchSuccess({ users: data.suggestions, more: data.more }))
  } catch (e) {
    yield put(chatSuggestionsFetchFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default chatSuggestionsWatcher
