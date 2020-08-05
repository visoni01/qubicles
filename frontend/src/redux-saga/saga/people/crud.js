import { takeLatest, put, select } from 'redux-saga/effects'
import { updateJobsData, updateCategoryData } from '../../redux/actions'
import { DELETE_JOB } from '../../redux/constants'
import { showErrorMessage, showSuccessMessage } from '../../redux/snackbar'
import People from '../../service/people'

function* jobCrudWatcher() {
  yield takeLatest([ DELETE_JOB ], jobCrudWorker)
}

function* jobCrudWorker(action) {
  try {
    let msg
    switch (action.type) {
      case DELETE_JOB: {
        const { categoryId, jobId } = action.payload
        yield People.deleteJob({ jobId })
        const data = yield select((state) => state.jobCategories)
        const updatedJobCategories = data.jobCategories.map((category) => {
          let updatedJobs = category.jobs
          if (category.categoryId === categoryId) {
            updatedJobs = category.jobs.filter((job) => job.jobId !== jobId)
          }
          return { ...category, jobs: updatedJobs }
        })
        yield put(updateJobsData({
          data: {
            jobCategories: updatedJobCategories,
          },
        }))
        msg = 'Job post has been successfully deleted!'
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
