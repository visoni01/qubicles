import _ from 'lodash'
import { takeEvery, put } from 'redux-saga/effects'
import {
  fetchAgentResumeStart,
  fetchAgentResumeSuccess,
  fetchAgentResumeFailed,
  updateAgentResume,
  showErrorMessage,
  showSuccessMessage,
} from '../../../redux/actions'
import People from '../../../service/people'
import User from '../../../service/user'

function* agentResumeSkillsWatcherStart() {
  yield takeEvery(fetchAgentResumeStart.type, agentResumeSkillsWorker)
}

function* agentResumeSkillsWorker(action) {
  try {
    const {
      candidateId, requestType, isFollowing, hasBlockedUser,
    } = action.payload

    switch (requestType) {
      case 'FETCH': {
        const { data } = yield People.getAgentResume({ candidateId })
        yield put(fetchAgentResumeSuccess({ agentResume: data }))
        break
      }
      case 'UPDATE': {
        if (!_.isUndefined(isFollowing)) {
          yield User.updateFollowingStatus({ candidateId, userCode: 'user' })
          yield put(updateAgentResume({ isFollowing }))
          yield put(showSuccessMessage({
            msg: `You have successfully ${ isFollowing ? 'followed' : 'unfollowed' }!`,
          }))
        } else if (!_.isUndefined(hasBlockedUser)) {
          const { data } = yield User.updateBlockStatus({ candidateId })
          yield put(updateAgentResume({
            isFollowing: false,
            hasBlockedUser,
            noOfFollowers: data.noOfFollowers,
            noOfFollowings: data.noOfFollowings,
          }))
          yield put(showSuccessMessage({
            msg: `You have successfully ${ hasBlockedUser ? 'blocked' : 'unblocked' }!`,
          }))
        }
        break
      }
      default: break
    }
  } catch (e) {
    yield put(fetchAgentResumeFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default agentResumeSkillsWatcherStart
