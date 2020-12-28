import { takeEvery, put } from 'redux-saga/effects'
import {
  fetchJobSkillsStart,
  fetchJobSkillsSuccess,
  fetchJobSkillsFailed,
} from '../../redux/actions'
import { showErrorMessage } from '../../redux/snackbar'
import People from '../../service/people'

function* jobSkillsWatcherStart() {
  yield takeEvery(fetchJobSkillsStart.type, jobSkillsWorker)
}

function* jobSkillsWorker() {
  try {
    const { data } = yield People.getJobSkills()
    yield put(fetchJobSkillsSuccess({ jobSkills: data }))
  } catch (e) {
    yield put(fetchJobSkillsFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobSkillsWatcherStart
