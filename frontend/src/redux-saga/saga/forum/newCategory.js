import { takeEvery, put } from 'redux-saga/effects'
import {
  addNewCategoryStart,
  addNewCategorySuccessful,
  addNewCategoryFailure,
} from '../../redux/actions'

import Forum from '../../service/forum'
import { showErrorMessage } from '../../redux/snackbar'

function* addNewCategoryWatcher() {
  yield takeEvery(addNewCategoryStart.type, addNewCategoryWorker)
}

function* addNewCategoryWorker(action) {
  try {
    const { payload } = action
    const { data } = yield Forum.addNewCategory(payload)
    yield put(addNewCategorySuccessful({ newCategory: data }))
  } catch (e) {
    yield put(showErrorMessage())
    yield put(addNewCategoryFailure())
  }
}

export default addNewCategoryWatcher
