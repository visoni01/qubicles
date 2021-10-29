/* eslint-disable complexity */
import { takeEvery, put } from 'redux-saga/effects'
import { REQUEST_TYPES } from '../../../../utils/constants'
import {
  courseReviewsRequestStart, courseReviewsRequestSuccess, courseReviewsRequestFailure, showErrorMessage,
  courseRatingsFetchSuccessful, showSuccessMessage, updateCourseRating,
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
      case REQUEST_TYPES.FETCH: {
        const { data } = yield People.fetchCourseReviews({ courseId, reviewFilter, offset })
        yield (put(courseReviewsRequestSuccess({
          count: data.count,
          reviews: data.reviews,
        })))
        break
      }

      case REQUEST_TYPES.CREATE: {
        const { data } = yield People.addCourseReview({ courseId, reviewData })
        // Update courseRatings reducer
        yield put(courseRatingsFetchSuccessful({
          addReviewAccess: data.addReviewAccess,
          ratings: data.ratings,
        }))

        // Update courseReviews reducer
        yield (put(courseReviewsRequestSuccess({
          count: data.reviewData.count,
          reviews: data.reviewData.reviews,
        })))

        // Update rating in viewCourse reducer
        yield (put(updateCourseRating({
          rating: data.ratings.totalAverageRating,
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
