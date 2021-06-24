import { takeEvery, put } from 'redux-saga/effects'
import {
  fetchAgentResumeCoursesStart,
  fetchAgentResumeCoursesSuccess,
  fetchAgentResumeCoursesFailed,
  showErrorMessage,
} from '../../../redux/actions'
import People from '../../../service/people'

function* agentResumeCoursesWatcherStart() {
  yield takeEvery(fetchAgentResumeCoursesStart.type, agentResumeCoursesWorker)
}

function* agentResumeCoursesWorker(action) {
  try {
    const { candidateId } = action.payload
    const { data } = yield People.getUserCourses({ candidateId })
    yield put(fetchAgentResumeCoursesSuccess({ agentCourses: data }))
  } catch (e) {
    yield put(fetchAgentResumeCoursesFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default agentResumeCoursesWatcherStart
