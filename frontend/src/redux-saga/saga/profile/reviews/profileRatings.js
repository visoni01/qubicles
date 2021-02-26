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
    if (profileType === 'employer') {
      const { data } = yield CompanyProfile.fetchCompanyRatings({ clientId: id })
      yield put(profileRatingsFetchSuccessful({
        totalAverageRating: data.ratings.totalAverageRating,
        totalAverageRaters: data.ratings.totalAverageRaters,
        rating1: data.ratings.culture,
        rating2: data.ratings.leadership,
        rating3: data.ratings.career,
        rating4: data.ratings.compensation,
        addReviewAccess: data.addReviewAccess,
      }))
    }
    if (profileType === 'agent') {
      // WIP: Will move to agent Profile Service
      const { data } = yield CompanyProfile.fetchAgentRatings({ agentUserId: id })
      yield put(profileRatingsFetchSuccessful({
        totalAverageRating: data.ratings.totalAverageRating,
        totalAverageRaters: data.ratings.totalAverageRaters,
        rating1: data.ratings.performance,
        rating2: data.ratings.teamplayer,
        rating3: data.ratings.interaction,
        rating4: data.ratings.dependability,
        addReviewAccess: data.addReviewAccess,
      }))
    }
  } catch (e) {
    yield put(profileRatingsFetchFailure())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default profileRatingsWatcher
