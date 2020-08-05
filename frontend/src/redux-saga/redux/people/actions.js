import { createAction } from 'redux-actions'
import {
  ADD_JOB,
  DELETE_JOB,
} from '../constants'

export const addJob = createAction(ADD_JOB)
export const deleteJob = createAction(DELETE_JOB)
