import { takeLatest, put, select } from 'redux-saga/effects'
import { updateChannelData } from '../../../redux/actions'
import { DELETE_TOPIC } from '../../../redux/constants'
import { getSubstrForNotification } from '../../../../utils/common'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'
import Forum from '../../../service/forum'

function* topicCrudWatcher() {
  yield takeLatest([ DELETE_TOPIC ], topicCrudWorker)
}

function* topicCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case DELETE_TOPIC: {
        const { topicId, topicTitle } = action.payload

        const { channelDetails } = yield select((state) => state.channel)
        yield Forum.deleteTopic({ topicId })

        yield put(updateChannelData({
          data: {
            channelInfo: channelDetails.channelInfo,
            channelTopics: channelDetails.channelTopics.filter((topic) => topic.topicId !== topicId),
          },
        }))

        msg = `Topic '${ getSubstrForNotification(topicTitle) }' has been successfully deleted!`
        break
      }
      default:
        break
    }
    yield put(showSuccessMessage({ msg }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e }))
  }
}

export default topicCrudWatcher
