import { createAction } from 'redux-actions'
import {
  ADD_JOB,
  NEW_JOB_FIELDS,
  UPDATE_JOB,
} from '../../constants'

export const addJob = createAction(ADD_JOB)
export const getNewJobFields = createAction(NEW_JOB_FIELDS)
export const updateJob = createAction(UPDATE_JOB)
