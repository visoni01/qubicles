import { takeLatest, put } from 'redux-saga/effects'
import {
  jobPostCompanyDetailsFetchStart,
  jobPostCompanyDetailsFetchSuccessful,
  updateJobPostCompanyDetails,
} from '../../../redux/actions'
import { showErrorMessage, showSuccessMessage } from '../../../redux/utils/snackbar'
import CompanyProfile from '../../../service/profile/company'
import User from '../../../service/user'

function* companyDataFetchingWatcherStart() {
  yield takeLatest(jobPostCompanyDetailsFetchStart.type, companyDataFetchingWorker)
}

function* companyDataFetchingWorker(action) {
  try {
    const { clientId, requestType, isFollowing } = action.payload

    switch (requestType) {
      case 'FETCH': {
        const { data } = yield CompanyProfile.fetchCompanyDetails({ clientId })
        yield put(jobPostCompanyDetailsFetchSuccessful({ companyDetails: data }))
        break
      }
      case 'UPDATE': {
        yield User.updateFollowingStatus({ candidateId: clientId, userCode: 'client' })
        yield put(updateJobPostCompanyDetails())
        yield put(showSuccessMessage({
          msg: `You have successfully ${ isFollowing ? 'followed' : 'unfollowed' }!`,
        }))
        break
      }
      default: break
    }
  } catch (e) {
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default companyDataFetchingWatcherStart
