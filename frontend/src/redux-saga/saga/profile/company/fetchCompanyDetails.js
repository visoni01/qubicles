import { takeLatest, put } from 'redux-saga/effects'
import { REQUEST_TYPES } from '../../../../utils/constants'
import {
  jobPostCompanyDetailsFetchStart, jobPostCompanyDetailsFetchSuccessful, updateJobPostCompanyDetails,
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
      case REQUEST_TYPES.FETCH: {
        const { data } = yield CompanyProfile.fetchCompanyDetails({ clientId })
        yield put(jobPostCompanyDetailsFetchSuccessful({ companyDetails: data }))
        break
      }
      case REQUEST_TYPES.UPDATE: {
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
