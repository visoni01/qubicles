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
        yield put(companyReviewsFetchSuccessful())
        break
      }
      case companyReviewPostStart.type: {
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
