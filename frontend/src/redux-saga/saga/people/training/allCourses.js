import { takeEvery, put } from 'redux-saga/effects'
import {
  allCoursesRequestStart,
  allCoursesRequestSuccess,
  allCoursesRequestFailed,
  showErrorMessage,
} from '../../../redux/actions'
import People from '../../../service/people'

function* allCoursesWatcherStart() {
  yield takeEvery(allCoursesRequestStart.type, allCoursesWorker)
}

function* allCoursesWorker(action) {
  try {
    const { requestType } = action.payload

    switch (requestType) {
      case 'FETCH': {
        const { data } = yield People.fetchAllCourses()
        yield put(allCoursesRequestSuccess({ courses: data }))
        break
      }
      default: break
    }
  } catch (e) {
    yield put(allCoursesRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default allCoursesWatcherStart
