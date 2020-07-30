import { takeLatest, put, select } from 'redux-saga/effects'
import { updateChannelData } from '../../../redux/actions'
import {
  DELETE_TOPIC, LIKE_TOPIC, UNLIKE_TOPIC, ADD_TOPIC,
} from '../../../redux/constants'
import { getSubstrForNotification } from '../../../../utils/common'
import { showErrorMessage, showSuccessMessage } from '../../../redux/snackbar'
import Forum from '../../../service/forum'

function* topicCrudWatcher() {
  yield takeLatest([ DELETE_TOPIC, LIKE_TOPIC, UNLIKE_TOPIC, ADD_TOPIC ], topicCrudWorker)
}

function* topicCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case DELETE_TOPIC: {
        const { topicId, topicTitle } = action.payload
        yield Forum.deleteTopic({ topicId })

        yield put(updateChannelData({
          type: DELETE_TOPIC,
          topicId,
        }))
        msg = `Topic '${ getSubstrForNotification(topicTitle) }' has been successfully deleted!`
        break
      }
      case ADD_TOPIC: {
        const { title, isPublic, channelId } = action.payload
        const { data } = yield Forum.addNewTopic({
          title,
          is_public: isPublic,
          channel_id: channelId,
          is_flagged: false, // Temporary set is_flagged false, currently has no functionality.
        })
        const { userDetails } = yield select((state) => state.login)
        const {
          // eslint-disable-next-line
          createdAt, updatedAt, topic_id, owner_id, topic_title,
        } = data
        yield put(updateChannelData({
          type: ADD_TOPIC,
          newTopic: {
            dateCreatedOn: createdAt,
            dateLastReplied: '',
            tags: null,
            topicId: topic_id,
            topicOwner: {
              userId: owner_id,
              userName: userDetails.full_name, // Also, add user image to owner details.
            },
            topicTitle: topic_title,
            totalReplies: 0,
          },
        }))

        msg = `Topic '${ getSubstrForNotification(data.topic_title) }' has been successfully created!`
        break
      }
      case LIKE_TOPIC: {
        const { payload } = action.payload
        yield Forum.likeTopic({ payload })
        break
      }
      case UNLIKE_TOPIC: {
        const { payload } = action.payload
        yield Forum.unlikeTopic({ payload })
        break
      }
      default:
        break
    }
    if (msg) {
      yield put(showSuccessMessage({ msg }))
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e }))
  }
}

export default topicCrudWatcher
