import { takeEvery, put } from 'redux-saga/effects'
import {
  channelTopicsListFetchingStart,
  channelTopicsListFetchingSuccessful,
  channelTopicsListFetchingFailure,
} from '../../../redux/actions'

import Forum from '../../../service/forum'
import { showErrorMessage } from '../../../redux/snackbar'

function* channelDataFetchingWatcherStart() {
  yield takeEvery(channelTopicsListFetchingStart.type, channelDataFetchingWorker)
}

function* channelDataFetchingWorker(action) {
  try {
    const { channelId, searchKeyword } = action.payload
    const { data } = yield Forum.fetchChannelTopicsList({ channelId, searchKeyword })
    yield put(channelTopicsListFetchingSuccessful({ channelTopicsList: data.channelTopics }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(channelTopicsListFetchingFailure())
  }
}

export default channelDataFetchingWatcherStart
