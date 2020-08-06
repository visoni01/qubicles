import { createAction } from 'redux-actions'
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  ADD_CHANNEL,
  DELETE_TOPIC,
  DELETE_TOPIC_COMMENT,
  ADD_TOPIC_COMMENT,
  LIKE_TOPIC,
  UNLIKE_TOPIC,
  ADD_TOPIC,
} from '../constants'

export const addNewCategory = createAction(ADD_CATEGORY)
export const deleteCategory = createAction(DELETE_CATEGORY)
export const addNewChannel = createAction(ADD_CHANNEL)
export const deleteTopic = createAction(DELETE_TOPIC)
export const deleteTopicComment = createAction(DELETE_TOPIC_COMMENT)
export const addTopicComment = createAction(ADD_TOPIC_COMMENT)
export const likeForumTopic = createAction(LIKE_TOPIC)
export const unlikeForumTopic = createAction(UNLIKE_TOPIC)
export const addNewTopic = createAction(ADD_TOPIC)
