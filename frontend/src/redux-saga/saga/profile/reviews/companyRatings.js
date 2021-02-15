import { put, takeEvery } from 'redux-saga/effects'
import {
  showErrorMessage,
  companyRatingsFetchFailure,
  companyRatingsFetchStart,
  companyRatingsFetchSuccessful,
} from '../../../redux/actions'
import CompanyProfile from '../../../service/profile/company'

function* companyRatingsWatcher() {
  yield takeEvery(companyRatingsFetchStart, companyReviewsWorker)
}

function* companyReviewsWorker(action) {
  try {
    const { clientId } = action.payload
    const { data } = yield CompanyProfile.fetchCompanyRatings({ clientId })
    yield put(companyRatingsFetchSuccessful({
      totalAverageRating: data.totalAverageRating,
      totalAverageRaters: data.totalAverageRaters,
      cultureRating: data.culture,
      leadershipRating: data.leadership,
      careerAdvancementRating: data.career,
      compensationRating: data.compensation,
    }))
  } catch (e) {
    yield put(companyRatingsFetchFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default companyRatingsWatcher
