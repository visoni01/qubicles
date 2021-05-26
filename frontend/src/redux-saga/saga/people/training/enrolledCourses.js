import { takeEvery, put } from 'redux-saga/effects'
import {
  enrolledCoursesRequestStart,
  enrolledCoursesRequestSuccess,
  enrolledCoursesRequestFailed,
  showErrorMessage,
} from '../../../redux/actions'
import People from '../../../service/people'

function* enrolledCoursesWatcher() {
  yield takeEvery(enrolledCoursesRequestStart.type, enrolledCoursesWorker)
}

function* enrolledCoursesWorker() {
  try {
    const { data } = yield People.fetchEnrolledCourses()
    yield put(enrolledCoursesRequestSuccess({ enrolledCourses: data }))
  } catch (e) {
    yield put(enrolledCoursesRequestFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default enrolledCoursesWatcher
