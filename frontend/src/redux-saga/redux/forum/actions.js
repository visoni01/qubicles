import { createAction } from 'redux-actions'
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  ADD_CHANNEL,
  DELETE_TOPIC,
  DELETE_TOPIC_COMMENT,
} from '../constants'

export const addNewCategory = createAction(ADD_CATEGORY)
export const deleteCategory = createAction(DELETE_CATEGORY)
export const addNewChannel = createAction(ADD_CHANNEL)
export const deleteTopic = createAction(DELETE_TOPIC)
export const deleteTopicComment = createAction(DELETE_TOPIC_COMMENT)
