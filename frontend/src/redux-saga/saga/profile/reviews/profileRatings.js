import { put, takeEvery } from 'redux-saga/effects'
import {
  showErrorMessage,
  profileRatingsFetchFailure,
  profileRatingsFetchStart,
  profileRatingsFetchSuccessful,
} from '../../../redux/actions'
import CompanyProfile from '../../../service/profile/company'

function* profileRatingsWatcher() {
  yield takeEvery(profileRatingsFetchStart, profileRatingsWorker)
}

function* profileRatingsWorker(action) {
  try {
    const { profileType, id } = action.payload
    let ratingResult
    if (profileType === 'employer') {
      ratingResult = yield CompanyProfile.fetchCompanyRatings({ clientId: id })
    }
    const { data } = ratingResult
    yield put(profileRatingsFetchSuccessful({
      totalAverageRating: data.ratings.totalAverageRating,
      totalAverageRaters: data.ratings.totalAverageRaters,
      rating1: data.ratings.culture,
      rating2: data.ratings.leadership,
      rating3: data.ratings.career,
      rating4: data.ratings.compensation,
      addReviewAccess: data.addReviewAccess,
    }))
  } catch (e) {
    yield put(profileRatingsFetchFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default profileRatingsWatcher
