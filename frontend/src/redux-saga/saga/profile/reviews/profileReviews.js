import { put, takeLatest } from 'redux-saga/effects'
import {
  profileReviewsFetchStart,
  showSuccessMessage,
  showErrorMessage,
  profileReviewPostStart,
  profileReviewPostSuccessful,
  profileReviewsFetchSuccessful,
  profileReviewsFetchFailure,
  profileReviewPostFailure,
  profileRatingsFetchSuccessful,
} from '../../../redux/actions'
import CompanyProfile from '../../../service/profile/company'

function* profileReviewsWatcher() {
  yield takeLatest([
    profileReviewsFetchStart,
    profileReviewPostStart,
  ], profileReviewsWorker)
}

function* profileReviewsWorker(action) {
  try {
    switch (action.type) {
      case profileReviewsFetchStart.type: {
        const { reviewType, profileType, id } = action.payload
        let reviews
        if (profileType === 'employer') {
          reviews = yield CompanyProfile.fetchCompanyReviews({ clientId: id, type: reviewType })
        }
        yield put(profileReviewsFetchSuccessful({
          type: reviewType,
          reviews: reviews.data,
        }))
        break
      }
      case profileReviewPostStart.type: {
        const { reviewData, clientId } = action.payload
        const { data } = yield CompanyProfile.postCompanyReview({ clientId, reviewData })

        // Update rating and reviews
        yield put(profileReviewPostSuccessful({ reviews: data.reviews }))
        yield put(profileRatingsFetchSuccessful({
          totalAverageRating: data.ratings.totalAverageRating,
          totalAverageRaters: data.ratings.totalAverageRaters,
          rating1: data.ratings.culture,
          rating2: data.ratings.leadership,
          rating3: data.ratings.career,
          rating4: data.ratings.compensation,
          addReviewAccess: data.addReviewAccess,
        }))
        yield put(showSuccessMessage({ msg: 'Added Review Successfully!' }))
        break
      }
      default: break
    }
  } catch (e) {
    switch (action.type) {
      case profileReviewsFetchStart.type: {
        yield put(profileReviewsFetchFailure())
        break
      }
      case profileReviewPostStart.type: {
        yield put(profileReviewPostFailure())
        break
      }
      default: break
    }
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default profileReviewsWatcher
