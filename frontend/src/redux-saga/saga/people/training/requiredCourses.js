import { takeEvery, put } from 'redux-saga/effects'
import {
  requiredCoursesFetchStart,
  requiredCoursesFetchSuccess,
  requiredCoursesFetchFailure,
} from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/utils/snackbar'
import People from '../../../service/people'

function* requiredCoursesFetchWatcher() {
  yield takeEvery(requiredCoursesFetchStart.type, requiredCoursesFetchWorker)
}

function* requiredCoursesFetchWorker(action) {
  try {
    const { searchKeyword, offset } = action.payload
    const { data } = yield People.fetchRequiredCourses({ searchKeyword, offset })
    yield put(requiredCoursesFetchSuccess({ courses: data.courses, count: data.count }))
  } catch (e) {
    yield put(requiredCoursesFetchFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default requiredCoursesFetchWatcher
