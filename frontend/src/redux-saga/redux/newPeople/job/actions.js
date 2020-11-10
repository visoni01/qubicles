import { createAction } from 'redux-actions'
import {
  ADD_JOB,
  NEW_JOB_FIELDS,
} from '../../constants'

export const addJob = createAction(ADD_JOB)
export const getNewJobFields = createAction(NEW_JOB_FIELDS)
