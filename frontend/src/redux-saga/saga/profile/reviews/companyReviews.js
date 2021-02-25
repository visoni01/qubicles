import { put, takeLatest } from 'redux-saga/effects'
import {
  companyReviewsFetchStart,
  showSuccessMessage,
  showErrorMessage,
  companyReviewPostStart,
  companyReviewPostSuccessful,
  companyReviewsFetchSuccessful,
  companyReviewsFetchFailure,
  companyReviewPostFailure,
  companyRatingsFetchSuccessful,
} from '../../../redux/actions'
import CompanyProfile from '../../../service/profile/company'

function* companyReviewsWatcher() {
  yield takeLatest([
    companyReviewsFetchStart,
    companyReviewPostStart,
  ], companyReviewsWorker)
}

function* companyReviewsWorker(action) {
  try {
    switch (action.type) {
      case companyReviewsFetchStart.type: {
        const { type, clientId } = action.payload
        const { data } = yield CompanyProfile.fetchCompanyReviews({ clientId, type })
        yield put(companyReviewsFetchSuccessful({
          type,
          reviews: data,
        }))
        break
      }
      case companyReviewPostStart.type: {
        const { reviewData, clientId } = action.payload
        const { data } = yield CompanyProfile.postCompanyReview({ clientId, reviewData })

        // Update rating and reviews
        yield put(companyReviewPostSuccessful({ reviews: data.reviews }))
        yield put(companyRatingsFetchSuccessful({
          totalAverageRating: data.ratings.totalAverageRating,
          totalAverageRaters: data.ratings.totalAverageRaters,
          cultureRating: data.ratings.culture,
          leadershipRating: data.ratings.leadership,
          careerAdvancementRating: data.ratings.career,
          compensationRating: data.ratings.compensation,
          addReviewAccess: data.addReviewAccess,
        }))
        yield put(showSuccessMessage({ msg: 'Added Review Successfully!' }))
        break
      }
      default: break
    }
  } catch (e) {
    switch (action.type) {
      case companyReviewsFetchStart.type: {
        yield put(companyReviewsFetchFailure())
        break
      }
      case companyReviewPostStart.type: {
        yield put(companyReviewPostFailure())
        break
      }
      default: break
    }
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default companyReviewsWatcher
