import { createAction } from 'redux-actions'
import {
  ADD_JOB,
  NEW_JOB_FIELDS,
  GET_JOB_BY_CATEGORY,
  UPDATE_JOB,
} from '../../constants'

export const addJob = createAction(ADD_JOB)
export const getNewJobFields = createAction(NEW_JOB_FIELDS)
export const getJobsByCategory = createAction(GET_JOB_BY_CATEGORY)
export const updateJob = createAction(UPDATE_JOB)
