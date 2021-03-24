import { all } from 'redux-saga/effects'

import authWatcherFunctions from './auth'
import userWatcherFunctions from './user'
import dashboardWatcherFunctions from './dashboard'
import forumWatcherFunctions from './forum'
import peopleWatcherFunctions from './people'
import profileWatcherFunctions from './profile'

export default function* rootSaga() {
  yield all([
    ...authWatcherFunctions.map((watcherFn) => watcherFn()),
    ...userWatcherFunctions.map((watcherFn) => watcherFn()),
    ...dashboardWatcherFunctions.map((watcherFn) => watcherFn()),
    ...forumWatcherFunctions.map((watcherFn) => watcherFn()),
    ...peopleWatcherFunctions.map((watcherFn) => watcherFn()),
    ...profileWatcherFunctions.map((watcherFn) => watcherFn()),
  ])
}
