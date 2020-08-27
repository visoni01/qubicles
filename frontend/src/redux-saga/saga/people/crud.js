import { takeLatest, put } from 'redux-saga/effects'
import { updateJobsData } from '../../redux/actions'
import { DELETE_JOB, ADD_JOB } from '../../redux/constants'
import { showErrorMessage, showSuccessMessage } from '../../redux/snackbar'
import People from '../../service/people'
import { getSubstrForNotification } from '../../../utils/common'

function* jobCrudWatcher() {
  yield takeLatest([ DELETE_JOB, ADD_JOB ], jobCrudWorker)
}

function* jobCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case DELETE_JOB: {
        const { categoryId, jobId, title } = action.payload
        yield People.deleteJob({ jobId })
        yield put(updateJobsData({ type: DELETE_JOB, jobId, categoryId }))
        msg = `Job ${ getSubstrForNotification(title) } has been successfully deleted!`
        break
      }
      case ADD_JOB: {
        const {
          categoryId, jobType, positionId, employmentType, durationType, experienceType, locationType, ...rest
        } = action.payload
        const { data } = yield People.addJob({
          job_type: jobType,
          employment_type: employmentType,
          duration_type: durationType,
          experience_type: experienceType,
          location_type: locationType,
          category_id: categoryId,
          position_id: positionId,
          ...rest,
        })
        // eslint-disable-next-line
        const { category_id, job_id, user_id, title, description } = data
        yield put(updateJobsData({
          type: ADD_JOB,
          newJob: {
            categoryId: category_id,
            jobId: job_id,
            title,
            description,
            ownerId: user_id,
            noOfApplications: 0,
            notifications: 0,
          },
        }))
        msg = 'Job has been successfully created!'
        break
      }
      default:
        break
    }
    yield put(showSuccessMessage({ msg }))
  } catch (e) {
    yield put(showErrorMessage({ msg: e }))
  }
}

export default jobCrudWatcher
