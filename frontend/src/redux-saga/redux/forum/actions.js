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
  DELETE_CHANNEL,
  UPDATE_TOPIC,
  LIKE_TOPIC_COMMENT,
  UNLIKE_TOPIC_COMMENT,
  UPDATE_CATEGORY,
  UPDATE_CHANNEL,
  UPDATE_COMMENT,
  ADD_GROUP,
  ADD_GROUP_TOPIC,
  POST_TOPIC_COMMENT,
  LOAD_MORE_COMMENTS,
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
export const deleteChannel = createAction(DELETE_CHANNEL)
export const updateTopic = createAction(UPDATE_TOPIC)
export const likeTopicComment = createAction(LIKE_TOPIC_COMMENT)
export const unlikeTopicComment = createAction(UNLIKE_TOPIC_COMMENT)
export const updateCategory = createAction(UPDATE_CATEGORY)
export const updateChannel = createAction(UPDATE_CHANNEL)
export const updateComment = createAction(UPDATE_COMMENT)
export const addNewGroup = createAction(ADD_GROUP)
export const addNewGroupTopic = createAction(ADD_GROUP_TOPIC)
export const postTopicComment = createAction(POST_TOPIC_COMMENT)
export const loadMoreComments = createAction(LOAD_MORE_COMMENTS)
