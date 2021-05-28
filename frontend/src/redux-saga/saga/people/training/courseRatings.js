import { put, takeEvery } from 'redux-saga/effects'
import {
  showErrorMessage,
  courseRatingsFetchStart,
  courseRatingsFetchSuccessful,
  courseRatingsFetchFailure,
} from '../../../redux/actions'
import People from '../../../service/people'

function* courseRatingsWatcher() {
  yield takeEvery(courseRatingsFetchStart, courseRatingsWorker)
}

function* courseRatingsWorker(action) {
  try {
    const { courseId } = action.payload
    const { data } = yield People.fetchCourseRatings({ courseId })
    yield put(courseRatingsFetchSuccessful({
      addReviewAccess: data.addReviewAccess,
      ratings: data.ratings,
    }))
  } catch (e) {
    yield put(courseRatingsFetchFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default courseRatingsWatcher
