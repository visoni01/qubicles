import { takeLatest, put } from 'redux-saga/effects'
import { updateGroupTopicsList } from '../../../redux/actions'
import { ADD_GROUP_TOPIC } from '../../../redux/constants'

import Forum from '../../../service/forum'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'
import { getSubstrForNotification } from '../../../../utils/common'

function* groupTopicsCrudWatcher() {
  yield takeLatest([ ADD_GROUP_TOPIC ], groupTopicsCrudWorker)
}

function* groupTopicsCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case ADD_GROUP_TOPIC: {
        const { title, ownerName } = action.payload
        const { data } = yield Forum.addGroupTopic(action.payload)
        // eslint-disable-next-line
        yield put(updateGroupTopicsList({
          type: ADD_GROUP_TOPIC,
          newTopic: { ownerName, ...data.newTopic, commentsCount: 0 },
        }))
        msg = `Topic '${ getSubstrForNotification(title) }' has been successfully created!`
        break
      }
      default:
        break
    }
    yield put(showSuccessMessage({ msg }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default groupTopicsCrudWatcher
