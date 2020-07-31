import { createAction } from 'redux-actions'
import { ADD_CATEGORY, DELETE_CATEGORY, ADD_CHANNEL } from '../constants'

export const addNewCategory = createAction(ADD_CATEGORY)
export const deleteCategory = createAction(DELETE_CATEGORY)
export const addNewChannel = createAction(ADD_CHANNEL)
