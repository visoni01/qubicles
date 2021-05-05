import { takeEvery, put } from 'redux-saga/effects'
import {
  viewAllCoursesFetchStart,
  viewAllCoursesFetchSuccessful,
} from '../../../redux/actions'
import { showErrorMessage } from '../../../redux/utils/snackbar'
import People from '../../../service/people'

function* viewAllCoursesWatcherStart() {
  yield takeEvery([ viewAllCoursesFetchStart.type ], viewAllCoursesWorker)
}

function* viewAllCoursesWorker(action) {
  try {
    const {
      categoryId, searchField, courseFilter, offset,
    } = action.payload
    const { data } = yield People.fetchViewAllCourses({
      categoryId,
      searchField,
      courseFilter,
      offset,
    })

    yield put(viewAllCoursesFetchSuccessful({
      courses: data.courses,
      count: data.count,
    }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default viewAllCoursesWatcherStart
