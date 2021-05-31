/* eslint-disable complexity */
import { takeEvery, put } from 'redux-saga/effects'
import {
  courseReviewsRequestStart,
  courseReviewsRequestSuccess,
  courseReviewsRequestFailure,
  showErrorMessage,
  courseRatingsFetchSuccessful,
  showSuccessMessage,
} from '../../../redux/actions'
import People from '../../../service/people'

function* courseReviewsWatcher() {
  yield takeEvery(courseReviewsRequestStart.type, courseReviewsWorker)
}

function* courseReviewsWorker(action) {
  try {
    const {
      requestType, courseId, reviewFilter, offset, reviewData,
    } = action.payload

    switch (requestType) {
      case 'FETCH': {
        const { data } = yield People.fetchCourseReviews({ courseId, reviewFilter, offset })
        yield (put(courseReviewsRequestSuccess({
          count: data.count,
          reviews: data.reviews,
        })))
        break
      }

      case 'CREATE': {
        const { data } = yield People.addCourseReview({ courseId, reviewData })
        yield put(courseRatingsFetchSuccessful({
          addReviewAccess: data.addReviewAccess,
          ratings: data.ratings,
        }))
        yield (put(courseReviewsRequestSuccess({
          count: data.reviewData.count,
          reviews: data.reviewData.reviews,
        })))
        yield put(showSuccessMessage({ msg: 'Review Posted Successfully!' }))
        break
      }

      default: break
    }
  } catch (e) {
    yield put(courseReviewsRequestFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default courseReviewsWatcher
