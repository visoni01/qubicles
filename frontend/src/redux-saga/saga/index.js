import { all } from 'redux-saga/effects'

import signup from './signup'

export default function* rootSaga() {
  yield all([
    signup()
  ])
}