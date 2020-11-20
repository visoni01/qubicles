import { takeEvery, put } from 'redux-saga/effects'
import _ from 'lodash'
import {
  fetchJobSkillsStart,
  fetchJobSkillsSuccess,
  fetchJobSkillsFailed,
} from '../../redux/actions'
import { showErrorMessage } from '../../redux/snackbar'
import NewPeople from '../../service/newPeople'

function* jobSkillsWatcherStart() {
  yield takeEvery(fetchJobSkillsStart.type, jobSkillsWorker)
}

function* jobSkillsWorker() {
  try {
    const { data } = yield NewPeople.getJobSkills()
    yield put(fetchJobSkillsSuccess({ jobSkills: data }))
  } catch (e) {
    yield put(fetchJobSkillsFailed())
    yield put(showErrorMessage({ msg: e.errMsg }))
  }
}

export default jobSkillsWatcherStart
