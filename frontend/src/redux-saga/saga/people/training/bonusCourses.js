import { takeEvery, put } from 'redux-saga/effects'
import {
  bonusCoursesFetchStart,
  bonusCoursesFetchSuccess,
  bonusCoursesFetchFailure,
} from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/utils/snackbar'
import People from '../../../service/people'

function* bonusCoursesFetchWatcher() {
  yield takeEvery(bonusCoursesFetchStart.type, bonusCoursesFetchWorker)
}

function* bonusCoursesFetchWorker(action) {
  try {
    const { searchKeyword, offset } = action.payload
    const { data } = yield People.fetchRequiredCourses({ searchKeyword, offset })
    yield put(bonusCoursesFetchSuccess({ courses: data.courses, count: data.count }))
  } catch (e) {
    yield put(bonusCoursesFetchFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default bonusCoursesFetchWatcher
