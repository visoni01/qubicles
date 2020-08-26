import { createAction } from 'redux-actions'
import {
  ADD_JOB,
  DELETE_JOB,
  JOB_FIELDS,
  JOB_DATA,
} from '../constants'

export const addJob = createAction(ADD_JOB)
export const deleteJob = createAction(DELETE_JOB)
export const getJobFields = createAction(JOB_FIELDS)
export const getJobData = createAction(JOB_DATA)
