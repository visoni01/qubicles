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
      totalAverageRating: data.ratings.totalAverageRating,
      totalAverageRaters: data.ratings.totalAverageRaters,
      cultureRating: data.ratings.culture,
      leadershipRating: data.ratings.leadership,
      careerAdvancementRating: data.ratings.career,
      compensationRating: data.ratings.compensation,
      addReviewAccess: data.addReviewAccess,
    }))
  } catch (e) {
    yield put(companyRatingsFetchFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default companyRatingsWatcher
