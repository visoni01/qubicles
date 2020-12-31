import { createAction } from 'redux-actions'
import {
  ADD_JOB,
  JOB_FIELDS,
  UPDATE_JOB,
} from '../../constants'

export const addJob = createAction(ADD_JOB)
export const getNewJobFields = createAction(JOB_FIELDS)
export const updateJob = createAction(UPDATE_JOB)
