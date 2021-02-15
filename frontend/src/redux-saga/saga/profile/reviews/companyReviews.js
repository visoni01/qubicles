import { takeEvery, put } from 'redux-saga/effects'
import {
  companyReviewsFetchStart,
  showSuccessMessage,
  showErrorMessage,
  companyReviewPostStart,
  companyReviewPostSuccessful,
  companyReviewsFetchSuccessful,
  companyReviewsFetchFailure,
  companyReviewPostFailure,
} from '../../../redux/actions'
import CompanyProfile from '../../../service/profile/company'

function* companyReviewsWatcher() {
  yield takeEvery([
    companyReviewsFetchStart,
    companyReviewPostStart,
  ], companyReviewsWorker)
}

function* companyReviewsWorker(action) {
  try {
    switch (action.type) {
      case companyReviewsFetchStart: {
        const { type, clientId } = action.payload
        const { data } = CompanyProfile.fetchCompanyReviews({ clientId, type })
        yield put(companyReviewsFetchSuccessful({ rating: data.rating, reviews: data.reviews, type }))
        break
      }
      case companyReviewPostStart: {
        const { reviewData, clientId } = action.payload
        const { data } = CompanyProfile.postCompanyReview({ clientId, reviewData })
        yield put(companyReviewPostSuccessful({ review: data.review }))
        yield put(showSuccessMessage({ mesg: 'Added Review Successfully!' }))
        break
      }
      default: break
    }
  } catch (e) {
    switch (action.type) {
      case companyReviewsFetchStart: {
        yield put(companyReviewsFetchFailure())
        break
      }
      case companyReviewPostStart: {
        yield put(companyReviewPostFailure())
        break
      }
      default: break
    }
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default companyReviewsWatcher
