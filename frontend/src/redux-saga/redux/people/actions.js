import { createAction } from 'redux-actions'
import {
  DELETE_JOB,
  JOB_FIELDS,
  UPDATE_JOB,
} from '../constants'

export const deleteJob = createAction(DELETE_JOB)
export const getJobFields = createAction(JOB_FIELDS)
export const updateJob = createAction(UPDATE_JOB)
